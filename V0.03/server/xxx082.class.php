<?php
class xxx082 extends magdefend{
    protected $xxx = 82;
    protected $name = "St. Cross Shield";
    public function effect($cardo){ //Defend 50% Magic Damage
        if(get_parent_class($cardo)!="magattack") return;

        $canceledDefendField = $this->caster->cancelDefendField();

        defend::effectDefendField($canceledDefendField);
        defend::getCancelDefendField($canceledDefendField); //Field Disappear

        $df = $this->target->defendField;
        if($df){ //If cast has defend field too
            $df->varEnvironment($this->msg,$this->pos,$this->bf,$this->target,$this->caster,$this->range,$this->gi); //caster and target change position
            $df->effect($cardo); //Defend Field Take Effect
        }        

        $cardo->varEnvironment($this->msg,$this->pos,$this->bf,$this->caster,$this->target,$this->range,$this->gi); //reverse cardo damage
        $gi->result[] = $cardo->gain();
        $cardo->changeDamage(0);
        return 1;
    }
}
?>
