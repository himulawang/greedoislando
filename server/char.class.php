<?php
class char {
    public $id;
    public $name;
    public $hp;
    public $maxhp;
    public $speed;
    public $speedup = 0;
    public $actionPoint = 0;
    public $cardo = array();

    function __construct($id,$name){
        $this->id = $id;
        $this->name = $name;
        return;
    }

    public function setMaxHP($maxhp){
        $this->maxhp = $maxhp;
        $this->hp = $maxhp;
        return;
    }

    public function setSpeed($speed){
        $this->speed = $speed;
        return;
    }

    public function addActionPoint($multi){
        if(self::checkActionPointFull()){ return; }

        for($i = 0; $i < $multi; ++$i){
            $this->actionPoint += $this->speed + $this->speedup;
            if(self::checkActionPointFull()){ return; }
        }
    }

    private function checkActionPointFull(){
        return $this->actionPoint >= 10 ? 1 : 0;
    }

    function __tostring(){
        $array = (array) $this;
        return json_encode($array);
    }

}
?>
