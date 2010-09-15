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


}

?>
