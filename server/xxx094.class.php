<?php

class xxx094 extends special {
    protected $xxx = 94;
    protected $name = "exchange";

    public function gain(){ //exchange one random opponent cardo with my selected cardo
        if(!self::verify()) return;

        $caster_pos = $this->msg["data"]["caster_pos"];
        $target_pos = array_rand($this->target->cardo);

        $clone = clone $this->caster->cardo[$caster_pos];
        $this->caster->cardo[$caster_pos] = $this->target->cardo[$target_pos];
        $this->target->cardo[$target_pos] = $clone;

        $from = $this->target->cardo[$target_pos]->getXXX();
        $to = $this->caster->cardo[$caster_pos]->getXXX();

        self:: getExchangedCardo($caster_pos,$from,$to,$target_pos);
        return 1;
    }
    protected function verify(){
        $msg = $this->msg["data"];
        if(!isset($msg["caster_pos"])) return;
        $pos = $msg["caster_pos"];
        if($pos == $this->pos) return; //select cardo has same pos with this exchange cardo
        if(!isset($this->caster->cardo[$pos])) return; //select cardo not exists
        if(!$this->target->getCardoCount()) return; //target has no cardo
        return 1;
    }
    protected function getExchangedCardo($caster_pos,$from,$to,$target_pos){
        $a = array();
        $a["pos"] = $caster_pos;
        $a["from"] = $from;
        $a["to"] = $to;

        $id = $this->caster->getID();
        $json = s2c::JSON("batt","exchange_cardo",$a);

        $b = array();
        $b["pos"] = $target_pos;
        $b["from"] = $to;
        $b["to"] = $from;
        $other = $this->target->getID();
        $otherjson = s2c::JSON("batt","exchange_cardo",$b);

        $this->gi->result[] = s2c::outlet("diff",$id,$json,$other,$otherjson);
        return 1;
    }
}

?>
