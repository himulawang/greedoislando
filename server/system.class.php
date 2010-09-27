<?php
//system class use to control admin operation TODO
class system extends stdProcess{ 
    function __construct($id,$msg,$gi){
        parent::__construct($id,$msg,$gi);

        $this->stdProcess["get_attackcardo"] = array();
        $this->stdProcess["get_attackcardo"][] = "getAttackCardo";        
        
        $this->stdProcess["get_defendcardo"] = array();
        $this->stdProcess["get_defendcardo"][] = "getDefendCardo";        
        
        $this->stdProcess["get_specialcardo"] = array();
        $this->stdProcess["get_specialcardo"][] = "getSpecialCardo";        
        
        if(!parent::verify()) return;
        parent::run();
    }
    protected function getAttackCardo(){
        $obj = new battle($this->id,$this->msg,$this->gi);
    }
    protected function getDefendCardo(){
        $obj = new battle($this->id,$this->msg,$this->gi);
    }
    protected function getSpecialCardo(){
        $obj = new battle($this->id,$this->msg,$this->gi);
    }
}

?>
