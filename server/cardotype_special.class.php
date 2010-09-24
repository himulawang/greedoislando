<?php

class special extends cardo{
    protected $type = 5;
    protected $typename = "Special Cardo";
    protected $name;

    protected function getRemainRound($id,$range,$xxx,$gi){
        $a = array();
        $a[$id] = array();
        $a[$id][$xxx] = $this->remainRound;
        $json = s2c::JSON("batt","get_remain_round",$a);
        $gi->result[] = s2c::outlet("selected",$range,$json);
    }
    protected function getBuffer($id,$range,$xxx,$gi){
        $json = s2c::JSON("batt","get_buffer",array($id=>$xxx));
        $gi->result[] = s2c::outlet("selected",$range,$json);
    }
    protected function getUnbuffer($id,$range,$xxx,$gi){
        $json = s2c::JSON("batt","get_unbuffer",array($id=>$xxx));
        $gi->result[] = s2c::outlet("selected",$range,$json);
    }
}

?>
