<?php

class battleaction {
    //check
    public static function checkActionPointFull($char){ //Check ActionPoint is full
        return $char->actionPoint >= 10 ? 1 : 0;
    }

    //add
    public static function addActionPoint(&$char,$multi){ //Add ActionPoint every second
        //check ActionPointFull
        if(battleaction::checkActionPointFull($char)){ return; }

        for($i = 0; $i < $multi; ++$i){
            $char->actionPoint += $char->speed + $char->speedup;
            if(battleaction::checkActionPointFull($char)){ return; }
        }
    }

    //minus
    public static function minusActionPoint(&$char){ //Minus ActionPoint before action
        //check ActionPointFull
        if(battleaction::checkActionPointFull($char)){
            $char->actionPoint -= 10;
            return 1; //succes
        }else{
            return 0; //fail
        }
    }

}

?>
