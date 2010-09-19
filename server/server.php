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
require_once "c2s.class.php";
require_once "s2c.class.php";
require_once "connection.class.php";
require_once "prepare.class.php";
require_once "cardo.class.php";
require_once "char.class.php";
require_once "battleaction.class.php";
require_once "battlefield.class.php";
require_once "console.class.php";
require_once "packet.class.php";
require_once "process.php";


//Start Websocket Class
class WebSocket {
    private $core;
    public $socket = array();
    public $user = array();
    public $battlefield = array();

    function __construct(){
        //Init Socket
        $this->core = socket_create(AF_INET,SOCK_STREAM,SOL_TCP);
        socket_set_option($this->core,SOL_SOCKET,SO_REUSEADDR,1);
        socket_bind($this->core,GI_ADDRESS,GI_PORT);
        socket_listen($this->core,GI_CLIENTLIMIT);

        $this->socket[] = $this->core;
        //Output Console Logs
        console::write("Server Start");

        $this->loop();
    }

    private function loop(){
        $world = new world();
        while(1){
            $changed = $this->socket;
            socket_select($changed,$w=null,$e=null,null);
            
            foreach($changed as $socket){
                if($socket == $this->core){
                    $client = socket_accept($this->core);
                    if($client < 0){
                        console::write("socket_accept() failed");
                        continue;
                    }else{
                        $user = $this->newUser($client);
                        $world->user[$id] = $user;
                        $this->socket[$id] = $socket;
                    }
                }else{
                    $bytes = socket_recv($socket,$buffer,2048,0);
                    $user = $this->getUserBySocket($socket);
                    $id = $user->id;
                    if($bytes==0){ //disconnect
                        $feedbackMsg = s2c::entrance($id,$this,"con","disconnect");
                        $this->feedback($feedbackMsg);
                        continue;
                    }

                    if(!$user->handshake){
                        //MAX LIMIT
                        if(count($this->user) - 1 >=GI_CLIENTLIMIT){ //TODO Don't Know why need - 1
                            console::write("New Connection Coming, But Server Reach Max Connection");
                            continue;
                        }
                        $this->doHandShake($user,$buffer);
                    }else{
                        self::addActionPoint(); // Action Point
                        $string = $this->unwrap($buffer);
                        //BufferedAmount
                        if($string==1) continue; 
                        console::write("Server Received: " . $string);
                        $o = json_decode($string,1 /*Convert To Array*/);
                        $packet = new packet($id,$world,$o);
                        $packet->setProcess("c2s");
                        $packet->process();
                        $result = $packet->getResult();
                        self::feedback($result);
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
        return $user;
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

    private function addActionPoint(){
        foreach($this->battlefield as $k => &$v){
            if($v->checkBattleStatus()){
                $needFeedback = $v->addActionPoint();
                if($needFeedback){
                    $selected = $this->battlefield[$k]->getUserID();
                    $array = $this->battlefield[$k]->getActionPoint();
                    $json = self::feedbackJSON("batt","set_action_point",$array);
                    self::sendSelected($selected,$json);
                }
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

    public function destroyBattlefield($no){
        unset($this->battlefield[$no]);
    }

    public function sendAll($msg){
        $msg = $this->wrap($msg);
        foreach ($this->user as $user) {
            socket_write($user->socket,$msg,strlen($msg));
        }
    }

    public function sendSingle($id,$msg){
        $msg = $this->wrap($msg);
        socket_write($this->user[$id]->socket,$msg,strlen($msg));
    }

    public function sendSelected($array,$msg){
        $msg = $this->wrap($msg);
        foreach($array as $k=>$v){
            socket_write($this->user[$v]->socket,$msg,strlen($msg));
        }
    }

    public function sendDifferent($spec,$specMsg,$other,$otherMsg){
        $this->sendSingle($spec,$specMsg);
        $this->sendSelected($other,$otherMsg);
    }

    private function feedbackJSON($type,$cmd,$array){
        $a;
        $a["type"] = $type;
        $array["cmd"] = $cmd;
        $a["data"] = $array;
        return json_encode( $a ); 
    }

    private function feedback($returns){
        if(!$returns) return;

        foreach($returns as $k => $v){
            if(!$v) continue;
            list($sendtype,$id,$json,$other,$otherjson) = array_values($v);
            if($sendtype == "single"){
                self::sendSingle($id,$json);
            }else if($sendtype == "all"){
                self::sendAll($json);
            }
        }
    }

    private function wrap($msg){ return chr(0) . $msg . chr(255); }
    private function unwrap($msg){ return substr($msg, 1, strlen($msg)-2); }
}

class user {
    public $id,$socket,$handshake,$name;
}

class world {
    public $bf = array();
    public $user = array();
}

$ws = new WebSocket;


?>
