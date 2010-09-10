<?php
//Set Variables Here
define("GI_ADDRESS","localhost");
define("GI_PORT",12345);
define("GI_CLIENTLIMIT",2);
//Config Environment
error_reporting(E_ALL);
set_time_limit(0);
ob_implicit_flush(1);
//Start Websocket Class
class WebSocket {
    private $core;
    private $sockets = array();
    private $user = array();

    function __construct(){
        //Init Socket
        $this->core = socket_create(AF_INET,SOCK_STREAM,SOL_TCP);
        socket_set_option($this->core,SOL_SOCKET,SO_REUSEADDR,1);
        socket_bind($this->core,GI_ADDRESS,GI_PORT);
        socket_listen($this->core,GI_CLIENTLIMIT);

        $this->sockets[] = $this->core;
        //Output Console Logs
        $this->consoleOutput("Server Start");
        $this->loop();

    }

    private function loop(){
        while(1){
            $changed = $this->sockets;
            socket_select($changed,$w=null,$e=null,null);

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
                            $this->doHandShake($user,$buffer);
                        }else{
                            $string = $this->unwrap($buffer);
                            $this->consoleOutput($string);
                        }
                    }
                }
            }

        }
    }

    private function consoleOutput($str){
        echo $str;
        return;
    }

    private function newUser($socket){
        $user = new user;
        $user->id = uniqid();
        $user->socket = $socket;
        $this->user[] = $user;
        $this->sockets[] = $socket;
        $this->consoleOutput($socket . "Just Come In" . PHP_EOL);
        return;
    }

    private function userDisconnect($socket){
        $found = null;
        $n = count($this->user);
        //Find Which User Disconnect
        for($i = 0; $i < $n; $i++){
            if($this->user[$i]->socket == $socket){
                $found = $i;
                break;
            }
        }
        //Delete User
        if(!is_null($found)){
            array_splice($this->user,$found,1);
        }
        //Find Which Socket Disconnect;
        $index = array_search($socket,$this->sockets);
        //Delete Socket
        if($index >= 0){
            array_splice($this->sockets,$index,1);
        }
        //Close Socket
        socket_close($socket);
        //Output Console Logs
        $this->consoleOutput($socket . "Disconnected" . PHP_EOL);
        return;
    }

    private function getUserBySocket($socket){
        $n = count($this->user);
        for($i = 0; $i < $n; $i++){
            if($this->user[$i]->socket == $socket){
                return $this->user[$i];
            }
        }
    }

    private function doHandShake($user,$buffer){
        list($resource,$host,$origin) = $this->getHeaders($buffer);
        $upgrade  = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" .
            "Upgrade: WebSocket\r\n" .
            "Connection: Upgrade\r\n" .
            "WebSocket-Origin: " . $origin . "\r\n" .
            "WebSocket-Location: ws://" . $host . $resource . "\r\n" .
            "\r\n";
        socket_write($user->socket,$upgrade.chr(0),strlen($upgrade.chr(0)));
        $user->handshake=true;
        $this->consoleOutput("HandShake Done" . PHP_EOL);
        return;
    }

    private function getHeaders($buffer){
        if(preg_match("/GET (.*) HTTP/"   ,$buffer,$match)){ $r=$match[1]; }
        if(preg_match("/Host: (.*)\r\n/"  ,$buffer,$match)){ $h=$match[1]; }
        if(preg_match("/Origin: (.*)\r\n/",$buffer,$match)){ $o=$match[1]; }
        return array($r,$h,$o);
    }

    private function wrap($msg){
        return chr(0) . $msg . chr(255);
    }

    private function unwrap($msg){
        return substr($msg, 1, strlen($msg)-2);
    }
}

class user {
    public $id,$socket,$handshake;
}

$ws = new WebSocket;


?>
