<?php
class prepare {
    public static function getBattlefieldIndex($id,$gi){
        foreach($gi->bf as $k => $v){
            if ($v->checkCharExists($id)){
                $fieldname = $v->getFieldName();
                return $k;
            }
        }
        return false;
    }
    public static function getBattlefield($id,$gi){
        $bf_no = prepare::getBattlefieldIndex($id,$gi);
        return $gi->bf[$bf_no];
    }
    public static function createBattlefield($id,$msg,$gi){
        if(is_int(prepare::getBattlefieldIndex($id,$gi))) return; //Check Char Has Prepared
        //Create battlefield
        $charName = $msg['char_name'];
        $bfName = $msg['bf_name'];
        $bf = new battlefield($id,$bfName,$charName);
        $gi->bf[] = $bf;
        //Get Max Idx
        $no = max(array_keys($gi->bf));
        $gi->bf[$no]->setIdx($no);
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
    public static function getEnterBattlefieldInfo($id,$msg,$gi){
        $bf = prepare::getBattlefield($id,$gi);
        $a = $bf->getEnterBattlefieldInfo($id);
        $json = s2c::JSON("pre","enter_bf",$a);
        $range = $bf->getUserID();
        return s2c::outlet("selected",$range,$json);
    }
    public static function startBattlefield($id,$msg,$gi){
        $bf_no = prepare::getBattlefieldIndex($id,$gi);
        if(!is_int($bf_no)) return; //Char not in battlefield
        $bf = $gi->bf[$bf_no];
        if (!$bf->startBattle()) return; //Battle Not Start Succeed
        return 1;
    }
    public static function getStartBattlefieldInfo($id,$msg,$gi){
        $bf = prepare::getBattlefield($id,$gi);
        $a = $bf->getBattlefieldStartInfo();
        $json = s2c::JSON("pre","start_bf",$a);
        $range = $bf->getUserID();
        $gi->result[] = s2c::outlet("selected",$range,$json);
        return 1;
    }
}
?>
