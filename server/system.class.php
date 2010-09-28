<?php
//system class use to control admin operation TODO
class system extends stdProcess{ 
    function __construct($id,$msg,$gi){
        parent::__construct($id,$msg,$gi);

        $this->stdProcess["get_attackcardo"] = array();
        $this->stdProcess["get_attackcardo"][] = "sysGetAttackCardo";        
        
        $this->stdProcess["get_defendcardo"] = array();
        $this->stdProcess["get_defendcardo"][] = "sysGetDefendCardo";        
        
        $this->stdProcess["get_specialcardo"] = array();
        $this->stdProcess["get_specialcardo"][] = "sysGetSpecialCardo";        
        
        if(!parent::verify()) return;
        parent::run();
    }
    protected function sysGetAttackCardo(){
        $obj = new battle($this->id,$this->msg,$this->gi);
    }
    protected function sysGetDefendCardo(){
        $obj = new battle($this->id,$this->msg,$this->gi);
    }
    protected function sysGetSpecialCardo(){
        $obj = new battle($this->id,$this->msg,$this->gi);
    }
}

?>
