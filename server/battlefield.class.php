<?php

class battlefield {
    private $no;
    private $name; //battlefield name
    private $char = array(); //store char object
    private $battleStart = 0;
    private $timestamp;

    function __construct($id,$battlefieldname,$charname){
        $this->name = $battlefieldname;
        self::prepareChar($id,$charname);
    }

    private function _getMulti(){
        return time() - $this->timestamp;
    }

    private function _setTimestamp(){
        $this->timestamp = time();
    }

    public function setIdx($no){
        $this->no = $no;
    }

    public function checkCharExists($id){
        return isset($this->char[$id]) ? 1 : 0;
    }

    public function addActionPoint(){
        $multi = self::_getMulti();
        if($multi <= 0) { return; } //Check Need Add
        self::_setTimestamp();
        foreach($this->char as $k => &$v){
            battleaction::addActionPoint($v,$multi);
        }
    }

    public function prepareChar($id,$charname){
        //Check Char is in this battlefield
        if(self::checkCharExists($id)){ 
            console::write("Char" . $charname . "is in this field");
            return;
        }
        //Prepare
        $char = new char($id,$charname);
        $char->setMaxHP(30); //TODO
        $char->setSpeed(2); //TODO
        $this->char[$id] = $char;
        return $char->getAttributeArray();
    }

    public function startBattle(){ //Start A Battle
        //Check Char Count
        if(self::getFieldCharCount != 2) {
            console::write("Chars not fully prepared");
            return 0;
        }
        if(!self::checkBattleStatus()){
            $this->battleStart = 1;
            $this->timestamp = time(); //Time count for action point
            console::write("Battlefield {$this->name} has start fighting");
            return 1;
        }
    }

    public function stopBattle(){ //Stop A Battle
        if(self::checkBattleStatus()){
            $this->battleStart = 0;
            console::write("Battlefield {$this->name} has stop fighting");
        }
    }

    public function checkBattleStatus(){ //Check Battle is started
        return $this->battleStart;
    }

    public function getFieldCharCount(){
        return count($this->char);
    }

    public function getFieldName(){
        return $this->name;
    }

    public function kickFieldChar($id){
        //Kick Char
        if(self::checkCharExists($id)){
            $charname = $this->char[$id]->name;
            unset($this->char[$id]);
            console::write($charname . " has left the battlefield " . $this->name);
        }else{
            console::write("Can't find char in battlefield" . $this->name);
        }
        //Destory this field
        if(self::getFieldCharCount()==0){
            console::write("Battlefield {$this->name} has been destoryed");
            self::destoryField();
        }
    }

    public function destoryField(){
        unset($this);
    }

    public function getBattlefieldInfo(){
        $a = array();
        $a["no"] = $this->no;
        $a["bf_name"] = $this->name;
        $a["battleStart"] = $this->battleStart;
        $a["char"] = array();
        foreach($this->char as $k => $v){
            $a["char"][] = $v->name;
        }
        return $a;
    }

}

?>

