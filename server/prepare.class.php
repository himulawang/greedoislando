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
        if(is_int(prepare::getBattlefieldIndex($id))) return; //Check Char Has Prepared
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
}
?>
