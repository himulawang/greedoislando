<?php

class console {
    public static function write($msg){
        echo date('Y-m-d H:i:s') . " : " . $msg . PHP_EOL;
    }
    public static function error($msg){
        echo date('Y-m-d H:i:s') . " : ERROR" . $msg . PHP_EOL;
    }

    public static function listUser($id,$ws,$msg){
        var_dump($ws->user);
    }
    public static function listSocket($id,$ws,$msg){
        var_dump($ws->socket);
    }
    public static function listBattlefield($id,$ws,$msg){
        var_dump($ws->battlefield);
    }

}

?>
