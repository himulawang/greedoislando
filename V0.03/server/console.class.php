<?php

class console {
    public static function write($msg){
        echo date('Y-m-d H:i:s') . " : " . $msg . PHP_EOL;
    }
    public static function error($msg){
        echo date('Y-m-d H:i:s') . " : ERROR" . $msg . PHP_EOL;
    }
    public static function listUser($id,$msg,$gi){
        var_dump($gi->user);
    }
    public static function listBattlefield($id,$msg,$gi){
        var_dump($gi->bf);
    }
    public static function listSocket($id,$msg,$gi){
        var_dump($gi->socket);
    }
    public static function listResult($id,$msg,$gi){
        var_dump($gi->result);
    }

}

?>
