<?php

class battleaction {
    //check
    public static function checkActionPointFull($char){ //Check ActionPoint is full
    }

    //add
    public static function addActionPoint(&$char,$multi){ //Add ActionPoint every second
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
