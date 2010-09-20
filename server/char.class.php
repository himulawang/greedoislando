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
    public function getHP(){
        return $this->hp;
    }

    public function getActionPoint(){
        return $this->actionPoint;
    }

    public function getName(){
        return $this->name;
    }

    public function checkActionPointFull(){
        return $this->actionPoint >= 10 ? 1 : 0;
    }

    public function addActionPoint($multi){
        //check ActionPointFull
        if(self::checkActionPointFull()){ 
            return 0; //Don need feedback
        }

        while ($multi > 0){
            $this->actionPoint += $this->speed + $this->speedup;
            if(self::checkActionPointFull()){ return 1; }

            --$multi;
        }
        return 1;
    }

    public function useActionPoint(){
        if(!self::checkActionPointFull()) return;
        $this->actionPoint = $this->actionPoint - GI_BattleUseActionPoint;
        return 1;
    }

    function __tostring(){
        $array = (array) $this;
        return json_encode($array);
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

}
?>
