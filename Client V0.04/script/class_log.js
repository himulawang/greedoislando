var Log = Class.extend({
    init : function() {
        this.el = $("#ui-chat-history");
        this.status = {
            0 : "Dead"
            ,1 : "Free"
            ,2 : "Combat"
            ,3 : "Criminal"
        }
    }
    ,log : function(info) {
        this.el.prepend('<div>' + info + '</div>');
    }
    ,truncateCID : function(cID) {
        return '[' + cID.substr(0, 4) + ']';
    }
    ,getSkillName : function(skillID) {
        return SKILL[skillID].name;
    }
    ,getStatusName : function(statusID) {
        return this.status[statusID];
    }
    ,castSkill : function(data) {
        var caster = this.truncateCID(data.cID);
        var target = this.truncateCID(data.target);
        var skillName = this.getSkillName(data.skillID);
        this.log(caster + ' castSkill ' + skillName + ' -> ' + target);
    }
    ,hpChange : function(data) {
        var object = this.truncateCID(data.cID);
        this.log(object + ' HP: ' + data.preHP + '->' + data.nowHP + ' Delta:' + data.hpDelta);
    }
    ,nvChange : function(data) {
        var object = this.truncateCID(data.cID);
        this.log(object + ' NV: ' + data.preNV + '->' + data.nowNV + ' Delta:' + data.nvDelta);
    }
    ,statusChange : function(data) {
        var object = this.truncateCID(data.cID);
        var statusName = this.getStatusName(data.status);
        this.log(object + ' Status -> ' + statusName);
    }
    ,commonCD : function(data) {
        var object = this.truncateCID(data.cID);
        this.log(object + ' is in CommonCD');
    }
    ,debuff : function(data) {
        var caster = this.truncateCID(data.sourceCID);
        var target = this.truncateCID(data.cID);
        var skillName = this.getSkillName(data.skillID);
        if (data.isOn) {
            this.log(target + ' get Debuff ' + skillName + ' from ' + caster);
        } else {
            this.log(target + ' Debuff ' + skillName + ' Disappear from ' + caster);
        }
    }
    ,castSkillOutOfRange : function(data) {
        var caster = this.truncateCID(data.cID);
        var target = this.truncateCID(data.target);
        var skillName = this.getSkillName(data.skillID);
        this.log(caster + ' castSkill ' + skillName + ' -> ' + target + ' Out Of Range');
    }
    ,skillCDing : function(data) {
        var caster = this.truncateCID(data.cID);
        this.log(caster + ' skill ' + data.skillID + ' is cooling down');
    }
    ,skillMiss : function(data) {
        var caster = this.truncateCID(data.cID);
        var target = this.truncateCID(data.target);
        var skillName = this.getSkillName(data.skillID);
        this.log(caster + ' castSkill ' + skillName + ' -> ' + target + ' Miss');
    }
});
