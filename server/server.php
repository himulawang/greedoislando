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
require_once "cardo.class.php";
require_once "char.class.php";

//Start Websocket Class
class WebSocket {
    private $core;
    private $sockets = array();
    private $user = array();
    private $char = array();
    private $sys = array();
    private $pre = array();
    private $timestamp;
    private $fightStart = 0;

    function __construct(){
        //Init Socket
        $this->core = socket_create(AF_INET,SOCK_STREAM,SOL_TCP);
        socket_set_option($this->core,SOL_SOCKET,SO_REUSEADDR,1);
        socket_bind($this->core,GI_ADDRESS,GI_PORT);
        socket_listen($this->core,GI_CLIENTLIMIT);

        $this->sockets[] = $this->core;
        //Output Console Logs
        $this->consoleOutput("Server Start");
        //Make sys Array;
        $this->sys["listUser"] = array("self","listUser"); //List All Connection User
        $this->sys["listChar"] = array("self","listChar"); //List All Prepare Char
        $this->sys["listSocket"] = array("self","listSocket"); //List All Socket
        //Make pre Array;
        $this->pre["prepareChar"] = array("self","prepareChar"); //Make A Char
        $this->pre["battleStart"] = array("self","battleStart"); //Battle Start

        $this->loop();

    }

    private function loop(){
        while(1){
            $changed = $this->sockets;
            socket_select($changed,$w=null,$e=null,null);
            //Action Point
            if($this->fightStart){
                self::addActionPoint();
            }

            foreach($changed as $socket){
                if($socket == $this->core){
                    $client = socket_accept($this->core);
                    if($client < 0){
                        $this->consoleOutput("socket_accept() failed");
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
                                self::consoleOutput("New Connection Coming, But Server Reach Max Connection");
                                continue;
                            }
                            $this->doHandShake($user,$buffer);
                        }else{
                            $string = $this->unwrap($buffer);
                            $this->consoleOutput($string);
                            $array = json_decode($string,1 /*Convert To Array*/);
                            //var_dump($array);
                            $this->process($user,$array,$socket);
                        }
                    }
                }
            }
        }
    }

    private function addActionPoint(){
        $multi = time() - $this->timestamp;
        if($multi){
            $this->timestamp = time();
            foreach($this->char as $char){
                $char->addActionPoint($multi);
            }
        }
    }

    private function feedbackActionPoint(){
        
    }

    private function feedbackCharPrepare($id,$char){
        $a = array();
        $a["type"] = "pre";
        $a["data"] = (array) $char;
        $json = json_encode($a);
        self::consoleOutput($json);
        self::sendSingle($id,$json);
    }

    private function consoleOutput($str){
        echo date('Y-m-d H:i:s') . " : " . $str . PHP_EOL;
        return;
    }

    private function newUser($socket){
        $user = new user;
        $id = uniqid();
        $user->id = $id;
        $user->socket = $socket;
        $this->user[$id] = $user;
        $this->sockets[$id] = $socket;
        $this->consoleOutput($socket . " Just Come In" . PHP_EOL);
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
            if (isset($this->char[$id])) unset($this->char[$id]); 
        }
        //Close Socket
        socket_close($socket);
        //Fight Stop
        if($this->fightStart){
            $this->consoleOutput("Battle Stop");
            $this->fightStart = 0;
        }
        //Output Console Logs
        $this->consoleOutput($socket . "Disconnected");
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
        $this->consoleOutput($upgrade);
        socket_write($user->socket,$upgrade,strlen($upgrade));
        $user->handshake=true;
        $this->consoleOutput("Hand Shake Done");
    }

    private function wrap($msg){
        return chr(0) . $msg . chr(255);
    }

    private function unwrap($msg){
        return substr($msg, 1, strlen($msg)-2);
    }

    private function process($user,$array,$socket){
        //Bad Request
        if (!isset($array['type'])){
            self::consoleOutput("Bad Request");
            return;
        }
        //Case
        $type = $array['type'];
        if ($type == "sys"){ //System Console
            $key = $array['data']['cmd'];
            $call_func = $this->sys[$key];
            call_user_func($call_func);
            return;
        }else if($type == "talk"){ //Talk
            self::feedbackTalk($array['data']);
            return;
        }else if($type == "pre"){ //Prepare Battle
            $key = $array['data']['cmd'];
            $call_func = $this->pre[$key];
            call_user_func($call_func,$user,$array['data']);
            return;
        }
    }

    private function feedbackTalk($data){
        self::consoleOutput($data['name'] . " says: " . $data['msg']);
        $feedback = array();
        $feedback['type'] = "talk";
        $feedback['data'] = array("name"=>$data['name'],"msg"=>$data['msg']);
        $feedback = json_encode($feedback);
        self::sendAll($feedback);
        return;
    }

    private function prepareChar($user,$data){
        $id = $user->id;
        if(isset($this->char[$id])){
            self::consoleOutput("Char Has Been Prepared");
            return;
        }
        $name = $data['name'];
        $this->char[$id] = new char($id,$name);
        $this->char[$id]->setMaxHP(30);
        $this->char[$id]->setSpeed(2);
        //Feedback
        self::feedbackCharPrepare($id,$this->char[$id]);
    }

    private function battleStart($user,$data){
        //2 Sides Prepared
        if(count($this->char)==2){
            self::consoleOutput($data['name'] . " Start The Battle!");
            $this->fightStart = 1;
            $this->timestamp = time();
            return;
        }
        //Not Prepared
        self::consoleOutput($data['name'] . " Start The Battle, But 2 sides not fully prepared");
        return;
    }

    private function listUser(){
        var_dump($this->user);
    }

    private function listChar(){
        var_dump($this->char);
    }

    private function listSocket(){
        var_dump($this->sockets);
    }

    private function sendAll($msg){
        $users = $this->user;
        $msg = $this->wrap($msg);
        foreach ($users as $user) {
            socket_write($user->socket,$msg,strlen($msg));
        }
    }

    private function sendSingle($id,$msg){
        $msg = $this->wrap($msg);
        socket_write($this->user[$id]->socket,$msg,strlen($msg));
    }

}


class WebSocketHandshake {

    /*! Easy way to handshake a WebSocket via draft-ietf-hybi-thewebsocketprotocol-00
     * @link    http://www.ietf.org/id/draft-ietf-hybi-thewebsocketprotocol-00.txt
     * @author  Andrea Giammarchi
     * @blog    webreflection.blogspot.com
     * @date    4th June 2010
     * @example
     *          // via function call ...
     *          $handshake = WebSocketHandshake($buffer);
     *          // ... or via class
     *          $handshake = (string)new WebSocketHandshake($buffer);
     *
     *          socket_write($socket, $handshake, strlen($handshake));
     */

    private $__value__;

    public function __construct($buffer) {
        $resource = $host = $origin = $key1 = $key2 = $protocol = $code = $handshake = null;
        preg_match('#GET (.*?) HTTP#', $buffer, $match) && $resource = $match[1];
        preg_match("#Host: (.*?)\r\n#", $buffer, $match) && $host = $match[1];
        preg_match("#Sec-WebSocket-Key1: (.*?)\r\n#", $buffer, $match) && $key1 = $match[1];
        preg_match("#Sec-WebSocket-Key2: (.*?)\r\n#", $buffer, $match) && $key2 = $match[1];
        preg_match("#Sec-WebSocket-Protocol: (.*?)\r\n#", $buffer, $match) && $protocol = $match[1];
        preg_match("#Origin: (.*?)\r\n#", $buffer, $match) && $origin = $match[1];
        preg_match("#\r\n(.*?)\$#", $buffer, $match) && $code = $match[1];
        $this->__value__ =
            "HTTP/1.1 101 WebSocket Protocol Handshake\r\n".
            "Upgrade: WebSocket\r\n".
            "Connection: Upgrade\r\n".
            "Sec-WebSocket-Origin: {$origin}\r\n".
            "Sec-WebSocket-Location: ws://{$host}{$resource}\r\n".
            ($protocol ? "Sec-WebSocket-Protocol: {$protocol}\r\n" : "").
            "\r\n".
            $this->_createHandshakeThingy($key1, $key2, $code)
        ;
    }

    public function __toString() {
        return $this->__value__;
    }
    
    private function _doStuffToObtainAnInt32($key) {
        return preg_match_all('#[0-9]#', $key, $number) && preg_match_all('# #', $key, $space) ?
            implode('', $number[0]) / count($space[0]) :
            ''
        ;
    }

    private function _createHandshakeThingy($key1, $key2, $code) {
        return md5(
            pack('N', $this->_doStuffToObtainAnInt32($key1)).
            pack('N', $this->_doStuffToObtainAnInt32($key2)).
            $code,
            true
        );
    }
}

class user {
    public $id,$socket,$handshake;
}

$ws = new WebSocket;


?>
