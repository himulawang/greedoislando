<?php
class char {
    private $id;
    private $name;
    private $hp;
    private $maxhp;
    private $speed;
    private $speedup = 0;
    private $actionPoint = 0;
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
        $a["cardo"] = $this->cardo;
        return $a;
    }

    public function getCardoCount(){
        return count($this->cardo);
    }

    public function getCardoObverse(){ //Return Cardo Obverse To Opponent
        $a;
        foreach($this->cardo as $k => $v){
            $a[$k] = 0;
        }
        return $a;
    }

}
?>
