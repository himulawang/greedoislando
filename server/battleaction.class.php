<?php


class battleaction {
    public static function useActionPoint($id,$msg,$gi){ //Use ActionPoint before action
        if(!is_int(prepare::getBattlefieldIndex($id,$gi))) return;
        $bf = prepare::getBattlefield($id,$gi);
        return $bf->useActionPoint($id);
    }
    public static function getAttackCardo($id,$msg,$gi){
        $bf = prepare::getBattlefield($id,$gi);
        return $bf->getAttackCardo($id);
    }
    public static function getDefendCardo($id,$msg,$gi){
        $bf = prepare::getBattlefield($id,$gi);
        return $bf->getDefendCardo($id);
    }
    public static function getSpecialCardo($id,$msg,$gi){
        $bf = prepare::getBattlefield($id,$gi);
        return $bf->getSpecialCardo($id);
    }
    public static function useCardo($id,$msg,$gi){
        $bf = prepare::getBattlefield($id,$gi);
        $caster = $bf->char[$id];
        $oppID = $bf->getOpponentID($id);
        $target = $bf->char[$oppID];
        $pos = $msg["pos"];
        
        if(!$caster->verifyExist($pos)) return;

        $cardo = $caster->cardo[$pos];
        $cardo->getUseCardo($caster->getID(),$bf->getUserID(),$cardo->getXXX(),$pos,$gi);
        //Defend Field
        $df = $target->defendField;
        if($df) $df->effect($caster,$target,$cardo,$gi); //Take Effect

        $gi->result[] = $caster->cardo[$pos]->gain($caster,$target,$msg,$gi);
        unset($caster->cardo[$pos]);

        $bf->roundFinish($caster,$target,$msg,$gi);
        
        return 1;
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
    public static function getDefendField($id,$msg,$gi){
        $bf = prepare::getBattlefield($id,$gi);
        $defendField = $bf->char[$id]->getDefendField();
        $xxx = $defendField ? $defendField->getXXX() : 0;
        $json = s2c::JSON("batt","get_defendfield",array($id=>$xxx));
        $range = $bf->getUserID();
        return s2c::outlet("selected",$range,$json);
    }
    public static function getSpeedUp($id,$msg,$gi){
        $bf = prepare::getBattlefield($id,$gi);
        $speedup = $bf->char[$id]->getSpeedup();
        $json = s2c::JSON("batt","get_speedup",array($id=>$speedup));
        $range = $bf->getUserID();
        $gi->result[] = s2c::outlet("selected",$range,$json);
        return 1;
    }
}

?>
