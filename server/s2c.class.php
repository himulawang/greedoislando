<?php

class s2c {
    public static function JSON($type,$cmd,$array){
        $a;
        $a["type"] = $type;
        $a["data"] = array();
        $a["data"]["cmd"] = $cmd;
        $a["data"]["json"] = $array;
        return json_encode( $a ); 
    }
    public static function outlet($sendtype,$id,$json,$other=null,$otherjson=null){
        $r;
        $r["sendtype"] = $sendtype;
        $r["id"] = $id;
        $r["json"] = $json;
        $r["other"] = $other;
        $r["otherjson"] = $otherjson;
        return $r;
    }
}

?>
