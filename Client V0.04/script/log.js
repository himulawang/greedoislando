var Log = function() {
    this.el = $("#ui-chat-history");
    this.status = { //TODO
        0 : "Dead"
        ,1 : "Free"
        ,2 : "Combat"
        ,3 : "Criminal"
    }
};
Log.prototype.log = function(info) {
    this.el.prepend('<div>' + info + '</div>');
};
Log.prototype.truncateCID = function(cID) {
    return '[' + cID.substr(0, 4) + ']';
};
Log.prototype.getSkillName = function(skillID) {
    return SKILL[skillID].name;
};
Log.prototype.getStatusName = function(statusID) {
    return this.status[statusID];
};
Log.prototype.castSkill = function(data) {
    var caster = this.truncateCID(data.cID);
    var target = this.truncateCID(data.target);
    var skillName = this.getSkillName(data.skillID);
    this.log(caster + ' castSkill ' + skillName + ' -> ' + target);
};
Log.prototype.hpChange = function(data) {
    var object = this.truncateCID(data.cID);
    this.log(object + ' HP: ' + data.preHP + '->' + data.nowHP + ' Delta:' + data.hpDelta);
};
Log.prototype.nvChange = function(data) {
    var object = this.truncateCID(data.cID);
    this.log(object + ' NV: ' + data.preNV + '->' + data.nowNV + ' Delta:' + data.nvDelta);
};
Log.prototype.statusChange = function(data) {
    var object = this.truncateCID(data.cID);
    var statusName = this.getStatusName(data.status);
    this.log(object + ' Status -> ' + statusName);
};
Log.prototype.commonCD = function(data) {
    var object = this.truncateCID(data.cID);
    this.log(object + ' is in CommonCD');
};
Log.prototype.debuff = function(data) {
    var caster = this.truncateCID(data.sourceCID);
    var target = this.truncateCID(data.cID);
    var skillName = this.getSkillName(data.skillID);
    if (data.isOn) {
        this.log(target + ' get Debuff ' + skillName + ' from ' + caster);
    } else {
        this.log(target + ' Debuff ' + skillName + ' Disappear from ' + caster);
    }
};
Log.prototype.buff = function(data) {
    var caster = this.truncateCID(data.sourceCID);
    var target = this.truncateCID(data.cID);
    var skillName = this.getSkillName(data.skillID);
    if (data.isOn) {
        this.log(target + ' get buff ' + skillName + ' from ' + caster);
    } else {
        this.log(target + ' buff ' + skillName + ' Disappear from ' + caster);
    }
};
Log.prototype.castSkillOutOfRange = function(data) {
    var caster = this.truncateCID(data.cID);
    var target = this.truncateCID(data.target);
    var skillName = this.getSkillName(data.skillID);
    this.log(caster + ' castSkill ' + skillName + ' -> ' + target + ' Out Of Range');
};
Log.prototype.skillCDing = function(data) {
    var caster = this.truncateCID(data.cID);
    this.log(caster + ' skill ' + data.skillID + ' is cooling down');
};
Log.prototype.skillMiss = function(data) {
    var caster = this.truncateCID(data.cID);
    var target = this.truncateCID(data.target);
    var skillName = this.getSkillName(data.skillID);
    this.log(caster + ' castSkill ' + skillName + ' -> ' + target + ' Miss');
};
Log.prototype.teleport = function(data) {
    var caster = this.truncateCID(data.cID);
    this.log(caster + ' teleport ' + data.nowLocation + ' to ' + data.endLocation);
};
