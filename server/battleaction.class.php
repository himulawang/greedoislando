<?php


class battleaction {
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
