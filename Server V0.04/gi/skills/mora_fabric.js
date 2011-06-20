var moraFabric = function() {}

util.inherits(moraFabric, Skill);

moraFabric.prototype.initSkill = function(character) {
	this.sID = "10003";	
    this.init(character);
}
moraFabric.prototype.castSkill = function(target) {
	this.target = target;
    if (!this.castTargetCheck()) return;
	if (!this.castProc()) return;
	this.doDamage();
	this.doSlow();
}
moraFabric.prototype.doSlow = function() {
	var _this = this;
	this.pushDebuffList();
	this.dID = this.getDebuffID();
	
	this.target.speedFactor = 1 - this.skill.adtEffectVal;
	
	io.addOutputData(this.cID, 'debuff', 'logged', { cID : this.target.cID, sourceCID : this.cID, skillID : this.skill.skillID, last : this.skill.adtEffectTime ,effect : this.skill.adtEffect, stack : 1, isOn : 1 });
    io.response();
    
    if (this.self.doSlowTimeout[this.dID]) clearTimeout(this.self.doSlowTimeout[this.dID]);

    this.self.doSlowTimeout[this.dID] = setTimeout(function(){
    	_this.target.speedFactor = 1;
    	delete _this.target.debuffList[_this.dID];
    	io.addOutputData(_this.cID, 'debuff', 'logged', { cID : _this.target.cID, sourceCID : _this.cID, skillID : _this.skill.skillID, last : _this.skill.adtEffectTime ,effect : _this.skill.adtEffect, stack : 1, isOn : 0 });
        io.response();
    }, this.skill.adtEffectTime);
}

global.Skill_MoraFabric = moraFabric;
