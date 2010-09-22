<?php
class xxx073 extends phydefend{
    protected $xxx = 73;
    protected $name = "GFW";
    public function effect($caster,$target,$cardo,$gi){ //Defend All Physical Damage
        if(get_parent_class($cardo)!="phyattack") return;

        $xxx = $cardo->getXXX();

        $oppID = $target->getID();
        $range = array($caster->getID(),$oppID);
        $fieldXXX = $target->cancelDefendField();

        $cardo->changeDamage(0);// Effect
        parent::effectDefendField($oppID,$range,$fieldXXX,$gi);

        parent::getCancelDefendField($oppID,$range,$fieldXXX,$gi); //Field Disappear

        return 1;
    }
}
?>
