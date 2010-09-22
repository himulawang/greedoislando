<?php

$CARDOINDEX = array();

$CARDOINDEX["51"] = array("xxx" => 51, "probability" => 200, "type" => 1, "name" => "hammer");
$CARDOINDEX["52"] = array("xxx" => 52, "probability" => 80, "type" => 1, "name" => "gun");
$CARDOINDEX["53"] = array("xxx" => 53, "probability" => 60, "type" => 1, "name" => "bomb");

$CARDOINDEX["61"] = array("xxx" => 61, "probability" => 200, "type" => 2, "name" => "fire");
$CARDOINDEX["62"] = array("xxx" => 62, "probability" => 50, "type" => 2, "name" => "thunder");

$CARDOINDEX["71"] = array("xxx" => 71, "probability" => 80, "type" => 3, "name" => "umbrella");
$CARDOINDEX["72"] = array("xxx" => 72, "probability" => 60, "type" => 3, "name" => "lid");
$CARDOINDEX["73"] = array("xxx" => 73, "probability" => 10, "type" => 3, "name" => "GFW");

$CARDOINDEX["81"] = array("xxx" => 81, "probability" => 70, "type" => 4, "name" => "Kinetic energy distribution field");
$CARDOINDEX["82"] = array("xxx" => 82, "probability" => 50, "type" => 4, "name" => "St. Cross Shield");

$CARDOINDEX["91"] = array("xxx" => 91, "probability" => 100, "type" => 5, "name" => "stone");
$CARDOINDEX["92"] = array("xxx" => 92, "probability" => 30, "type" => 5, "name" => "cock blood");
$CARDOINDEX["93"] = array("xxx" => 93, "probability" => 0, "type" => 5, "name" => "run away");
$CARDOINDEX["94"] = array("xxx" => 94, "probability" => 60, "type" => 5, "name" => "exchange");
$CARDOINDEX["95"] = array("xxx" => 95, "probability" => 10, "type" => 5, "name" => "real exchange");
$CARDOINDEX["96"] = array("xxx" => 96, "probability" => 30, "type" => 5, "name" => "Mr. Chen's Camera");
$CARDOINDEX["97"] = array("xxx" => 97, "probability" => 5, "type" => 5, "name" => "Mr. Chen's Teachings");

$CARDOPROBABILITY = array(
        51 => 200
        ,52 => 80
        ,53 => 60
        ,61 => 200
        ,62 => 50
        ,71 => 80
        ,72 => 60
        ,73 => 10
        ,81 => 70
        ,82 => 50
        ,91 => 100
        ,92 => 30
        ,93 => 0
        ,94 => 60
        ,95 => 10
        ,96 => 30
        ,97 => 5
    );

class cardo {
    protected $xxx;
    protected $type;
    protected $name;

    //ref: https://spreadsheets0.google.com/ccc?key=tO-BC7MPXxXbvmuqiVzLDpg#gid=0

    public function getXXX(){
        return $this->xxx;
    }
    public function getType(){
        return $this->type;
    }
    public function getName(){
        return $this->name;
    }
}

?>
