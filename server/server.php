<?php
//Set Constants Here
define("GI_ADDRESS","localhost");
define("GI_PORT",12345);
define("GI_CLIENTLIMIT",5);
//Game Parameter
define("GI_BattleCardoCount",6);
define("GI_BattleUseActionPoint",10);
//Config Environment
error_reporting(E_ALL);
set_time_limit(0);
ob_implicit_flush(1);
//Import Class
require_once "websockethandshake.class.php";
require_once "core.class.php";
require_once "s2c.class.php";

require_once "stdProcess.class.php";
require_once "connection.class.php";
require_once "prepare.class.php";
require_once "battle.class.php";

require_once "char.class.php";
require_once "battleaction.class.php";
require_once "battlefield.class.php";
require_once "console.class.php";
require_once "packet.class.php";
require_once "process.php";

require_once "cardo.class.php";
require_once "cardotype_attack.class.php";
require_once "cardotype_defend.class.php";
require_once "cardotype_phyattack.class.php";
require_once "cardotype_phydefend.class.php";
require_once "cardotype_magattack.class.php";
require_once "cardotype_magdefend.class.php";
require_once "cardotype_special.class.php";
require_once "xxx051.class.php";
require_once "xxx052.class.php";
require_once "xxx053.class.php";
require_once "xxx061.class.php";
require_once "xxx062.class.php";
require_once "xxx071.class.php";
require_once "xxx072.class.php";
require_once "xxx073.class.php";
require_once "xxx081.class.php";
require_once "xxx082.class.php";
require_once "xxx091.class.php";
require_once "xxx092.class.php";


class WebSocket {
    function __construct($gi){
        //Init Socket
        $core = socket_create(AF_INET,SOCK_STREAM,SOL_TCP);
        socket_set_option($core,SOL_SOCKET,SO_REUSEADDR,1);
        socket_bind($core,GI_ADDRESS,GI_PORT);
        socket_listen($core,GI_CLIENTLIMIT);

        $gi->socket[] = $core;
        console::write("Server Start");

        $this->loop($gi,$core);
    }

    private function loop($gi,$core){
        while(1){
            $changed = $gi->socket;
            socket_select($changed,$w=null,$e=null,null);
            
            foreach($changed as $socket){
                if($socket == $core){
                    $client = socket_accept($core);
                    if($client < 0){
                        console::write("socket_accept() failed");
                        continue;
                    }else{
                        self::connectNewUser($client,$gi);
                    }
                }else{
                    $bytes = socket_recv($socket,$buffer,2048,0);
                    $user = self::getUserBySocket($socket,$gi);
                    $id = $user->id;
                    if($bytes==0){ 
                        connection::disconnect($id,null,$gi);
                        connection::getUserList($id,null,$gi);
                        connection::getBattlefieldList($id,null,$gi);
                        console::write($id . " Disconnect");
                        continue;
                    }

                    if(!$user->handshake){
                        //MAX LIMIT
                        if(count($gi->user) - 1 >=GI_CLIENTLIMIT){ //TODO Don't Know why need - 1
                            console::write("New Connection Coming, But Server Reach Max Connection");
                            continue;
                        }
                        self::doHandShake($id,$buffer,$gi);
                    }else{
                        //AddActionPoint per second
                        $second = new battle($id,array("type"=>"batt","data"=>array("cmd"=>"add_actionpoint")),$gi);
                        self::feedback($gi);
                        unset($second);

                        $string = self::unwrap($buffer);
                        //BufferedAmount
                        if($string==1) continue; 

                        console::write("Server Received: " . $string);
                        $msg = json_decode($string,1 /*Convert To Array*/);

                        if(!isset($msg["type"])) continue;
                        if($msg["type"]=="con") {
                            $obj = new connection($id,$msg,$gi);
                        }else if($msg["type"]=="pre"){
                            $obj = new prepare($id,$msg,$gi);
                        }else if($msg["type"]=="batt"){
                            $obj = new battle($id,$msg,$gi);
                        }else if($msg["type"]=="sys"){
                            $obj = new battle($id,$msg,$gi);
                        }

                        unset($obj);
                        self::feedback($gi);
/*
                        $packet = new packet($id,$o,$gi);
                        $packet->setProcess("c2s");
                        $packet->process();
                        if(!$packet->verifyLastResult()) continue;
                        $packet->setProcess("s2c");
                        $packet->process();
                        $result = $packet->getResult();
                        $gi->getNewResult($result);
                        //var_dump($gi->result);
                        self::feedback($gi);
 */
                    }
                }
            }
        }
    }

    private function connectNewUser($socket,$gi){
        $user = new user;
        $id = uniqid();
        $user->id = $id;
        $user->socket = $socket;

        $gi->user[$id] = $user;
        $gi->socket[$id] = $socket;
    }

    private function getUserBySocket($socket,$gi){
        foreach($gi->user as $user){
            if($user->socket == $socket){
                return $user;
            }
        }
    }

    private function doHandShake($id,$buffer,$gi){
        $upgrade = (string) new WebSocketHandshake($buffer);
        socket_write($gi->user[$id]->socket,$upgrade,strlen($upgrade));
        $gi->user[$id]->handshake=1;
        console::write($upgrade);
        console::write("Hand Shake Done");
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

    public function sendAll($msg,$gi){
        $msg = $this->wrap($msg);
        foreach ($gi->user as $user) {
            socket_write($user->socket,$msg,strlen($msg));
        }
    }

    public function sendSingle($id,$msg,$gi){ //TODO Wait To be deleted
        $msg = $this->wrap($msg);
        if(!isset($gi->socket[$id])) return;
        socket_write($gi->socket[$id],$msg,strlen($msg));
    }

    public function sendSelected($array,$msg,$gi){
        $msg = $this->wrap($msg);
        if (is_array($array)) {
            foreach($array as $k=>$v){
                if(!isset($gi->socket[$v])) continue;                
                socket_write($gi->socket[$v],$msg,strlen($msg));
            }
        }else if(is_string($array)){
            if(!isset($gi->socket[$array])) return;            
            socket_write($gi->socket[$array],$msg,strlen($msg));
        }
    }

    public function sendDiff($id,$json,$other,$otherjson,$gi){
        $this->sendSelected($id,$json,$gi);
        $this->sendSelected($other,$otherjson,$gi);
    }

    private function feedback($gi){
        $returns = $gi->result;
        if(!$returns) return;

        foreach($returns as $k => $v){
            if(!$v || !is_array($v)) continue;
            list($sendtype,$id,$json,$other,$otherjson) = array_values($v);
            if($sendtype == "single"){ //TODO DEL
                self::sendSingle($id,$json,$gi);
            }else if($sendtype == "all"){
                self::sendAll($json,$gi);
            }else if($sendtype == "selected"){
                self::sendSelected($id,$json,$gi); //$id is an array
            }else if($sendtype == "diff"){
                self::sendDiff($id,$json,$other,$otherjson,$gi);
            }

            unset($gi->result[$k]); //Delete Result After Sent
        }
        $gi->result = array(); //Empty result
    }

    private function wrap($msg){ 
        return chr(0) . $msg . chr(255); 
    }
    private function unwrap($msg){ 
        return substr($msg, 1, strlen($msg)-2); 
    }
}

class user {
    public $id,$socket,$handshake,$username;
}

class gi {
    public $socket = array();
    public $bf = array();
    public $user = array();
    public $result = array(); //Store Unsent Result

    public function getNewResult($array){
        if(!$array) return;
        $this->result = array_merge($this->result,$array);
    }
    public function destroyBattlefield($no){
        unset($this->bf[$no]);
    }
    
}

$gi = new gi;
$ws = new WebSocket($gi);


?>
