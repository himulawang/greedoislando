<?php

$map_c2s = array();
$map_c2s["sys"] = array();

$map_c2s["sys"]["listUser"] = array();
$map_c2s["sys"]["listUser"][] = array("console","listUser");

$map_c2s["sys"]["listSocket"] = array();
$map_c2s["sys"]["listSocket"][] = array("console","listSocket");

$map_c2s["sys"]["listBattlefield"] = array();
$map_c2s["sys"]["listBattlefield"][] = array("console","listBattlefield");

$map_c2s["con"] = array();

$map_c2s["con"]["set_username"] = array();
$map_c2s["con"]["set_username"][] = array("connection","setUsername");
$map_c2s["con"]["set_username"][] = array("connection","setUserList");
$map_c2s["con"]["set_username"][] = array("connection","setBattlefieldList");

$map_c2s["con"]["set_userlist"] = array();
$map_c2s["con"]["set_userlist"][] = array("connection","setUserList");

$map_c2s["con"]["set_battlefieldlist"] = array();
$map_c2s["con"]["set_battlefieldlist"][] = array("connection","setBattlefieldList");

$map_c2s["pre"] = array();

$map_c2s["pre"]["create_bf"] = array();
$map_c2s["pre"]["create_bf"][] = array("prepare","createBattlefield");
$map_c2s["pre"]["create_bf"][] = array("connection","setBattlefieldList");

$map_c2s["pre"]["enter_bf"] = array();
$map_c2s["pre"]["enter_bf"][] = array("prepare","enterBattlefield");
$map_c2s["pre"]["enter_bf"][] = array("connection","setBattlefieldList");

$map_c2s["pre"]["start_bf"] = array();
$map_c2s["pre"]["start_bf"][] = array("prepare","startBattlefield");
$map_c2s["pre"]["start_bf"][] = array("battleaction","initDealCardo");

class c2s {
    public static function verify($msg){
        return isset($msg["type"])
            && isset($msg["data"])
            && isset($msg["data"]["cmd"]) ? 1 : 0;
    }
    public static function entrance($id,$ws,$msg){
        global $map_c2s;
        if(!c2s::verify($msg)) return;  //Invaild c2s message

        $type = $msg["type"];
        $cmd = $msg["data"]["cmd"];

        $funcs = $map_c2s[$type][$cmd];
        $returns = array();
        foreach($funcs as $k => $v){
            $returns[] = call_user_func($v,$id,$ws,$msg);
        }
        return $returns;
    }
}

?>
