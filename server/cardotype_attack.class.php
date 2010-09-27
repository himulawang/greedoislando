<?php

class attack extends cardo {
    public function gain(){
        $this->target->doHarm($this->damage);

        $canceledDefendField = $this->target->cancelDefendField();
        if($canceledDefendField) self::getCancelDefendField($canceledDefendField);
        
        self::getOpponentHP();
    }
    public function getDamage(){
        return $this->damage;
    }
    public function changeDamage($damage){
        $this->damage = $damage;
    }
    protected function getCancelDefendField($canceledDefendField){
        $json = s2c::JSON("batt","cancel_defendfield",array( $this->target->getID() => $canceledDefendField) );
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
    }
    protected function getOpponentHP(){
        $hp = $this->target->getHP();
        $json = s2c::JSON("batt","get_hp",array( $this->target->getID() => $hp ) );
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
    }
}

?>
