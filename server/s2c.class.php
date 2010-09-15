<?php

class s2c {
    public static function JSON($type,$cmd,$array){
        $a;
        $a["type"] = $type;
        $array["cmd"] = $cmd;
        $a["data"] = $array;
        return json_encode( $a ); 
    }

    public static function outlet($sendtype,$id,$range,$json){
        $r;
        $r["sendtype"] = $sendtype;
        $r["id"] = $id;
        $r["range"] = $range;
        $r["json"] = $json;
        return $r;
    }
}

?>
