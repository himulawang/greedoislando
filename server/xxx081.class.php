<?php
class xxx081 extends magdefend{
    protected $xxx = 81;
    protected $name = "Kinetic energy distribution field";
    public function effect($caster,$target,$cardo,$gi){ //Defend 50% Magic Damage
        if(get_parent_class($cardo)!="magattack") return;

        $xxx = $cardo->getXXX();

        $oppID = $target->getID();
        $range = array($caster->getID(),$oppID);
        $fieldXXX = $target->cancelDefendField();

        $damage = $cardo->getDamage();
        $newDamage = round($damage / 2);
        $cardo->changeDamage($newDamage);// Effect
        parent::effectDefendField($oppID,$range,$fieldXXX,$gi);

        parent::getCancelDefendField($oppID,$range,$fieldXXX,$gi); //Field Disappear

        return 1;
    }
}
?>
