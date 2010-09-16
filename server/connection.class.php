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
    public static function setUsername($id,$ws,$msg){
        if(!isset($msg["data"]["username"]) && !$msg["data"]["username"]){
            console::error("Invaild Username");
            return;
        }
        $ws->user[$id]->name = $msg["data"]["username"];

        $a = array();
        $a["id"] = $id;
        $a["username"] = $msg["data"]["username"];

        $json = s2c::JSON("con","get_id",$a);
        return s2c::outlet("single",$id,"one",$json);
    }
    public static function setUserList($id,$ws,$msg){
        $a = array();
        $a["userlist"] = array();
        foreach($ws->user as $k=>$v){
            $a["userlist"][] = array("id" => $v->id, "username" => $v->name);
        }
        $json = s2c::JSON("con","set_user_list",$a);
        return s2c::outlet("all",$id,"all",$json);
    }
    public static function setBattlefieldList($id,$ws,$msg){
        $a = array();
        $a["battlefieldlist"] = array();
        foreach($ws->battlefield as $k=>$v){
            $a["battlefieldlist"][] = $v->getBattlefieldInfo();
        }
        $json = s2c::JSON("con","set_battlefieldlist",$a);
        return s2c::outlet("all",$id,"all",$json);
    }
}

?>
