<?php

class magattack extends cardo {
    protected $type = 2;
    protected $typename = "Magic Attack Cardo";
    protected $name;
    protected $damage;

    public function gain($caster,$target,$msg,$gi){
        $target->doHarm($this->damage);

        $xxx = $target->cancelDefendField();
        if($xxx){
            $id = $caster->getID();
            $oppID = $target->getID();
            $range = array($id,$oppID);
            self::getCancelDefendField($oppID,$range,$xxx,$gi);
        }
        return battleaction::getOpponentHP($caster->getID(),$msg,$gi);
    }
    public function getDamage(){
        return $this->damage;
    }
    public function changeDamage($damage){
        $this->damage = $damage;
    }
    protected function getCancelDefendField($id,$range,$xxx,$gi){
        $json = s2c::JSON("batt","cancel-defendfield",array($id=>$xxx));
        $gi->result[] = s2c::outlet("selected",$range,$json);
    }
}

?>
