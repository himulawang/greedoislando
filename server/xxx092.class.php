<?php
class xxx092 extends special{
    protected $xxx = 92;
    protected $name = "cock blood";
    protected $speedup = 2;
    protected $remainRound = 3;

    public function gain($caster,$target,$msg,$gi){ // +2 Speed Keep 3 rounds
        $caster->buffer[$this->xxx] = $this;
        $caster->setSpeedUp($this->speedup);
        $id = $caster->getID();
        $oppID = $target->getID();
        $range = array($id,$oppID);
        parent::getBuffer($id,$range,$this->xxx,$gi);
        battleaction::getSpeedUp($id,null,$gi);
    }
    public function bufferCountdown($caster,$target,$msg,$gi){
        if ($this->remainRound < 1) {
            self::unbuffer($caster,$target,$msg,$gi);
            return;
        }
        --$this->remainRound;
    }
    public function unbuffer($caster,$target,$msg,$gi){
        $caster->setSpeedUp(0);
        $id = $caster->getID();
        $oppID = $target->getID();
        $range = array($id,$oppID);
        parent::getUnbuffer($id,$range,$this->xxx,$gi);
        battleaction::getSpeedUp($id,null,$gi);
        unset($caster->buffer[$this->xxx]);
    }
}
?>
