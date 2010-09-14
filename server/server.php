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
                            //heartBeating
                            if($string==0){ continue; }
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
                    $needDestroyBattlefield = $this->battlefield[$idx]->kickFieldChar($id);
                    if ($needDestroyBattlefield) $this->destroyBattlefield($idx);
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

        }else if($type == "con"){ //connection
            $key = $array['data']['cmd'];
            if($key == "set_username"){
                self::setUsername($user,$array['data']);
            }

        }else if($type == "talk"){ //Talk
            self::feedbackTalk($array['data']);
        }else if($type == "pre"){ //Prepare Battle
            $key = $array['data']['cmd'];
            if($key == "get_user_list"){
                self::getUserList();
                return;
            }else if($key == "get_bf_list"){
                self::getBattlefieldList();
                return;
            }else if($key == "create_bf"){
                self::prepareBattlefield($user,$array['data']);
                return;
            }else if($key == "enter_bf"){
                self::prepareChar($user,$array['data']);
                return;
            }
        }else if($type == "batt"){ //battle
            $key = $array['data']['cmd'];
            if($key == "bf_start"){
                //self::
            }
        }
    }

    private function setUsername($user,$array){
        if(!$array['username']){
            console::write("Username is empty");
            return;
        }
        $user->name = $array['username'];
        $a = array("id" => $user->id, "username" => $array['username']);
        $json = self::feedbackJSON("con","get_id",$a);
        self::sendSingle($user->id,$json);
        self::getUserList();
        self::getBattlefieldList();
    }

    private function getUserList(){
        $a = array("userlist" => array());
        foreach($this->user as $k=>$v){
            $a["userlist"][] = array("id" => $v->id, "username" => $v->name);
        }
        $json = self::feedbackJSON("pre","set_user_list",$a);
        self::sendAll($json);
    }

    private function getBattlefieldList(){
        $a = array("battlefield_list" => array());
        foreach($this->battlefield as $k=>$v){
            $a["battlefield_list"][] = $v->getBattlefieldInfo();
        }
        $json = self::feedbackJSON("pre","set_battlefield_list",$a);
        self::sendAll($json);
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
        $charName = $data['char_name'];
        $bfName = $data['bf_name'];
        $battlefield = new battlefield($id,$bfName,$charName);
        $this->battlefield[] = $battlefield;
        //Get Max Idx
        $no = max(array_keys($this->battlefield));
        $this->battlefield[$no]->setIdx($no);
        //battlefield infomation
        $battlefieldArray = $battlefield->getBattlefieldInfo();
        $json = self::feedbackJSON("pre","enter_bf",$battlefieldArray);
        //Feedback
        self::sendSingle($id,$json);
        //Console
        console::write("User {$id} create a battlefield: {$json}");
        self::getBattlefieldList();
    }

    private function prepareChar($user,$data){
        $id = $user->id;
        //Check Char Has Prepared
        if(is_int(self::getBattlefieldIndex($id))){ return; }
        //Check Battlefield Vaild
        $bf_no = $data['bf_no'];
        if(!isset($this->battlefield[$bf_no])){
            console::write("Invaild bf_no");
            return;
        }
        $battlefield = &$this->battlefield[$bf_no];
        //Check Battlefield Char Count
        if($battlefield->getFieldCharCount() == 2){
            console::write("{$battlefield->name} has full.");
            return; 
        }
        //Check BattleStarted
        if($battlefield->checkBattleStatus()){
            console::write("Battle has started in this bf");
            return;
        };
        //Prepare
        $char_name = $data['char_name'];
        $battlefield->prepareChar($id,$char_name);
        //battlefield infomation
        $battlefieldArray = $battlefield->getBattlefieldInfo();
        $json = self::feedbackJSON("pre","enter_bf",$battlefieldArray);
        //Feedback Selected
        $idInBattlefield = $battlefield->getUserID();
        self::sendSelected($idInBattlefield,$json);
        //Console
        $n = $battlefield->getFieldName();
        console::write("User {$id} entered battlefield {$n}: {$json}");
        self::getBattlefieldList();
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

    private function destroyBattlefield($no){
        unset($this->battlefield[$no]);
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

    private function sendSelected($array,$msg){
        $msg = $this->wrap($msg);
        foreach($array as $k=>$v){
            socket_write($this->user[$v]->socket,$msg,strlen($msg));
        }
    }

    private function feedbackJSON($type,$cmd,$array){
        $a;
        $a["type"] = $type;
        $array["cmd"] = $cmd;
        $a["data"] = $array;
        return json_encode( $a ); 
    }

    private function wrap($msg){ return chr(0) . $msg . chr(255); }
    private function unwrap($msg){ return substr($msg, 1, strlen($msg)-2); }
}

class user {
    public $id,$socket,$handshake,$name;
}

$ws = new WebSocket;


?>
