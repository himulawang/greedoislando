<?php

class battle extends prepare {
    protected $caster,$target;
    function __construct($id,$msg,$gi){
        stdProcess::__construct($id,$msg,$gi);

        $this->stdProcess["add_actionpoint"] = array();
        $this->stdProcess["add_actionpoint"][] = "addActionPoint";

        $this->stdProcess["use_cardo"] = array();
        $this->stdProcess["use_cardo"][] = "varInitBattle";
        $this->stdProcess["use_cardo"][] = "varBattlefieldRange";
        $this->stdProcess["use_cardo"][] = "useCardo";

        if(!stdProcess::verify()) return;
        stdProcess::run();
    }
    protected function varInitBattle(){
        if(!prepare::varBattlefield()) return; //check char in bf

        $this->caster = $this->bf->char[$this->id];

        $oppID = $this->bf->getOpponentID($this->id);
        $this->target = $this->bf->char[$oppID];
        return 1;
    }
    protected function addActionPoint(){ //TODO ->perfect oriented char not bf
        foreach($this->gi->bf as $k => $v){
            $this->bf = $v;
            if($v->battleStart){
                prepare::varBattlefieldRange();
                $needFeedback = $v->addActionPoint();
                if($needFeedback){
                    foreach($this->range as $idx => $id){
                        self::getActionPoint($id);
                    }
                }
            }
        }
        return 1;
    }
    protected function useCardo(){
        if(!isset($this->msg["data"]["pos"])) return;

        $pos = $this->msg["data"]["pos"];

        if(!$this->caster->checkCardoExist($pos)) return;


        $cardo = &$this->caster->cardo[$pos];
        $cardo->varEnvironment($this->msg,$pos,$this->bf,$this->caster,$this->target,$this->range,$this->gi);

        $cardo->getUseCardo();
        //Defend Field
        $df = $this->target->defendField;
        if($df){
            $this->df->varEnvironment($this->msg,$pos,$this->bf,$this->target,$this->caster,$this->range,$this->gi); //caster and target change position
            $this->df->effect($cardo); //Defend Field Take Effect
        }

        $this->gi->result[] = $this->caster->cardo[$pos]->gain();
        unset($this->caster->cardo[$pos]);

        $this->bf->roundFinish($this->caster,$this->target,$this->msg,$this->gi);
        
        return 1;
    }
    protected function getActionPoint($id){
        $actionPoint = $this->bf->char[$id]->getActionPoint();
        $json = s2c::JSON("batt","get_action_point",array($id=>$actionPoint));
        $this->gi->result[] = S2c::outlet("selected",$this->range,$json);
        return 1;
    }

}

?>
