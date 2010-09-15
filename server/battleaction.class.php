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

    public static function dealCardo(&$char){ // Return 0 or Dealed Cardo Array
        //Check Cardo Full
        if( $char->getCardoCount() >= GI_BattleCardoCount){
            return 0;
        }
        $cardo = &$char->cardo;
        $feedback;
        for($i = 0; $i < GI_BattleCardoCount; ++$i){
            if( isset($cardo[$i]) ){
                continue;
            }else{
                $cardo[$i] = new cardo();
                $feedback[$i] = $cardo[$i]->getXXX();
            }
        }
        return $feedback;
    }

}

?>
