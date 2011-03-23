<?php

class xxx096 extends special {
    protected $xxx = 96;
    protected $name = "Mr. Chen's Camera";

    public function gain(){ //peep one random opponent's cardo, will be noticed by opponent
        if(!self::verify()) return;

        $target_pos = array_rand($this->target->cardo);
        $xxx = $this->target->cardo[$target_pos]->getXXX();
        $display = array($target_pos=>$xxx);
        self::getDisplay($display);
        self::getNoticed($display);
        return 1;
    }
    protected function verify(){
        if(!$this->target->getCardoCount()) return; //target has no cardo
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
    protected function getNoticed($display){
        $id = $this->target->getID();
        $other = $this->caster->getID();

        $a = array();
        $a[$other] = array();
        $a[$other]["id"] = $other;
        $a[$other]["display"] = $display;

        $json = s2c::JSON("batt","notice_cardo_exposure",$a);
        $this->gi->result[] = s2c::outlet("selected",$id,$json);        
        return 1;
    }


}

?>
