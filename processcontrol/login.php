<?php

session_start();

require_once 'db.inc';

if (!(isset($_POST['id'])
    &&isset($_POST['pwd']))
) exit;

$db = new db;

$username = $db->escape($_POST['id']);
$pwd = $db->escape($_POST['pwd']);

$md5 = md5($pwd);

$query = "SELECT id FROM user WHERE username = '{$username}' AND `password` = '{$md5}'";

$db->query($query);
$db->fetch();

if ($db->rows() == 1) {
    $data = $db->row;
    $_SESSION['id'] = $data['id'];
    exit('{"r":1}');
}

exit('{"r":2}');


