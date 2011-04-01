<?php

class core {
    public static function random($array){ //Random Core
        $sum = 0; $all = array_sum($array);
        $seed = mt_rand(1,$all);
        foreach($array as $k => $v){
            $sum += $v;
            if($seed <=$sum) return $k;
        }
    }
    public static function gain($xxx=null){ //Gain a new cardo
        global $CARDOPROBABILITY;

        if(!$xxx) $xxx = core::random($CARDOPROBABILITY);

        $len = strlen($xxx);
        if($len==1){
            $class = "xxx00".$xxx;
        }else if($len==2){
            $class = "xxx0".$xxx;
        }else if($len==3){
            $class = "xxx".$xxx;
        }else{
            return;
        }

        return new $class;
    }


}

?>
