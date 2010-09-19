<?php

class console {
    public static function write($msg){
        echo date('Y-m-d H:i:s') . " : " . $msg . PHP_EOL;
    }
    public static function error($msg){
        echo date('Y-m-d H:i:s') . " : ERROR" . $msg . PHP_EOL;
    }
    public static function listUser($id,$world,$msg){
        var_dump($world->user);
    }
    public static function listBattlefield($id,$world,$msg){
        var_dump($world->bf);
    }

}

?>
