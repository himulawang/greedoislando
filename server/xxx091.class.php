<?php
class xxx091 extends special{
    protected $xxx = 91;
    protected $name = "stone";

    public function gain($caster,$target,$msg,$gi){ //Half opponent's action point
        $actionPoint = $target->getActionPoint();
        $actionPoint = round($actionPoint / 2);

        $target->setActionPoint($actionPoint);

        $oppID = $target->getID();
        battleaction::getActionPoint($oppID,null,$gi);
    }
}
?>
