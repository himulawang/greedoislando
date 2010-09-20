<?php


class battleaction {
    public static function useActionPoint($id,$msg,$gi){ //Minus ActionPoint before action
        if(!is_int(prepare::getBattlefieldIndex($id,$gi))) return;
        $bf = prepare::getBattlefield($id,$gi);
        return $bf->useActionPoint($id);
    }
    public static function getActionPoint($id,$msg,$gi){
        $bf = prepare::getBattlefield($id,$gi);
        $actionPoint = $bf->char[$id]->getActionPoint();
        $json = s2c::JSON("batt","set_action_point",array($id=>$actionPoint));
        $range = $bf->getUserID();
        return S2c::outlet("selected",$range,$json);
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
    public static function useCardo($id,$msg,$gi){
        $bf = prepare::getBattlefield($id,$gi);
        $caster = $bf->char[$id];
        $pos = $msg["pos"];
        $xxx = $caster->getCardoXXXByPos($pos);
        $type = $caster->getCardoTypeByPos($pos);
        if($xxx && $type){
            if($type==1){
                $target = $bf->getOpponentID($id);
                $hp = $bf->useAttackCardo($xxx,$id,$target,$pos);
                return 1;
            }
        }
        return;
    }
    public static function getSelfHP($id,$msg,$gi){
        $bf = prepare::getBattlefield($id,$gi);
        $hp = $bf->char[$id]->getHP();
        $json = s2c::JSON("batt","get_hp",array($id=>$hp));
        $range = $bf->getUserID();
        return s2c::outlet("selected",$range,$json);
    }
    public static function getOpponentHP($id,$msg,$gi){
        $bf = prepare::getBattlefield($id,$gi);
        $target = $bf->getOpponentID($id);
        $hp = $bf->char[$target]->getHP();
        $json = s2c::JSON("batt","get_hp",array($target=>$hp));
        $range = $bf->getUserID();
        return s2c::outlet("selected",$range,$json);
    }

}

?>
