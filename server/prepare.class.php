<?php
class prepare {
    public static function getBattlefieldIndex($id,$ws){
        foreach($ws->battlefield as $k => $v){
            if ($v->checkCharExists($id)){
                $fieldname = $v->getFieldName();
                console::write("This char has in battlefield {$fieldname}");
                return $k;
            }
        }
        return false;
    }
    public static function createBattlefield($id,$ws,$msg){
        if(is_int(prepare::getBattlefieldIndex($id,$ws))) return; //Check Char Has Prepared
        //Create battlefield
        $charName = $msg["data"]['char_name'];
        $bfName = $msg["data"]['bf_name'];
        $battlefield = new battlefield($id,$bfName,$charName);
        $ws->battlefield[] = $battlefield;
        //Get Max Idx
        $no = max(array_keys($ws->battlefield));
        $ws->battlefield[$no]->setIdx($no);
        //battlefield infomation
        $a = $battlefield->getBattlefieldInfo();
        $json = s2c::JSON("pre","enter_bf",$a);
        return s2c::outlet("single",$id,"one",$json);
    }
    public static function enterBattlefield($id,$ws,$msg){
        if(is_int(prepare::getBattlefieldIndex($id,$ws))) return; //Check Char Has Prepared
        //Check Battlefield Vaild
        $bf_no =@ $msg["data"]['bf_no'];
        if(!isset($ws->battlefield[$bf_no])){
            console::write("Invaild bf_no");
            return;
        }
        $battlefield = &$ws->battlefield[$bf_no];
        //Check Battlefield Char Count
        if($battlefield->getFieldCharCount() == 2){
            console::write("{$battlefield->getFieldName()} has full.");
            return; 
        }
        //Check BattleStarted
        if($battlefield->checkBattleStatus()){
            console::write("Battle has started in this bf");
            return;
        };
        //Prepare
        $char_name = $msg["data"]["char_name"];
        $battlefield->enterBattlefield($id,$char_name);
        //battlefield infomation
        $a = $battlefield->getBattlefieldInfo();
        $json = s2c::JSON("pre","enter_bf",$a);
        $range = $battlefield->getUserID();
        return s2c::outlet("selected_battlefield",$id,$range,$json);
    }
    public static function startBattlefield($id,$ws,$msg){
        $bf_no = prepare::getBattlefieldIndex($id,$ws);
        if(!is_int($bf_no)) return; //Char not in battlefield
        $battlefield = &$ws->battlefield[$bf_no];
        if ($battlefield->startBattle()){
            $selected = $battlefield->getUserID();
            $a = $battlefield->getBattlefieldStartInfo();
            $json = s2c::JSON("pre","start_bf",$a);
            $range = $battlefield->getUserID();
            return s2c::outlet("selected_battlefield",$id,$range,$json);
        }
    }
}
?>
