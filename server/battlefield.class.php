<?php

class battlefield {
    private $no;
    private $name; //battlefield name
    public $char = array(); //store char object
    public $battleStart = 0;
    public $dealedCardo = array();
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
    public function resetDealedCardo($id=null){
        if($id){
            $this->dealedCardo[$id] = array();
            $this->dealedCardo[$id]["positiveSide"] = array();
            $this->dealedCardo[$id]["negativeSide"] = array();
        }else{
            $this->dealedCardo = array();
            foreach($this->char as $k){
                $this->dealedCardo[$k] = array();
                $this->dealedCardo[$k]["positiveSide"] = array();
                $this->dealedCardo[$k]["negativeSide"] = array();
            }
        }
    }

    public function setNo($no){
        $this->no = $no;
    }
    public function getNo(){
        return $this->no;
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
        return $this->char[$id]->useActionPoint();
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
            return; //Stop failed
        }
    }

    public function getFieldCharCount(){
        return count($this->char);
    }

    public function getName(){
        return $this->name;
    }

    public function kickChar($id){
        //Kick Char
        if(self::checkCharExists($id)){
            $charname = $this->char[$id]->getName();
            unset($this->char[$id]);
            console::write($charname . " has left the battlefield " . $this->name);
        }else{
            console::write("Can't find char in battlefield" . $this->name);
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
        $char = &$this->char[$id];
        
        if( $char->getCardoCount() >= GI_BattleCardoCount) return; 
        $cardo = &$char->cardo;
        self::resetDealedCardo($id);
        for($i = 0; $i < GI_BattleCardoCount; ++$i){
            if( isset($cardo[$i]) ){
                continue;
            }else{
                $cardo[$i] = core::gain(51);
                $this->dealedCardo[$id]["positiveSide"][$i] = $cardo[$i]->getXXX();
                $this->dealedCardo[$id]["negativeSide"][$i] = 0;
            }
        }
        return 1;
    }

    public function getDealCardo($id){
        $data = $this->dealedCardo;
        $a = array();
        $a["player"] = array();
        $a["player"][$id] = $data[$id]["positiveSide"];
        $a["other"] = array();
        $a["other"][$id] = $data[$id]["negativeSide"];
        return $a;
    }

    public function getAttackCardo($id){
        if( !isset($this->char[$id]) ) return;
        $char = &$this->char[$id];
        
        $cardo = &$char->cardo;
        $cardo[0] = core::gain(51);
        $cardo[1] = core::gain(52);
        $cardo[2] = core::gain(53);
        $cardo[3] = core::gain(61);
        $cardo[4] = core::gain(62);
        $cardo[5] = core::gain(53);

        self::varAllCardo($id);

        return 1;
    }
    public function getDefendCardo($id){
        if( !isset($this->char[$id]) ) return;
        $char = &$this->char[$id];
        
        $cardo = &$char->cardo;
        $cardo[0] = core::gain(71);
        $cardo[1] = core::gain(72);
        $cardo[2] = core::gain(73);
        $cardo[3] = core::gain(81);
        $cardo[4] = core::gain(82);
        $cardo[5] = core::gain(82);
        self::varAllCardo($id);
        return 1;
    }
    public function getSpecialCardo($id){
        if( !isset($this->char[$id]) ) return;
        $char = &$this->char[$id];
        
        $cardo = &$char->cardo;
        $cardo[0] = core::gain(91);
        $cardo[1] = core::gain(92);
        $cardo[2] = core::gain(91);
        $cardo[3] = core::gain(91);
        $cardo[4] = core::gain(91);
        $cardo[5] = core::gain(91);
        self::varAllCardo($id);
        return 1;
    }
    public function varAllCardo($id){
        $cardo = $this->char[$id]->cardo;
        foreach($cardo as $k=>$v){
            $this->dealedCardo[$id]["positiveSide"][$k] = $v->getXXX();
            $this->dealedCardo[$id]["negativeSide"][$k] = 0;
        }
    }

    public function getOpponentID($id){
        $array = self::getUserID();
        $array = array_diff($array,array($id));
        $array = array_values($array);
        return $array[0];
    }
    public function roundFinish($caster){
        foreach($caster->buffer as $k=>$v){ //Count down buffer
            $v->bufferCountdown();
        }
    }
    public function getEnterBattlefield($id){
        $a = array();
        $a["no"] = $this->no;
        $a["bf_name"] = $this->name;
        $a["battleStart"] = $this->battleStart;
        $a["newcomer"] = array($id=>$this->char[$id]->getName());
        $a["roomer"] = array();
        foreach($this->char as $k => $v){
            if($k==$id) continue;
            $a["roomer"][$k] = $v->getName();
        }
        return $a;
    }


}

?>
