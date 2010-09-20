<?php

class packet{
    private $gi;
    private $id,$type,$cmd,$data; //in
    private $process; //processing
    private $done = array();
    private $result = array(); //process result

    public function __construct($id,$o,$gi){ //verify
        if( !(isset($o["type"])
            && isset($o["data"])
            && isset($o["data"]["cmd"])) ) return;
        $this->id = $id;
        $this->gi = $gi;
        $this->type = $o["type"];
        $this->cmd = $o["data"]["cmd"];
        $this->data = $o["data"];
    }
    public function setProcess($to){
        global $c2s,$s2c;
        $this->done = array();
        $this->result = array();
        if($to=="c2s"){
            if(isset($c2s[$this->type][$this->cmd])){
                $this->process = $c2s[$this->type][$this->cmd];
            }else{
                $this->process = array();
            }
        }else if($to=="s2c"){
            if(isset($s2c[$this->type][$this->cmd])){
                $this->process = $s2c[$this->type][$this->cmd];
            }else{
                $this->process = array();
            }
        }
    }
    public function process(){
        $funcs = $this->process;
        foreach($funcs as $k => $v){
            $done = call_user_func($v,$this->id,$this->data,$this->gi);
            if($done){
                $this->done[] = 1;
                $this->result[] = $done;
            }else{
                $this->done[] = 0;
                $this->result[] = $done;
                break;
            }
        }
    }
    public function getResult(){
        return $this->result;
    }
    public function verifyLastResult(){
        $c = 1;
        foreach($this->done as $k => $v){
            $c = $c && $v;
        }
        return $c;
    }
}

?>

