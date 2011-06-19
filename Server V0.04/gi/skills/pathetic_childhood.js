var patheticChildhood = function() {}

util.inherits(patheticChildhood, Skill);

patheticChildhood.prototype.initSkill = function(character) {
    this.sID = "10102";
    this.init(character);
}
patheticChildhood.prototype.castSkill = function(target) {
    this.target = target;
    if (!this.castTargetCheck()) return;
    if (!this.castProc()) return;
    this.doDamage();
    this.doParalysis();
}
patheticChildhood.prototype.doParalysis = function() {
    var _this = this;
    this.pushDebuffList(this.target);
    this.dID = this.getDebuffID(this.target);
    this.target.setDoAction(4);

    io.addOutputData(this.cID, 'debuff', 'logged', { cID : this.target.cID, sourceCID : this.cID, skillID : this.skill.skillID, last : this.skill.adtEffectTime ,effect : this.skill.adtEffect, stack : this.target.debuffList[this.dID].stack , isOn : 1 });
	io.response();

    if (this.self.doParalysisTimeout[this.dID]) clearTimeout(this.self.doParalysisTimeout[this.dID]);

    this.self.doParalysisTimeout[this.dID] = setTimeout(function() {        
        io.addOutputData(_this.cID, 'debuff', 'logged', { cID : _this.target.cID, sourceCID : _this.cID, skillID : _this.skill.skillID, last : _this.skill.adtEffectTime ,effect : _this.skill.adtEffect, stack : _this.target.debuffList[_this.dID].stack , isOn : 0 });
	    io.response();
        delete _this.target.debuffList[_this.dID];
        _this.target.setDoAction(0);
    }, this.skill.adtEffectTime);
}

global.Skill_PatheticChildhood = patheticChildhood;
