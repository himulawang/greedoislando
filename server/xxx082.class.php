<?php
class xxx082 extends magdefend{
    protected $xxx = 82;
    protected $name = "St. Cross Shield";
    public function effect(){ //Defend 50% Magic Damage
        if(get_parent_class($cardo)!="magattack") return;

        $canceledDefendField = $this->caster->cancelDefendField();

        defend::effectDefendField($canceledDefendField);
        defend::getCancelDefendField($canceledDefendField); //Field Disappear

        //Effect
        $df = $this->target->defendField;
        if($df){ //If cast has defend field too
            $this->df->varEnvironment($this->msg,$this->bf,$this->target,$this->caster,$this->range,$this->gi); //caster and target change position
            $this->df->effect($cardo); //Defend Field Take Effect
        }        

        $gi->result[] = $cardo->gain();
        $cardo->changeDamage(0);
        return 1;
    }
}
?>
