<?php

class stdProcess{
    protected $stdProcess = array(); //standard process functions

    protected $id; //client id
    protected $msg; //client post data
    protected $gi; //client gi class
    protected $cmd; //client post cmd
    protected $process = array(); //run process functions
    protected $done = array(); //function execute succeed
    protected $result = array(); //information send to client

    function __construct($id,$msg,$gi){
        $this->id = $id;
        $this->msg = $msg;
        $this->gi = $gi;
    }
    protected function run(){
        $funcs = $this->process;
        foreach($funcs as $k => $v){

            $done = $this->$v();
            $this->result[] = $done;

            if($done){
                $this->done[] = 1;
            }else{
                $this->done[] = 0;
                break;
            }
        }
    }
    protected function verify(){ //verify post data and pass to Array process
        $msg = $this->msg;
        if ( !( isset($msg["data"]) && isset($msg["data"]["cmd"]) ) ) return;

        $cmd = $msg["data"]["cmd"];
        if ( !isset($this->stdProcess[$cmd]) ) return;
        $this->process = $this->stdProcess[$cmd];
        return 1;
    }
}

?>
