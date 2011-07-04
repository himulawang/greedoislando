<?php

session_start();
if (!isset($_SESSION['id'])) exit;

if (!(
    isset($_POST['who'])
    &&isset($_POST['id'])
    &&isset($_POST['text'])
    )) exit;

require_once 'db.inc';

$who = $_POST['who'];
$id = $_POST['id'];
$text = $_POST['text'];

$db = new db;

$query = "UPDATE waterfall SET {$who} = '{$text}' WHERE id = {$id};";
echo $query;
$db->query($query);

