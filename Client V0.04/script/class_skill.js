var Skill = Class.extend({
    init : function(skillID) {
        this.skillID = skillID;
        this.name = SKILL[skillID].name;
        this.abbreviation = SKILL[skillID].abbreviation;
        this.skillCD = SKILL[skillID].skillCD;

        this.resetCD();
    }
    ,getSkillID : function() {
        return this.skillID;
    }
    ,cast : function() {
        var obj = {
            type : "castSkill"
            ,target : GI.targetCID
            ,skillID: this.skillID
        }
        wsocket.sendMessage(obj);
        this.preCastSkill = false;
    }
    ,setCD : function() {
        this.cd = fc.getNowTimestamp();
        GI.ui.skillbar.skill[this.skillID].setCD();
    }
    ,resetCD : function() {
        this.cd = null;
    }
    ,getCDProgress : function() { // return %
        if (!this.cd) return;
        var progress = (fc.getNowTimestamp() - this.cd) / this.skillCD;
        if (progress < 1) {
            return progress;
        }

        this.resetCD();
        GI.ui.skillbar.skill[this.skillID].resetCD();
    }
    ,keydown : function(keyboard, keyCode) {
    }
    ,keyup : function(keyboard, keyCode) {
        this.cast();
    }
});
