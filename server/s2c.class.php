<?php

$map_s2c = array();

$map_s2c["con"] = array();

$map_s2c["con"]["disconnect"] = array();
$map_s2c["con"]["disconnect"][] = array("connection","disconnect");
$map_s2c["con"]["disconnect"][] = array("connection","setUserList");
$map_s2c["con"]["disconnect"][] = array("connection","setBattlefieldList");


class s2c {
    public static function JSON($type,$cmd,$array){
        $a;
        $a["type"] = $type;
        $array["cmd"] = $cmd;
        $a["data"] = $array;
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
    public static function entrance($id,$ws,$type,$cmd,$para=null){
        global $map_s2c;

        $funcs = $map_s2c[$type][$cmd];
        $returns = array();
        foreach($funcs as $k => $v){
            $returns[] = call_user_func($v,$id,$ws,$para);
        }
        return $returns;
    }
}

?>
