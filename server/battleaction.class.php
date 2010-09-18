<?php


class battleaction {
    public static function useActionPoint($id,$ws,$msg){ //Minus ActionPoint before action
        $bf_no = prepare::getBattlefieldIndex($id,$ws);
        $battlefield = &$ws->battlefield[$bf_no];
        $actionPoint = $battlefield->useActionPoint($id);
        if(is_array($actionPoint)){
            $selected = $battlefield->getUserID();
            $json = s2c::JSON("batt","set_action_point",$actionPoint);
            $ws->sendSelected($selected,$json);
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
