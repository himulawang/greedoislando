<?php
//All Process Control Here
$c2s = array();

$c2s = array();
$c2s["sys"] = array();

$c2s["sys"]["listUser"] = array();
$c2s["sys"]["listUser"][] = array("console","listUser");

$c2s["sys"]["listSocket"] = array();
$c2s["sys"]["listSocket"][] = array("console","listSocket");

$c2s["sys"]["listBattlefield"] = array();
$c2s["sys"]["listBattlefield"][] = array("console","listBattlefield");

$c2s["sys"]["listResult"] = array();
$c2s["sys"]["listResult"][] = array("console","listResult");

$c2s["sys"]["use_actionpoint"] = array();
$c2s["sys"]["use_actionpoint"][] = array("battleaction","useActionPoint");

$c2s["sys"]["get_attackcardo"] = array();
$c2s["sys"]["get_attackcardo"][] = array("battleaction","getAttackCardo");

$c2s["sys"]["get_defendcardo"] = array();
$c2s["sys"]["get_defendcardo"][] = array("battleaction","getDefendCardo");

$c2s["sys"]["get_specialcardo"] = array();
$c2s["sys"]["get_specialcardo"][] = array("battleaction","getSpecialCardo");

$c2s["con"] = array();
$c2s["con"]["set_username"] = array();
$c2s["con"]["set_username"][] = array("connection","setUsername");

$c2s["pre"] = array();

$c2s["pre"]["create_bf"] = array();
$c2s["pre"]["create_bf"][] = array("prepare","createBattlefield");

$c2s["pre"]["enter_bf"] = array();
$c2s["pre"]["enter_bf"][] = array("prepare","enterBattlefield");

$c2s["pre"]["start_bf"] = array();
$c2s["pre"]["start_bf"][] = array("prepare","startBattlefield");
$c2s["pre"]["start_bf"][] = array("battleaction","initDealCardo");

$c2s["batt"]["use_cardo"] = array();
$c2s["batt"]["use_cardo"][] = array("battleaction","useActionPoint");
$c2s["batt"]["use_cardo"][] = array("battleaction","useCardo");

$s2c = array();

$s2c["sys"] = array();
$s2c["sys"]["get_attackcardo"] = array();
$s2c["sys"]["get_attackcardo"][] = array("battleaction","getDealCardoInfo");

$s2c["sys"]["get_defendcardo"] = array();
$s2c["sys"]["get_defendcardo"][] = array("battleaction","getDealCardoInfo");

$s2c["sys"]["get_specialcardo"] = array();
$s2c["sys"]["get_specialcardo"][] = array("battleaction","getDealCardoInfo");

$s2c["sys"]["use_actionpoint"] = array();
$s2c["sys"]["use_actionpoint"][] = array("battleaction","getActionPoint");

$s2c["con"] = array();
$s2c["con"]["set_username"] = array();
$s2c["con"]["set_username"][] = array("connection","getUsername");
$s2c["con"]["set_username"][] = array("connection","getUserList");
$s2c["con"]["set_username"][] = array("connection","getBattlefieldList");

$s2c["pre"]["create_bf"] = array();
$s2c["pre"]["create_bf"][] = array("prepare","getEnterBattlefieldInfo");
$s2c["pre"]["create_bf"][] = array("connection","getBattlefieldList");

$s2c["pre"]["enter_bf"] = array();
$s2c["pre"]["enter_bf"][] = array("prepare","getEnterBattlefieldInfo");
$s2c["pre"]["enter_bf"][] = array("connection","getBattlefieldList");

$s2c["pre"]["start_bf"] = array();
$s2c["pre"]["start_bf"][] = array("prepare","getStartBattlefieldInfo");
$s2c["pre"]["start_bf"][] = array("battleaction","getInitDealCardoInfo");

$s2c["batt"]["use_cardo"] = array();
$s2c["batt"]["use_cardo"][] = array("battleaction","getActionPoint");
//$s2c["batt"]["use_cardo"][] = array("battleaction","getDealCardoInfo");



?>
