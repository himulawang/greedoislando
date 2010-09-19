<?php

class packet{
    private $world;
    private $id,$type,$cmd,$data; //in
    private $process; //processing
    private $result = array(); //process result

    public function __construct($id,&$world,$o){ //verify
        if( !(isset($o["type"])
            && isset($o["data"])
            && isset($o["data"]["cmd"])) ) return;
        $this->id = $id;
        $this->world = &$world;
        $this->type = $o["type"];
        $this->cmd = $o["data"]["cmd"];
        $this->data = $o["data"];
    }
    public function setProcess($to){
        global $c2s,$s2c;
        if($to=="c2s"){
            $this->process = $c2s[$this->type][$this->cmd];
        }else if($to=="s2c"){
            $this->process = $s2c[$this->type][$this->cmd];
        }
    }
    public function process(){
        $funcs = $this->process;
        foreach($funcs as $k => $v){
            $this->result[] = call_user_func($v,$this->id,$this->world,$this->data);
        }
    }
    public function getResult(){
        return $this->result;
    }
}

?>

