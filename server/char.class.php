<?php
class char {
    private $id;
    private $name;
    private $hp;
    private $maxhp;
    private $speed;
    private $speedup = 0;
    private $actionPoint = 0;
    private $timestamp;
    public $defendField;
    public $buffer = array(); //Cardo
    public $cardo = array();

    function __construct($id,$name){
        $this->id = $id;
        $this->name = $name;
    }

    public function setMaxHP($maxhp){
        $this->maxhp = $maxhp;
        $this->hp = $maxhp;
    }

    public function setSpeed($speed){
        $this->speed = $speed;
    }
    public function setSpeedUp($up){
        $this->speedup = $up;
    }
    public function setActionPoint($actionPoint){
        $this->actionPoint = $actionPoint;
    }
    public function getHP(){
        return $this->hp;
    }

    public function getActionPoint(){
        return $this->actionPoint;
    }
    public function getSpeedup(){
        return $this->speedup;
    }

    public function getName(){
        return $this->name;
    }
    public function getID(){
        return $this->id;
    }

    public function checkActionPointFull(){
        return $this->actionPoint >= GI_BattleUseActionPoint ? 1 : 0;
    }

    public function addActionPoint(){
        if(self::checkActionPointFull()) return;

        $multi = time() - $this->timestamp;
        if($multi < 1) return;

        self::setTimestamp();

        while ($multi > 0){
            $this->actionPoint += $this->speed + $this->speedup;
            if(self::checkActionPointFull()) return 1; //need deal cardo 

            --$multi;
        }
        if(self::checkActionPointFull()) return 1; //need deal cardo 
        return 2; // actionPoint add but not full
    }
    public function setTimestamp(){
        $this->timestamp = time();
    }    

    public function useActionPoint(){
        if(!self::checkActionPointFull()) return;
        $this->actionPoint = $this->actionPoint - GI_BattleUseActionPoint;
        self::setTimestamp();
        return 1;
    }

    public function getCharInfo(){
        $a["id"] = $this->id;
        $a["name"] = $this->name;
        $a["hp"] = $this->hp;
        $a["maxhp"] = $this->maxhp;
        $a["speed"] = $this->speed;
        $a["speedup"] = $this->speedup;
        $a["actionPoint"] = $this->actionPoint;
        return $a;
    }

    public function getCardoCount(){
        return count($this->cardo);
    }

    public function getCardoObverse(){ //Return Cardo Obverse To Opponent
        $a = array();
        foreach($this->cardo as $k => $v){
            $a[$k] = 0;
        }
        return $a;
    }

    public function getCardo(){
        $a = array();
        foreach($this->cardo as $k => $v){
            $a[$k] = $v->getXXX();
        }
        return $a;
    }

    public function getCardoXXXByPos($pos){
        if (!isset($this->cardo[$pos])) return;
        return $this->cardo[$pos]->getXXX();
    }
    public function getCardoTypeByPos($pos){
        if (!isset($this->cardo[$pos])) return;
        return $this->cardo[$pos]->getType();
    }

    public function setHPByChange($change){
        $this->hp = $this->hp + $change;
        if($this->hp<0) $this->hp = 0;
        if($this->hp>$this->maxhp) $this->hp = $this->maxhp;
    }

    public function doHarm($damage){
        $this->hp = $this->hp - $damage;
        if($this->hp<0) $this->hp = 0;
        if($this->hp>$this->maxhp) $this->hp = $this->maxhp;
    }

    public function setDefendField($defendField){
        $this->defendField = $defendField;
    }
    public function cancelDefendField(){
        if($this->defendField){
            $xxx = $this->defendField->getXXX();
            $this->defendField = null;
            return $xxx;
        }
        return;
    }
    public function getDefendField(){
        return $this->defendField;
    }
    public function checkCardoExist($pos){
        return isset($this->cardo[$pos]) ? 1 : 0;
    }
    public function getLose(){
        return $this->hp == 0 ? 1 : 0;
    }

}
?>
