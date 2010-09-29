<?php

class defend extends cardo {
    public function gain(){ //Open a new Defend Field
        $canceledDefendField = $this->caster->cancelDefendField(); //Overwrite the previous Defend Field

        if($canceledDefendField) self::getCancelDefendField($canceledDefendField);

        $this->caster->setDefendField($this);

        self::getDefendField();
        return 1;
    }
    protected function effectDefendField($canceledDefendField){
        $id = $this->caster->getID();
        $a = array();
        $a[$id] = array();
        $a[$id]["id"] = $id;
        $a[$id]["df"] = $canceledDefendField;
        $json = s2c::JSON("batt","effect_defendfield",$a);
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
    }
    protected function getCancelDefendField($canceledDefendField){
        $id = $this->caster->getID();
        $a = array();
        $a[$id] = array();
        $a[$id]["id"] = $id;
        $a[$id]["df"] = $canceledDefendField;
        $json = s2c::JSON("batt","cancel_defendfield",$a);
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
    }
    protected function getDefendField(){
        $id = $this->caster->getID();
        $a = array();
        $a[$id] = array();
        $a[$id]["id"] = $id;
        $a[$id]["df"] = $this->xxx;
        $json = s2c::JSON("batt","get_defendfield",$a);
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
    }    
}

?>
