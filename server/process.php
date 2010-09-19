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

$c2s["sys"]["use_actionpoint"] = array();
$c2s["sys"]["use_actionpoint"][] = array("battleaction","useActionPoint");

$c2s["sys"]["get_attackcardo"] = array();
$c2s["sys"]["get_attackcardo"][] = array("battleaction","getAttackCardo");

$c2s["con"] = array();
$c2s["con"]["set_username"] = array();
$c2s["con"]["set_username"][] = array("connection","setUsername");
$c2s["con"]["set_username"][] = array("connection","setUserList");
$c2s["con"]["set_username"][] = array("connection","setBattlefieldList");



$p["s2c"] = array();


?>
