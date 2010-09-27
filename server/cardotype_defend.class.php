<?php

class defend extends cardo {
    public function gain(){ //Open a new Defend Field
        $canceledDefendField = $this->caster->cancelDefendField(); //Overwrite the previous Defend Field

        if($canceledDefendField) self::getCancelDefendField($canceledDefendField);

        $this->caster->setDefendField($this);

        self::getDefendField();
    }
    protected function effectDefendField($canceledDefendField){
        $json = s2c::JSON("batt","effect_defendfield",array( $this->caster => $canceledDefendField ) );
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
    }
    protected function getCancelDefendField($canceledDefendField){
        $json = s2c::JSON("batt","cancel_defendfield",array( $this->caster->getID() => $canceledDefendField) );
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
    }
    protected function getDefendField(){
        $defendField = $this->xxx;
        $json = s2c::JSON("batt","get_defendfield",array( $this->caster->id => $defendField ) );
        return s2c::outlet("selected",$this->range,$json);
    }    
}

?>
