<?php

session_start();
if (!isset($_SESSION['id'])) exit;

if (!(
    isset($_POST['bb'])
    &&isset($_POST['dya'])
    &&isset($_POST['ila'])
    &&isset($_POST['joseph'])
    )) exit;

require_once 'db.inc';

$bb = $_POST['bb'];
$dya = $_POST['dya'];
$ila = $_POST['ila'];
$joseph = $_POST['joseph'];

$db = new db;

$query = "INSERT INTO waterfall (`date`, bb, dya, ila, joseph) VALUES (NOW(), '{$bb}', '{$dya}', '{$ila}', '{$joseph}')";
echo $query;
$db->query($query);

