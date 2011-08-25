var Skill_MoraStone = function(skillID) {
    Skill_MoraStone.super_.apply(this, arguments);
};

util.inherits(Skill_MoraStone, Skill);

Skill_MoraStone.prototype.keydown = function(keyboard, keyCode) {
    if (!keyboard.setKeyDownStamp(keyCode)) {
        var duration = keyboard.getKeyPressDuration(keyCode);
        var effectDuration = duration > 2000 ? 2000 : duration;
        var rate = effectDuration / 2000;
        GI.ui.chargebar.setProgress(rate);
        return true;
    }
    var obj = {
        type : "skillCharge"
        ,target : GI.targetCID
        ,skillID: 10001 // stone
        ,status : 1
    }
    wsocket.sendMessage(obj);
};
Skill_MoraStone.prototype.keyup = function(keyboard, keyCode) {
    GI.ui.chargebar.resetProgress();
    var obj = {
        type : "skillCharge"
        ,target : GI.targetCID
        ,skillID: 10001 // stone
        ,status : 0
    }
    wsocket.sendMessage(obj);
};
