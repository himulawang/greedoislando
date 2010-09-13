<?php

class console {
    public static function write($msg){
        echo date('Y-m-d H:i:s') . " : " . $msg . PHP_EOL;
    }
    public static function listVar($var){
        var_dump($var);
    }
}

?>
