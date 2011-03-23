<?php

$USECARDO = array();

$USECARDO[51] = array();
$USECARDO[51]["func"] = array();
$USECARDO[51]["func"][] = array();

class usecardo {
    private $caster,$target;
    private $xxx,$type;
    private $gi;
    function __construct($xxx,$caster,$target,$msg,$gi){
        global $CARDOINDEX;
        $this->caster = $caster;
        $this->taraget = $target;
        $this->gi = $gi;
        $this->xxx = $xxx;

    }
    public function run(){
        
    }
}

?>
