<?php

class attack extends cardo {
    public function gain(){
        $canceledDefendField = $this->target->cancelDefendField();
        if($canceledDefendField) self::getCancelDefendField($canceledDefendField);
        
        if($this->damage){
            $this->target->doHarm($this->damage);
            self::getEffectDamage();
            self::getOpponentHP();
            self::getOpponentLose();
        }

        return 1;
    }
    public function getDamage(){
        return $this->damage;
    }
    public function changeDamage($damage){
        $this->damage = $damage;
    }
    protected function getCancelDefendField($canceledDefendField){
        $id = $this->target->getID();
        $a = array();
        $a[$id] = array();
        $a[$id]["id"] = $id;
        $a[$id]["df"] = $canceledDefendField;
        $json = s2c::JSON("batt","cancel_defendfield",$a);
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
    }
    protected function getOpponentHP(){
        $id = $this->target->getID();
        $a = array();
        $a[$id] = array();
        $a[$id]["id"] = $id;
        $a[$id]["hp"] = $this->target->getHP();
        $json = s2c::JSON("batt","get_hp",$a);
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
    }
    protected function getEffectDamage(){
        $id = $this->target->getID();
        $a = array();
        $a[$id] = array();
        $a[$id]["id"] = $id;
        $a[$id]["damage"] = $this->damage;
        $json = s2c::JSON("batt","get_damage",$a);
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
    }
    protected function getOpponentLose(){
        $id = $this->target->getID();
        $a = array();
        $a[$id] = array();
        $a[$id]["id"] = $id;
        $a[$id]["lose"] = $this->target->getLose();
        if($a[$id]["lose"]){
            $json = s2c::JSON("batt","get_lose",$a);
            $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
        }
    }
}

?>
