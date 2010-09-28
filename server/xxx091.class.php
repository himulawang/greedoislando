<?php
class xxx091 extends special{
    protected $xxx = 91;
    protected $name = "stone";

    public function gain(){ //Half opponent's action point
        $actionPoint = $this->target->getActionPoint();
        $actionPoint = round($actionPoint / 2);

        $this->target->setActionPoint($actionPoint);

        self::getActionPoint();
    }
    protected function getActionPoint(){
        $id = $this->target->getID();
        $actionPoint = $this->bf->char[$id]->getActionPoint();
        $json = s2c::JSON("batt","get_action_point",array($id=>$actionPoint));
        $this->gi->result[] = S2c::outlet("selected",$this->range,$json);
        return 1;
    }
}
?>
