var patheticChildhood = function(character) {
    this.initSkill(character);
}

patheticChildhood.prototype.initSkill = function(character) {
    this.sID = "10102";
    this.init(character);
}
patheticChildhood.prototype.castSkill = function(target) {
    this.target = target;
    if (this.castProc === 0) return;
    this.doDamage();
    this.doParalysis();
}
patheticChildhood.prototype.doParalysis = function() {
    var _this = this;
    this.pushDebuffList();
    this.dID = this.getDebuffID();
    this.target.setDoAction(4);

    this.doParalysisTimeout = setTimeout(function() {
        delete _this.target.debuffList[_this.dID];
        _this.target.setDoAction(0);
    }, this.skill.adtEffectTime);
}

util.inherits(patheticChildhood, Skill);
global.Skill_PatheticChildhood = patheticChildhood;
