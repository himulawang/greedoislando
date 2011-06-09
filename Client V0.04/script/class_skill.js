var Skill = Class.extend({
    init : function(skill) {
        var skillID = skill.skillID;
        this.skillID = skillID;
        this.name = SKILL[skillID].name;
        this.abbreviation = SKILL[skillID].abbreviation;
        this.skillCD = SKILL[skillID].skillCD;
    }
    ,cast : function() {
        var obj = {
            type : "castSkill"
            ,target : GI.targetCID
            ,skillID: this.skillID
        }
        wsocket.sendMessage(obj);
    }
});
