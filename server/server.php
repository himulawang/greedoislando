<?php
//Set Constants Here
define("GI_ADDRESS","localhost");
define("GI_PORT",12345);
define("GI_CLIENTLIMIT",2);
//Config Environment
error_reporting(E_ALL);
set_time_limit(0);
ob_implicit_flush(1);
//Import Class
require_once "websockethandshake.class.php";
require_once "core.class.php";
require_once "cardo.class.php";
require_once "char.class.php";
require_once "battleaction.class.php";
require_once "battlefield.class.php";
require_once "console.class.php";

//Start Websocket Class
class WebSocket {
    private $core;
    private $sockets = array();
    private $user = array();
    private $pre = array();
    private $battlefield = array();

    function __construct(){
        //Init Socket
        $this->core = socket_create(AF_INET,SOCK_STREAM,SOL_TCP);
        socket_set_option($this->core,SOL_SOCKET,SO_REUSEADDR,1);
        socket_bind($this->core,GI_ADDRESS,GI_PORT);
        socket_listen($this->core,GI_CLIENTLIMIT);

        $this->sockets[] = $this->core;
        //Output Console Logs
        console::write("Server Start");
        //Make pre Array;
        $this->pre["prepareChar"] = array("self","prepareChar"); //Make A Char

        $this->loop();
    }

    private function loop(){
        while(1){
            $changed = $this->sockets;
            socket_select($changed,$w=null,$e=null,null);
            
            self::heartBeating(); // Action Point

            foreach($changed as $socket){
                if($socket == $this->core){
                    $client = socket_accept($this->core);
                    if($client < 0){
                        console::write("socket_accept() failed");
                        continue;
                    }else{
                        $this->newUser($client);
                    }
                }else{
                    $bytes = socket_recv($socket,$buffer,2048,0);
                    if($bytes==0){
                        $this->userDisconnect($socket);
                    }else{
                        $user = $this->getUserBySocket($socket);
                        if(!$user->handshake){
                            //MAX LIMIT
                            if(count($this->user) - 1 >=GI_CLIENTLIMIT){ //TODO Don't Know why need - 1
                                console::write("New Connection Coming, But Server Reach Max Connection");
                                continue;
                            }
                            $this->doHandShake($user,$buffer);
                        }else{
                            $string = $this->unwrap($buffer);
                            console::write("Server Received: " . $string);
                            $array = json_decode($string,1 /*Convert To Array*/);
                            //var_dump($array);
                            $this->process($user,$array,$socket);
                        }
                    }
                }
            }
        }
    }

    private function newUser($socket){
        $user = new user;
        $id = uniqid();
        $user->id = $id;
        $user->socket = $socket;
        $this->user[$id] = $user;
        $this->sockets[$id] = $socket;
        console::write($socket . " Just Come In");
    }

    private function userDisconnect($socket){
        $id = null;
        //Find Which User Disconnect
        foreach($this->user as $user){
            if($user->socket == $socket){
                $id = $user->id;
                break;
            }
        }
        //Delete User & Socket & Char
        if(!is_null($id)){
            if (isset($this->user[$id])) unset($this->user[$id]);
            if (isset($this->sockets[$id])) unset($this->sockets[$id]);
            //Get battlefield Fight
            $idx = self::getBattlefieldIndex($id);
            if(is_int($idx)){
                //Stop fight
                $this->battlefield[$idx]->stopBattle();
                //Kick Char from battlefield
                if (is_int($idx)) {
                    $this->battlefield[$idx]->kickFieldChar($id);
                }
            }
        }
        //Close Socket
        socket_close($socket);
        //Output Console Logs
        console::write($socket . "Disconnected");
    }

    private function getUserBySocket($socket){
        foreach($this->user as $user){
            if($user->socket == $socket){
                return $user;
            }
        }
    }

    private function doHandShake($user,$buffer){
        $upgrade = (string) new WebSocketHandshake($buffer);
        socket_write($user->socket,$upgrade,strlen($upgrade));
        $user->handshake=1;
        console::write($upgrade);
        console::write("Hand Shake Done");
        //Send UniqID
        $array = array("id" => $user->id);
        $msg = self::feedbackJSON("con_set_id",$array);
        console::write("Send Unique ID to client {$msg}");
        $msg = self::wrap($msg);
        socket_write($user->socket,$msg,strlen($msg));
    }

    private function process($user,$array,$socket){
        //Bad Request
        if (!isset($array['type'])){
            console::write("Bad Request");
            return;
        }
        //Case
        $type = $array['type'];
        if ($type == "sys"){ //System Console
            $key = $array['data']['cmd'];
            if ($key == "listUser"){
                console::listVar($this->user);
            }else if($key == "listSocket") {
                console::listVar($this->sockets);
            }else if($key == "listBattlefield"){
                console::listVar($this->battlefield); 
            }
        }else if($type == "talk"){ //Talk
            self::feedbackTalk($array['data']);
        }else if($type == "pre"){ //Prepare Battle
            $key = $array['data']['cmd'];
            $call_func = $this->pre[$key];
            $no = $array['data']['no'];
            call_user_func($call_func,$user,$array['data'],$this->battlefield[$no]);
        }else if($type == "pre_new_bf"){
            self::prepareBattlefield($user,$array['data']);
        }
    }

    private function heartBeating(){
        foreach($this->battlefield as $k => &$v){
            if($v->checkBattleStatus()){
                $v->addActionPoint();
            }
        }
    }

    private function feedbackTalk($data){
        console::write("Server Received Talk Data: " . $data['name'] . " says: " . $data['msg']);
        $feedback = array();
        $feedback['type'] = "talk";
        $feedback['data'] = array("name"=>$data['name'],"msg"=>$data['msg']);
        $feedback = json_encode($feedback);
        self::sendAll($feedback);
        return;
    }

    private function prepareBattlefield($user,$data){
        $id = $user->id;
        //Check Char Has Prepared
        if(is_int(self::getBattlefieldIndex($id))){ return; }
        //Create battlefield
        $name = $data['name'];
        $battlefield = new battlefield($id,"OurWar"/*TODO*/,$name);
        $this->battlefield[] = $battlefield;
        //Get Max Idx
        $no = max(array_keys($this->battlefield));
        $this->battlefield[$no]->setIdx($no);
        $battlefieldArray = $battlefield->getBattlefieldInfo();
        //battlefield infomation
        $json = self::feedbackJSON("pre_new_bf",$battlefieldArray);
        //Feedback
        self::sendSingle($id,$json);
        //Console
        console::write("User {$id} create a battlefield: {$json}");
    }

    private function prepareChar($user,$data,&$battlefield){
        $id = $user->id;
        //Check Char Has Prepared
        if(is_int(self::getBattlefieldIndex($id))){ return; }
        //Check Battlefield Char Count
        if($battlefield->getFieldCharCount() == 2){
            console::write("{$battlefield->name} has full.");
            return; 
        }
        //Prepare
        $name = $data['name'];
        $charArray = $battlefield->prepareChar($id,$name);
        //Char Infomation
        $json = self::feedbackJSON("pre",$charArray);
        //Feedback
        self::sendSingle($id,$json);
        //Console
        $n = $battlefield->getFieldName();
        console::write("User {$id} entered battlefield {$n}: {$json}");
    }

    private function getBattlefieldIndex($id){
        foreach($this->battlefield as $k => $v){
            if ($v->checkCharExists($id)){
                $fieldname = $v->getFieldName();
                console::write("This char has in battlefield {$fieldname}");
                return $k;
            }
        }
        return false;
    }

    private function sendAll($msg){
        $msg = $this->wrap($msg);
        foreach ($this->user as $user) {
            socket_write($user->socket,$msg,strlen($msg));
        }
    }

    private function sendSingle($id,$msg){
        $msg = $this->wrap($msg);
        socket_write($this->user[$id]->socket,$msg,strlen($msg));
    }

    private function feedbackJSON($type,$array){ return json_encode( array("type" => $type, "data" => $array) ); }
    private function wrap($msg){ return chr(0) . $msg . chr(255); }
    private function unwrap($msg){ return substr($msg, 1, strlen($msg)-2); }
}

class user {
    public $id,$socket,$handshake;
}

$ws = new WebSocket;


?>
