<?php
class xxx082 extends magdefend{
    protected $xxx = 82;
    protected $name = "St. Cross Shield";
    public function effect($caster,$target,$cardo,$gi){ //Defend 50% Magic Damage
        if(get_parent_class($cardo)!="magattack") return;

        $xxx = $cardo->getXXX();

        $oppID = $target->getID();
        $range = array($caster->getID(),$oppID);
        $fieldXXX = $target->cancelDefendField();

        parent::effectDefendField($oppID,$range,$fieldXXX,$gi);

        parent::getCancelDefendField($oppID,$range,$fieldXXX,$gi); //Field Disappear

        //Effect
        $df = $caster->defendField; //If cast has defend field too
        if($df) $df->effect($target,$caster,$cardo,$gi);

        $gi->result[] = $cardo->gain($target,$caster,null,$gi);
        $cardo->changeDamage(0);
        return 1;
    }
}
?>
