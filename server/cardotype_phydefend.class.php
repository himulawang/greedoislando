<?php
class phydefend extends cardo{
    protected $type = 3;
    protected $typename = "Physic Defend Cardo";
    protected $name;
    public function gain($caster,$target,$msg,$gi){ //Open a new Defend Field
        $xxx = $caster->cancelDefendField(); //Overwrite the previous Defend Field
        $id = $caster->getID();
        $oppID = $target->getID();
        $range = array($id,$oppID);

        if($xxx) self::getCancelDefendField($id,$range,$xxx,$gi);
        
        $caster->setDefendField($this);

        return battleaction::getDefendField($id,$msg,$gi);
    }
    protected function getCancelDefendField($id,$range,$xxx,$gi){
        $json = s2c::JSON("batt","cancel_defendfield",array( $id => $xxx));
        $gi->result[] = s2c::outlet("selected",$range,$json);
    }
    protected function effectDefendField($id,$range,$xxx,$gi){
        $json = s2c::JSON("batt","effect_defendfield",array($id=>$xxx));
        $gi->result[] = s2c::outlet("selected",$range,$json);
    }
}
?>
