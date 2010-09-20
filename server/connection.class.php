<?php

class connection{
    public static function disconnect($id,$ws,$msg){
        //Delete User & Socket & Char
        socket_close($ws->user[$id]->socket);
        if (isset($ws->user[$id])) unset($ws->user[$id]);
        if (isset($ws->socket[$id])) unset($ws->socket[$id]);

        //Get battlefield Fight
        $bf_no = prepare::getBattlefieldIndex($id,$ws);
        if(is_int($bf_no)){
            //Stop fight
            $ws->battlefield[$bf_no]->stopBattle();
            //Kick Char from battlefield
            $needDestroyBattlefield = $ws->battlefield[$bf_no]->kickFieldChar($id);
            if ($needDestroyBattlefield) $ws->destroyBattlefield($bf_no);
        }
        console::write($id . " Disconnected");
        return;
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
        return s2c::outlet("all",$id,$json);
    }
    public static function getBattlefieldList($id,$data,$gi){
        $a = array();
        $a["battlefieldlist"] = array();
        foreach($gi->bf as $k=>$v){
            $a["battlefieldlist"][] = $v->getBattlefieldInfo();
        }
        $json = s2c::JSON("con","get_battlefieldlist",$a);
        return s2c::outlet("all",$id,$json);
    }
}

?>
