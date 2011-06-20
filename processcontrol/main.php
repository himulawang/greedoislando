<?php
session_start();

if (!isset($_SESSION['id'])) exit("<script>window.location='index.html'</script>");
?>
<!doctype html>
<html>
<head>
    <title>GI World Process Control</title>
    <style>
        table {border-collapse: collapse;}
        td {border: 1px solid #CCCCCC;}
        .content { min-width: 250px;}
    </style>
    <script src='jquery-1.5.1.min.js'></script>
    <script src='main.js'></script>
</head>
<body>

<div id='header'>
    <input type='button' value='getWaterFall' onclick='getWaterFall();'>
    <input type='button' value='add' onclick='add();'>
</div>
<div id='waterfall'> </div> 
</body>


</html>
