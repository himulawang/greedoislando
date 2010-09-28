<?php

class connection extends stdProcess{
    function __construct($id,$msg,$gi){
        parent::__construct($id,$msg,$gi);

        $this->stdProcess["set_username"] = array();
        $this->stdProcess["set_username"][] = "setUsername";
        $this->stdProcess["set_username"][] = "getUsername";
        $this->stdProcess["set_username"][] = "getUserList";
        $this->stdProcess["set_username"][] = "getBattlefieldList";

        $this->stdProcess["disconnect"] = array();
        $this->stdProcess["disconnect"][] = "disconnect";

        if(!parent::verify()) return;
        parent::run();
    }
    protected function disconnect(){
        $gi = &$this->gi;
        $id = &$this->id;
        
        socket_close($gi->user[$id]->socket);//Delete User & Socket & Char
        $username = $gi->user[$id]->username;
        if (isset($gi->user[$id])) unset($gi->user[$id]);
        if (isset($gi->socket[$id])) unset($gi->socket[$id]);

        $json = s2c::JSON("con","info_offline",array($id=>$username));
        $gi->result[] = s2c::outlet("all",$id,$json);

        $msg = array("type"=>"con","data"=>array("cmd"=>"kick_char"));
        $obj = new battle($id,$msg,$gi);

        return 1;
    }
    protected function setUsername(){
        $data = $this->msg["data"];
        if(!isset($data["username"]) && !$data["username"]){
            console::error("Invaild Username");
            return;
        }
        $this->gi->user[$this->id]->username = $data["username"];

        return 1;
    }
    protected function getUsername(){
        $a = array();
        $a["id"] = $this->id;
        $a["username"] = $this->gi->user[$this->id]->username;

        $json = s2c::JSON("con","get_id",$a);
        $this->gi->result[] = s2c::outlet("selected",$this->id,$json);
        return 1;
    }
    protected function getUserList(){
        $a = array();
        foreach($this->gi->user as $k=>$v){
            $a[$k] = $v->username;
        }
        $json = s2c::JSON("con","get_user_list",$a);
        $this->gi->result[] = s2c::outlet("all",$this->id,$json);
        return 1;
    }
    protected function getBattlefieldList(){
        $a = array();
        foreach($this->gi->bf as $k=>$v){
            $a[] = $v->getBattlefieldInfo();
        }
        $json = s2c::JSON("con","get_battlefieldlist",$a);
        $this->gi->result[] = s2c::outlet("all",$this->id,$json);
        return 1;
    }
}

?>
