<?php


class battleaction {
    public static function minusActionPoint(&$char){ //Minus ActionPoint before action
        //check ActionPointFull
        if(battleaction::checkActionPointFull($char)){
            $char->actionPoint -= 10;
            return 1; //succes
        }else{
            return 0; //fail
        }
    }
    public static function initDealCardo($id,$ws,$msg){
        $bf_no = prepare::getBattlefieldIndex($id,$ws);
        $battlefield = &$ws->battlefield[$bf_no];
        $selected = $battlefield->getUserID();
        foreach($selected as $k => $v){
            $feedback = $battlefield->dealCardo($v);
            if($feedback){
                $specMsg = $feedback["spec"];
                $specMsg = s2c::JSON("batt","deal_cardo",$specMsg);
                $otherMsg = $feedback["other"];
                $otherMsg = s2c::JSON("batt","deal_cardo",$otherMsg);
                $other = array_diff($selected,array($v));
                $ws->sendDifferent($v,$specMsg,$other,$otherMsg);
            }
        }
    }
    public static function dealCardo($id,$ws,$para){ // Return null or Dealed Cardo Array
        $bf_no = prepare::getBattlefieldIndex($id,$ws);
        if(!is_int($bf_no)) return;
        $ws->battlefield[$bf_no];
        //Check Cardo Full
    }

}

?>
