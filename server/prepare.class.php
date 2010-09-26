<?php
class prepare extends stdProcess{
    protected $bf; //Battlefield object
    protected $range; //Users in battlefield
    function __construct($id,$msg,$gi){
        parent::__construct($id,$msg,$gi);

        $this->stdProcess["create_bf"] = array();
        $this->stdProcess["create_bf"][] = "createBattlefield";
        $this->stdProcess["create_bf"][] = "getBattlefield";
        $this->stdProcess["create_bf"][] = "getBattlefieldRange";
        $this->stdProcess["create_bf"][] = "getEnterBattlefieldInfo";
        $this->stdProcess["create_bf"][] = "getBattlefieldList"; //TODO connection

        if(!parent::verify()) return;
        parent::run();
    }
    protected function getBattlefield(){
        foreach($this->gi->bf as $k => $v){
            if ($v->checkCharExists($this->id)){
                $this->bf = $v;
                return 1;
            }
        }
        return;
    }
    protected function getBattlefieldRange(){
        if(!$this->bf) return;

        $this->range = $this->bf->getUserID();
        return 1;
    }
    protected function createBattlefield(){
        if(self::getBattlefield()) return; //check user has in room
        
        $charName = $this->msg["data"]['char_name'];
        $bfName = $this->msg["data"]['bf_name'];
        $bf = new battlefield($this->id,$bfName,$charName);//Create battlefield
        $this->gi->bf[] = $bf;
        
        $no = max(array_keys($this->gi->bf));//Get Max Idx
        $this->gi->bf[$no]->setIdx($no);
        return 1;
    }
    public static function enterBattlefield($id,$msg,$gi){
        if(is_int(prepare::getBattlefieldIndex($id,$gi))) return; //Check Char Has Prepared
        $bf_no =@ $msg['bf_no'];
        if(!isset($gi->bf[$bf_no])) return; //Check Battlefield Vaild
        $bf = $gi->bf[$bf_no];
        if($bf->getFieldCharCount() == 2) return; //Check Battlefield Char Count
        if($bf->battleStart) return; //Check BattleStarted
        //Prepare
        $char_name = $msg["char_name"];
        $bf->enterBattlefield($id,$char_name);
        return 1;
    }
    public static function startBattlefield($id,$msg,$gi){
        $bf_no = prepare::getBattlefieldIndex($id,$gi);
        if(!is_int($bf_no)) return; //Char not in battlefield
        $bf = $gi->bf[$bf_no];
        if (!$bf->startBattle()) return; //Battle Not Start Succeed
        return 1;
    }
    protected function getEnterBattlefieldInfo(){
        $a = $this->bf->getEnterBattlefieldInfo($this->id);
        $json = s2c::JSON("pre","enter_bf",$a);
        $this->gi->result[] = s2c::outlet("selected",$this->range,$json);
        return 1;
    }
    protected function getStartBattlefieldInfo($id,$msg,$gi){
        $bf = prepare::getBattlefield($id,$gi);
        $a = $bf->getBattlefieldStartInfo();
        $json = s2c::JSON("pre","start_bf",$a);
        $range = $bf->getUserID();
        $gi->result[] = s2c::outlet("selected",$range,$json);
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
