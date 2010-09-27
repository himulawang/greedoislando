<?php
class xxx072 extends phydefend{
    protected $xxx = 72;
    protected $name = "lid";
    public function effect($cardo){ //Defend Physical Damage Except Bomb
        if(get_parent_class($cardo)!="phyattack") return;

        $xxx = $cardo->getXXX();
        if($xxx == 53) return; //bomb

        $canceledDefendField = $this->caster->cancelDefendField();

        $cardo->changeDamage(0);// Effect
        defend::effectDefendField($canceledDefendField);
        defend::getCancelDefendField($canceledDefendField); //Field Disappear

        return 1;
    }
}
?>
