<?php
class xxx073 extends phydefend{
    protected $xxx = 73;
    protected $name = "GFW";
    public function effect($cardo){ //Defend All Physical Damage
        if(get_parent_class($cardo)!="phyattack") return;

        $canceledDefendField = $this->caster->cancelDefendField();

        $cardo->changeDamage(0);// Effect
        defend::effectDefendField($canceledDefendField);
        defend::getCancelDefendField($canceledDefendField); //Field Disappear

        return 1;
    }
}
?>
