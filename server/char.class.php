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
    }

    public function setMaxHP($maxhp){
        $this->maxhp = $maxhp;
        $this->hp = $maxhp;
    }

    public function setSpeed($speed){
        $this->speed = $speed;
    }

    function __tostring(){
        $array = (array) $this;
        return json_encode($array);
    }

    public function getAttributeArray(){
        return (array) $this;
    }

}
?>
