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
    public static function initDealCardo($id,$msg,$gi){
        $bf_no = prepare::getBattlefieldIndex($id,$gi);
        $bf = $gi->bf[$bf_no];
        $selected = $bf->getUserID();
        $done = 1;
        foreach($selected as $k => $v){
            $_done = $bf->dealCardo($v);
            $done = $done && $_done;
        }
        return $done;
    }
    public static function getInitDealCardoInfo($id,$msg,$gi){
        $bf = prepare::getBattlefield($id,$gi);
        $selected = $bf->getUserID();
        foreach($selected as $k => $v){
            $result = $bf->getDealCardoInfo($v);
            $json = s2c::JSON("batt","deal_cardo",$result["player"]);
            $other = $bf->getOpponentID($v);
            $otherjson = s2c::JSON("batt","deal_cardo",$result["other"]);
            $outlet = s2c::outlet("diff",$v,$json,$other,$otherjson);
            $gi->result[] = $outlet;
        }
    }
    public static function getDealCardoInfo($id,$msg,$gi){
        $bf = prepare::getBattlefield($id,$gi);
        $selected = $bf->getUserID();
        $result = $bf->getDealCardoInfo($id);
        $json = s2c::JSON("batt","deal_cardo",$result["player"]);
        $other = $bf->getOpponentID($id);
        $otherjson = s2c::JSON("batt","deal_cardo",$result["other"]);
        $outlet = s2c::outlet("diff",$id,$json,$other,$otherjson);
        $gi->result[] = $outlet;
    }
    public static function dealCardo($id,$ws,$para){ // Return null or Dealed Cardo Array
        $bf_no = prepare::getBattlefieldIndex($id,$ws);
        if(!is_int($bf_no)) return;
        $ws->battlefield[$bf_no];
        //Check Cardo Full
    }
    public static function getAttackCardo($id,$msg,$gi){
        $bf = prepare::getBattlefield($id,$gi);
        return $bf->getAttackCardo($id);
    }
    public static function useCardo($id,$ws,$msg){
        $bf_no = prepare::getBattlefieldIndex($id,$ws);
        $battlefield = &$ws->battlefield[$bf_no];
        $castChar = &$battlefield->char[$id];
        $pos = $msg["data"]["pos"];
        $xxx = $castChar->getCardoXXXByPos($pos);
        $type = $castChar->getCardoTypeByPos($pos);
        if($xxx && $type){
            if($type==1){
                $oppID = $battlefield->getOpponentID($id);
                $hp = $battlefield->useAttackCardo($xxx,$id,$oppID);
                $selected = $battlefield->getUserID();
                $json = s2c::JSON("batt","set_hp",array($oppID=>$hp));
                $ws->sendSelected($selected,$json);
            }
        }
        
    }

}

?>
