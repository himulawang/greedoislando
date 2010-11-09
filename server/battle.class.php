<?php

class battle extends prepare {
    protected $caster,$target;
    protected $actionPointJustFull = array();
    function __construct($id,$msg,$gi){
        stdProcess::__construct($id,$msg,$gi);

        $this->stdProcess["server_heartbeat"] = array();
        $this->stdProcess["server_heartbeat"][] = "addActionPoint";
        $this->stdProcess["server_heartbeat"][] = "dealCardo";

        $this->stdProcess["use_cardo"] = array();
        $this->stdProcess["use_cardo"][] = "varInitBattle";
        $this->stdProcess["use_cardo"][] = "varBattlefieldRange";
        $this->stdProcess["use_cardo"][] = "useActionPoint";
        $this->stdProcess["use_cardo"][] = "useCardo";

        $this->stdProcess["get_attackcardo"] = array();
        $this->stdProcess["get_attackcardo"][] = "sysGetAttackCardo";

        $this->stdProcess["get_defendcardo"] = array();
        $this->stdProcess["get_defendcardo"][] = "sysGetDefendCardo";

        $this->stdProcess["get_specialcardo"] = array();
        $this->stdProcess["get_specialcardo"][] = "sysGetSpecialCardo";

        $this->stdProcess["kick_char"] = array();
        $this->stdProcess["kick_char"][] = "stopBattlefield";
        $this->stdProcess["kick_char"][] = "varBattlefieldRange";
        $this->stdProcess["kick_char"][] = "getStopBattlefield";
        $this->stdProcess["kick_char"][] = "kickChar";
        $this->stdProcess["kick_char"][] = "destroyBattlefield";

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
    protected function addActionPoint(){ 
        foreach($this->gi->bf as $k => $v){ //bf
            $this->bf = $v;
            if($v->battleStart){
                prepare::varBattlefieldRange();
                foreach($this->range as $idx => $id){ //char
                    $this->actionPointJustFull[$id] = $this->bf->char[$id]->addActionPoint();
                    if($this->actionPointJustFull[$id]) self::getActionPoint($id);
                }
            }
        }
        return 1;
    }
    protected function dealCardo(){
        //DealCardo if has empty slot
        foreach($this->actionPointJustFull as $id=>$v){
            if( $v==1 /*need deal cardo*/&& $this->bf->dealCardo($id)) self::getDealCardo($id);
        }
        return 1;
    }
    protected function useActionPoint(){ //Use ActionPoint before action
        if( !$this->bf->battleStart ) return;
        if( !$this->bf->useActionPoint($this->id) ) return;
        self::getActionPoint($this->id);
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
            $df->varEnvironment($this->msg,$pos,$this->bf,$this->target,$this->caster,$this->range,$this->gi); //caster and target change position
            $df->effect($cardo); //Defend Field Take Effect
        }

        $this->caster->cardo[$pos]->gain();

        unset($this->caster->cardo[$pos]);

        $this->bf->roundFinish($this->caster);
        
        return 1;
    }
    protected function kickChar(){
        $this->bf->kickChar($this->id);
        return 1;
    }
    protected function getActionPoint($id){
        $actionPoint = $this->bf->char[$id]->getActionPoint();
        $a = array();
        $a[$id] = array();
        $a[$id]["id"] = $id;
        $a[$id]["action_point"] = $actionPoint;
        $json = s2c::JSON("batt","get_action_point",$a);
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
        return 1;
    }
    protected function sysGetAttackCardo(){
        $id = $this->id;
        if(!prepare::varBattlefield()) return; //check char in bf
        $this->bf->getAttackCardo($id);
        $this->bf->varAllCardo($id);
        self::getDealCardo($id);

        //Opp
        $id = $this->bf->getOpponentID($this->id);
        if(!prepare::varBattlefield()) return; //check char in bf
        $this->bf->getAttackCardo($id);
        $this->bf->varAllCardo($id);
        self::getDealCardo($id);
        return 1;
    }
    protected function sysGetDefendCardo(){
        $id = $this->id;
        if(!prepare::varBattlefield()) return; //check char in bf
        $this->bf->getDefendCardo($id);
        $this->bf->varAllCardo($id);
        self::getDealCardo($id);

        //Opp
        $id = $this->bf->getOpponentID($this->id);
        if(!prepare::varBattlefield()) return; //check char in bf
        $this->bf->getDefendCardo($id);
        $this->bf->varAllCardo($id);
        self::getDealCardo($id);        
        return 1;
    }
    protected function sysGetSpecialCardo(){
        $id = $this->id;
        if(!prepare::varBattlefield()) return; //check char in bf
        $this->bf->getSpecialCardo($id);
        $this->bf->varAllCardo($id);
        self::getDealCardo($id);
        
        //Opp
        $id = $this->bf->getOpponentID($this->id);
        if(!prepare::varBattlefield()) return; //check char in bf
        $this->bf->getSpecialCardo($id);
        $this->bf->varAllCardo($id);
        self::getDealCardo($id);        
        return 1;
    }

}

?>
