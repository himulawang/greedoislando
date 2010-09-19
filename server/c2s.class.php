<?php

$map_c2s = array();
$map_c2s["sys"] = array();

$map_c2s["sys"]["listUser"] = array();
$map_c2s["sys"]["listUser"][] = array("console","listUser");

$map_c2s["sys"]["listSocket"] = array();
$map_c2s["sys"]["listSocket"][] = array("console","listSocket");

$map_c2s["sys"]["listBattlefield"] = array();
$map_c2s["sys"]["listBattlefield"][] = array("console","listBattlefield");

$map_c2s["sys"]["use_actionpoint"] = array();
$map_c2s["sys"]["use_actionpoint"][] = array("battleaction","useActionPoint");

$map_c2s["sys"]["get_attackcardo"] = array();
$map_c2s["sys"]["get_attackcardo"][] = array("battleaction","getAttackCardo");

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

$map_c2s["batt"]["use_cardo"] = array();
$map_c2s["batt"]["use_cardo"][] = array("battleaction","useActionPoint");
$map_c2s["batt"]["use_cardo"][] = array("battleaction","useCardo");


class c2s {
    public static function in($p){
        $funcs = $p->process;
        foreach($funcs as $k => $v){
            $p->setResult(call_user_func($v));
        }
        return $p;
    }
}

?>
