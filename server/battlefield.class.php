<?php

class battlefield {
    private $no;
    private $name; //battlefield name
    public $char = array(); //store char object
    public $battleStart = 0;
    private $timestamp;

    function __construct($id,$battlefieldname,$charname){
        $this->name = $battlefieldname;
        self::enterBattlefield($id,$charname);
    }

    function __destruct(){
        console::write("Battlefield {$this->name} has been destoryed");
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
        if($multi <= 0) { return 0; } //Check Need Add return need feedback
        self::_setTimestamp();
        $needFeedback = 0;
        foreach($this->char as $k => &$v){
            $_needFeedback = $v->addActionPoint($multi);
            $needFeedback = $needFeedback || $_needFeedback;
        }
        return (int) $needFeedback;
    }

    public function useActionPoint($id){
        if(!self::checkCharExists($id)) return;
        $char = $this->char[$id]->useActionPoint();
        if(!is_array($char)) return;
        $a = array();
        $a["no"] = $this->no;
        $a["char"] = $char;
        return $a;
    }

    public function enterBattlefield($id,$charname){
        $char = new char($id,$charname);
        $char->setMaxHP(30); //TODO
        $char->setSpeed(3); //TODO
        $this->char[$id] = $char;
        return $char->getCharInfo();
    }

    public function startBattle(){ //Start A Battle
        //Check Char Count
        if(self::getFieldCharCount() != 2) {
            console::write("Chars not fully prepared");
            return;
        }
        if(!$this->battleStart){
            $this->battleStart = 1;
            $this->timestamp = time(); //Time count for action point
            console::write("Battlefield {$this->name} has start fighting");
            return 1;
        }
    }

    public function stopBattle(){ //Stop A Battle
        if($this->battleStart){
            $this->battleStart = 0;
            console::write("Battlefield {$this->name} has stop fighting");
            return 1; //Stop Succeed
        }else{
            console::write("Battlefield {$this->name} hasn't started");
            return 0; //Stop failed
        }
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
            $charname = $this->char[$id]->getName();
            unset($this->char[$id]);
            console::write($charname . " has left the battlefield " . $this->name);
        }else{
            console::write("Can't find char in battlefield" . $this->name);
        }
        //Destory this field
        if(self::getFieldCharCount()==0){
            return 1; //need destory this field;
        }
    }

    public function getActionPoint(){
        $a = array();
        $a["no"] = $this->no;
        $a["char"] = array();
        foreach($this->char as $k => $v){
            $a["char"][$k] = $v->getActionPoint();
        }
        return $a;
    }

    public function getBattlefieldInfo(){
        $a = array();
        $a["no"] = $this->no;
        $a["bf_name"] = $this->name;
        $a["battleStart"] = $this->battleStart;
        $a["char"] = array();
        foreach($this->char as $k => $v){
            $a["char"][$k] = $v->getName();
        }
        return $a;
    }
    public function getBattlefieldStartInfo(){
        $a = array();
        $a["no"] = $this->no;
        $a["bf_name"] = $this->name;
        $a["battleStart"] = $this->battleStart;
        foreach($this->char as $k => $v){
            $a["char"][$k] = $v->getCharInfo();
        }
        return $a;
    }
    public function getUserID(){
        return array_keys($this->char);
    }

    public function dealCardo($id){ 
        if( !isset($this->char[$id]) ) return;
        $char = &$this->char[$id];
        
        if( $char->getCardoCount() >= GI_BattleCardoCount) return; 
        $cardo = &$char->cardo;
        for($i = 0; $i < GI_BattleCardoCount; ++$i){
            if( isset($cardo[$i]) ){
                continue;
            }else{
                $cardo[$i] = new cardo();
            }
        }
        return 1;
    }

    public function getDealCardoInfo($id){
        $char = $this->char[$id];
        $a = array();
        $a["player"] = array();
        $a["player"][$id] = $char->getCardo();
        $a["other"] = array();
        $a["other"][$id] = $char->getCardoObverse();
        return $a;
    }

    public function getAttackCardo($id){
        if( !isset($this->char[$id]) ) return;
        $char = &$this->char[$id];
        
        $cardo = &$char->cardo;
        for($i = 0; $i < GI_BattleCardoCount; ++$i){
            $cardo[$i] = new cardo(51);
        }
        return 1;
    }

    public function useAttackCardo($xxx,$caster,$target){
        if($xxx==51){
            $change = -1;
        }else if($xxx==52){
            $change = -3;
        }else if($xxx==53){
            $change = -5;
        }
        return $this->char[$target]->setHPByChange($change);
    }
    public function getOpponentID($id){
        $array = self::getUserID();
        $array = array_diff($array,array($id));
        $array = array_values($array);
        return $array[0];
    }


}

?>

