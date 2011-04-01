<?php

class xxx097 extends special {
    protected $xxx = 97;
    protected $name = "Mr. Chen's Teachings";

    public function gain(){//peep 3 selected opponent's cardo, won't be noticed by opponent
        if(!self::verify()) return;

        $msg = $this->msg["data"];
        $pos = $msg["target_pos"];
        $display = array();
        foreach($pos as $k => $v){
            $display[$v] = $this->target->cardo[$v]->getXXX();
        }

        self::getDisplay($display);
        return 1;
    }
    protected function verify(){
        $msg = $this->msg["data"];
        if(!isset($msg["target_pos"]) ) return;
        $pos = $msg["target_pos"];
        if(!is_array($pos)) return;

        foreach($pos as $k => $v){
            if (!isset($this->target->cardo[$v])) return;
        }
        return 1;
    }
    protected function getDisplay($display){
        $id = $this->caster->getID();
        $other = $this->target->getID();

        $a = array();
        $a[$other] = array();
        $a[$other]["id"] = $other;
        $a[$other]["display"] = $display;

        $json = s2c::JSON("batt","display_cardo",$a);
        $this->gi->result[] = s2c::outlet("selected",$id,$json);        
        return 1;
    }
}
?>
