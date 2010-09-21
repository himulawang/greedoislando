<?php

class connection{
    public static function disconnect($id,$msg,$gi){
        //Delete User & Socket & Char
        socket_close($gi->user[$id]->socket);
        $username = $gi->user[$id]->username;
        if (isset($gi->user[$id])) unset($gi->user[$id]);
        if (isset($gi->socket[$id])) unset($gi->socket[$id]);

        $json = s2c::JSON("con","info_offline",array($id=>$username));
        $gi->result[] = s2c::outlet("all",$id,$json);

        $bf_no = prepare::getBattlefieldIndex($id,$gi);//Get battlefield Fight
        if(!is_int($bf_no)) return 1;
        $bf = prepare::getBattlefield($id,$gi);//Stop fight
        $bf->stopBattle();

        $bf_name = $bf->getFieldName();
        $range = $bf->getUserID();
        $json = s2c::JSON("pre","stop_battle",array("no"=>$bf_no,"bf_name"=>$bf_name));
        $gi->result[] = s2c::outlet("selected",$range,$json);
        //Kick Char from battlefield
        $needDestroyBf = $bf->kickFieldChar($id);
        if ($needDestroyBf) $gi->destroyBattlefield($bf_no);
        return 1;
    }
    public static function setUsername($id,$data,$gi){
        if(!isset($data["username"]) && !$data["username"]){
            console::error("Invaild Username");
            return;
        }
        $gi->user[$id]->username = $data["username"];

        return 1;
    }
    public static function getUsername($id,$data,$gi){
        $a = array();
        $a["id"] = $id;
        $a["username"] = $gi->user[$id]->username;

        $json = s2c::JSON("con","get_id",$a);
        return s2c::outlet("single",$id,$json);
    }
    public static function getUserList($id,$data,$gi){
        $a = array();
        $a["userlist"] = array();
        foreach($gi->user as $k=>$v){
            $a["userlist"][] = array("id" => $v->id, "username" => $v->username);
        }
        $json = s2c::JSON("con","get_user_list",$a);
        $gi->result[] = s2c::outlet("all",$id,$json);
    }
    public static function getBattlefieldList($id,$data,$gi){
        $a = array();
        $a["battlefieldlist"] = array();
        foreach($gi->bf as $k=>$v){
            $a["battlefieldlist"][] = $v->getBattlefieldInfo();
        }
        $json = s2c::JSON("con","get_battlefieldlist",$a);
        $gi->result[] = s2c::outlet("all",$id,$json);
    }
}

?>
