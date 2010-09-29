<?php
class xxx092 extends special{
    protected $xxx = 92;
    protected $name = "cock blood";
    protected $speedup = 2;
    protected $remainRound = 3;

    public function gain(){ // +2 Speed Keep 3 rounds
        $this->caster->buffer[$this->xxx] = $this;
        $this->caster->setSpeedUp($this->speedup);
        $this->getBuffer();
        self::getSpeedUp();
        return 1;
    }
    public function bufferCountdown(){
        if ($this->remainRound < 1) {
            self::unbuffer();
            return;
        }
        $this->getRemainRound();
        --$this->remainRound;
    }
    protected function unbuffer(){
        $this->caster->setSpeedUp(0);
        parent::getUnbuffer();
        self::getSpeedUp();
        unset($this->caster->buffer[$this->xxx]);
    }
    protected function getSpeedUp(){
        $id = $this->caster->getID();
        $a = array();
        $a[$id] = array();
        $a[$id]["id"] = $id;
        $a[$id]["speed_up"] = $this->caster->getSpeedup();
        $json = s2c::JSON("batt","get_speedup",$a);
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
        return 1;
    }
}
?>
