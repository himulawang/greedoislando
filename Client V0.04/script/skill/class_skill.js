var Skill = Class.extend({
    init : function(skillID) {
        this.skillID = skillID;
        this.name = SKILL[skillID].name;
        this.abbreviation = SKILL[skillID].abbreviation;
        this.skillCD = SKILL[skillID].skillCD;

        this.resetCD();
    }
    ,make : function(owner) {
        this.owner = owner;
    }
    ,getSkillID : function() {
        return this.skillID;
    }
    ,launch : function() {
        var obj = {
            type : "castSkill"
            ,target : GI.targetCID
            ,skillID: this.skillID
        }
        wsocket.sendMessage(obj);
        this.preCastSkill = false;
    }
    ,cast : function(data) {
        this.owner.animation.switch('attack');
        this.setCD();
    }
    ,setCD : function() {
        this.cd = fc.getNowTimestamp();
        if (!this.owner.self) return;
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
        this.launch();
    }
});
