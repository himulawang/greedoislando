<?php
class xxx072 extends phydefend{
    protected $xxx = 72;
    protected $name = "lid";
    public function effect($caster,$target,$cardo,$gi){ //Defend Physical Damage Except Bomb
        if(get_parent_class($cardo)!="phyattack") return;

        $xxx = $cardo->getXXX();
        if($xxx == 53) return; //bomb

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
