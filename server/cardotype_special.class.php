<?php

class special extends cardo{
    protected $type = 5;
    protected $typename = "Special Cardo";
    protected $name;

    protected function getRemainRound(){
        $id = $this->caster->getID();
        $a = array();
        $a[$id] = array();
        $a[$id]["id"] = $id;
        $a[$id]["buffer"] = $this->xxx;
        $a[$id]["remain_round"] = $this->remainRound;
        $json = s2c::JSON("batt","get_buffer_remain_round",$a);
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
    }
    protected function getBuffer(){
        $id = $this->caster->getID();
        $a = array();
        $a[$id] = array();
        $a[$id]["id"] = $id;
        $a[$id]["buffer"] = $this->xxx;
        $json = s2c::JSON("batt","get_buffer",$a);
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
    }
    protected function getUnbuffer(){
        $id = $this->caster->getID();
        $a = array();
        $a[$id] = array();
        $a[$id]["id"] = $id;
        $a[$id]["buffer"] = $this->xxx;
        $json = s2c::JSON("batt","get_unbuffer",$a);
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
    }
}

?>
