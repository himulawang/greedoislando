<?php

class xxx095 extends special {
    protected $xxx = 95;
    protected $name = "real exchange";

    public function gain(){ //exchange one selected opponent's cardo with my selected cardo
        if(!self::verify()) return;

        $caster_pos = $this->msg["data"]["caster_pos"][0];
        $target_pos = $this->msg["data"]["target_pos"][0];

        $clone = clone $this->caster->cardo[$caster_pos];
        $this->caster->cardo[$caster_pos] = $this->target->cardo[$target_pos];
        $this->target->cardo[$target_pos] = $clone;

        $from = $this->target->cardo[$target_pos]->getXXX();
        $to = $this->caster->cardo[$caster_pos]->getXXX();

        self::getExchangedCardo($caster_pos,$from,$to,$target_pos);
        return 1;
    }
    protected function verify(){
        $msg = $this->msg["data"];
        if(! (isset($msg["caster_pos"][0]) && isset($msg["target_pos"][0])) ) return;
        $pos = $msg["caster_pos"][0];
        if($pos == $this->pos) return; //select cardo has same pos with this exchange cardo
        if(!isset($this->caster->cardo[$pos])) return; //my select cardo not exists
        if(!isset($this->target->cardo[$msg["target_pos"][0]])) return; //target select cardo not exists
        return 1;
    }
    protected function getExchangedCardo($caster_pos,$from,$to,$target_pos){
        $id = $this->caster->getID();
        $a = array();
        $a[$id] = array();
        $a[$id]["id"] = $id;
        $a[$id]["from"] = $from;
        $a[$id]["from_pos"] = $caster_pos;
        $a[$id]["to"] = $to;
        $a[$id]["to_pos"] = $target_pos;

        $json = s2c::JSON("batt","exchange_cardo",$a);

        $b = array();
        $other = $this->target->getID();
        $b[$other]["id"] = $other;
        $b[$other]["from"] = $to;
        $b[$other]["from_pos"] = $target_pos;
        $b[$other]["to"] = $from;
        $b[$other]["to_pos"] = $caster_pos;
        $otherjson = s2c::JSON("batt","exchange_cardo",$b);

        $this->gi->result[] = s2c::outlet("diff",$id,$json,$other,$otherjson);
        return 1;
    }
}
