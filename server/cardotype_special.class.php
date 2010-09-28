<?php

class special extends cardo{
    protected $type = 5;
    protected $typename = "Special Cardo";
    protected $name;

    protected function getRemainRound(){
        $id = $this->caster->getID();
        $a = array();
        $a[$id] = array();
        $a[$id][$this->xxx] = $this->remainRound;
        $json = s2c::JSON("batt","get_buffer_remain_round",$a);
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
    }
    protected function getBuffer(){
        $json = s2c::JSON("batt","get_buffer",array($this->caster->getID() => $this->xxx));
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
    }
    protected function getUnbuffer(){
        $json = s2c::JSON("batt","get_unbuffer",array($this->caster->getID() => $this->xxx));
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
    }
}

?>
