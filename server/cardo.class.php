<?php

class cardo {
    protected $xxx;
    protected $type; //phy attack; mag attack etc.
    private $CARDOINDEX = array(
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

    //ref: https://spreadsheets0.google.com/ccc?key=tO-BC7MPXxXbvmuqiVzLDpg#gid=0

    function __construct($xxx=null){
        if(is_int($xxx)){
            $this->xxx = $xxx; // cardo id has decided
        }else{
            $this->xxx = core::random($this->CARDOINDEX); //random a cardo
        }
        unset($this->CARDOINDEX);
    }

    public function getXXX(){
        return $this->xxx;
    }
}

?>
