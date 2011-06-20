<?php
class prepare extends stdProcess{
    protected $bf; //Battlefield object
    protected $range; //Users in battlefield
    function __construct($id,$msg,$gi){
        parent::__construct($id,$msg,$gi);

        $this->stdProcess["create_bf"] = array();
        $this->stdProcess["create_bf"][] = "createBattlefield";
        $this->stdProcess["create_bf"][] = "varBattlefield";
        $this->stdProcess["create_bf"][] = "varBattlefieldRange";
        $this->stdProcess["create_bf"][] = "getEnterBattlefield";
        $this->stdProcess["create_bf"][] = "getBattlefieldList";

        $this->stdProcess["enter_bf"] = array();
        $this->stdProcess["enter_bf"][] = "enterBattlefield";
        $this->stdProcess["enter_bf"][] = "varBattlefieldRange";
        $this->stdProcess["enter_bf"][] = "getEnterBattlefield";
        $this->stdProcess["enter_bf"][] = "getBattlefieldList";

        $this->stdProcess["start_bf"] = array();
        $this->stdProcess["start_bf"][] = "startBattlefield";
        $this->stdProcess["start_bf"][] = "varBattlefieldRange";
        $this->stdProcess["start_bf"][] = "dealInitCardo";
        $this->stdProcess["start_bf"][] = "getStartBattlefield";
        $this->stdProcess["start_bf"][] = "getDealInitCardo";
        $this->stdProcess["start_bf"][] = "getBattlefieldList";

        if(!parent::verify()) return;
        parent::run();
    }
    protected function varBattlefield(){
        foreach($this->gi->bf as $k => $v){
            if ($v->checkCharExists($this->id)){
                $this->bf = $v;
                return 1;
            }
        }
        return;
    }
    protected function varBattlefieldRange(){
        if(!$this->bf) return;

        $this->range = $this->bf->getUserID();
        return 1;
    }
    protected function createBattlefield(){
        if(self::varBattlefield()) return; //check user has in room
        
        $charName = $this->msg["data"]['char_name'];
        $bfName = $this->msg["data"]['bf_name'];
        $bf = new battlefield($this->id,$bfName,$charName);//Create battlefield
        $this->gi->bf[] = $bf;
        
        $no = max(array_keys($this->gi->bf));//Get Max No
        $this->gi->bf[$no]->setNo($no);
        return 1;
    }
    protected function enterBattlefield(){
        if(self::varBattlefield()) return; //check user has in room
        if( !( isset($this->msg["data"]["bf_no"]) && isset($this->msg["data"]["char_name"]) ) ) return; //verify post data
        $bf_no = $this->msg["data"]["bf_no"];
        $char_name = $this->msg["data"]["char_name"];

        if( !isset($this->gi->bf[$bf_no]) ) return; //Check Battlefield Vaild
        $this->bf = $this->gi->bf[$bf_no];

        if($this->bf->getFieldCharCount() == 2) return; //Check Battlefield Char Count
        if($this->bf->battleStart) return; //Check BattleStarted

        $this->bf->enterBattlefield($this->id,$char_name);
        return 1;
    }
    protected function startBattlefield(){
        if( !self::varBattlefield() ) return; //check user has in room
        if( !$this->bf->startBattle() ) return; //Battle Not Start Succeed
        return 1;
    }
    protected function stopBattlefield(){
        if( !self::varBattlefield() ) return; //check user has in room
        $this->bf->stopBattle();
        return 1;
    }
    protected function destroyBattlefield(){
        if($this->bf->getFieldCharCount()) return;
        unset($this->gi->bf[$this->bf->getNo()]);
        return 1;
    }
    protected function dealInitCardo(){
        foreach($this->range as $k => $v){
            $this->bf->dealCardo($v);
        }
        return 1;
    }
    protected function getEnterBattlefield(){
        $a = $this->bf->getEnterBattlefield($this->id);
        $json = s2c::JSON("pre","enter_bf",$a);
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
        return 1;
    }
    protected function getStartBattlefield(){
        $a = $this->bf->getBattlefieldStartInfo();
        $json = s2c::JSON("pre","start_bf",$a);
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
        return 1;
    }
    protected function getStopBattlefield(){
        $json = s2c::JSON("pre","stop_bf",array("no"=>$this->bf->getNo(),"bf_name"=>$this->bf->getName()));
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
        return 1;
    }
    protected function getDealInitCardo(){
        foreach( $this->range as $v){
            self::getDealCardo($v);
        }
        return 1;
    }
    protected function getDealCardo($id){
        $data = $this->bf->getDealCardo($id);
        $a = array();
        $a[$id] = array();
        $a[$id]["id"] = $id;
        $a[$id]["cardo"] = $data["player"];
        $json = s2c::JSON("batt","deal_cardo",$a);

        $other = $this->bf->getOpponentID($id);
        $b = array();
        $b[$id] = array();
        $b[$id]["id"] = $id;
        $b[$id]["cardo"] = $data["other"];
        $otherjson = s2c::JSON("batt","deal_cardo",$b);

        $this->gi->result[] = s2c::outlet("diff",$id,$json,$other,$otherjson);;
        return 1;
    }
    protected function getBattlefieldList(){
        $a = array();
        foreach($this->gi->bf as $k=>$v){
            $a[] = $v->getBattlefieldInfo();
        }
        $json = s2c::JSON("con","get_battlefieldlist",$a);
        $this->gi->result[] = s2c::outlet("all",$this->id,$json);
        return 1;
    }
}
?>
