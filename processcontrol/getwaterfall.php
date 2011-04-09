<?php

session_start();
if (!isset($_SESSION['id'])) exit;

require_once 'db.inc';

$db = new db;

$query = "SELECT * FROM waterfall ORDER BY id DESC LIMIT 100";
$db->query($query);

$output = array();
while ($db->fetch()) {
    $output[] = $db->row;
}

echo json_encode($output);
