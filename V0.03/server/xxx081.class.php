<?php
class xxx081 extends magdefend{
    protected $xxx = 81;
    protected $name = "Kinetic energy distribution field";
    public function effect($cardo){ //Defend 50% Magic Damage
        if(get_parent_class($cardo)!="magattack") return;

        $canceledDefendField = $this->caster->cancelDefendField();

        $damage = $cardo->getDamage();
        $newDamage = round($damage / 2);
        $cardo->changeDamage($newDamage);// Effect
        defend::effectDefendField($canceledDefendField);
        defend::getCancelDefendField($canceledDefendField); //Field Disappear

        return 1;
    }
}
?>
