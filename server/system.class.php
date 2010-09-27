<?php

class system extends stdProcess{
    function __construct($id,$msg,$gi){
        parent::__construct($id,$msg,$gi);

        $this->stdProcess["get_attackcardo"] = array();
        $this->stdProcess["get_attackcardo"][] = "getAttackCardo";        
        
        if(!parent::verify()) return;
        parent::run();
    }
    protected function getAttackCardo(){
        $obj = new battle($this->id,$this->msg,$this->gi);
    }
}

?>
