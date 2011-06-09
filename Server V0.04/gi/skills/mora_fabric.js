var moraFabric = function(character) {
	this.initSkill(character);
}
moraFabric.prototype.initSkill = function(character) {
	this.sID = "10003";	
	this.init(character);
}
moraFabric.prototype.castSkill = function(target) {
	this.target = target;
	if(this.castProc() === 0) return;
	this.doDamage();
	this.doSlow();
}
moraFabric.prototype.doSlow = function() {
	var _this = this;
	this.pushDebuffList();
	this.dID = this.getDebuffID();
	
	this.target.speedFactor = 1 - this.skill.adtEffectVal;
	
	this.io.addOutputData(this.cID, 'debuff', 'logged', { cID : this.target.getCID(), sourceCID : this.cID, skillID : this.skill.skillID, last : this.skill.adtEffectTime ,effect : this.skill.adtEffect, stack : 1, isOn : 1 });
    this.io.response();
    
    this.doSlowTimeout = setTimeout(function(){
    	_this.target.speedFactor = 1;
    	_this.io.addOutputData(_this.cID, 'debuff', 'logged', { cID : _this.target.cID, sourceCID : _this.cID, skillID : this.skill.skillID, last : this.skill.adtEffectTime ,effect : this.skill.adtEffect, stack : 1, isOn : 0 });
        _this.io.response();
    	delete _this.target.debuffList[_this.dID];
    }, skill.adtEffectTime);
}

util.inherits(moraFabric, Skill);
global.Skill_MoraFabric = moraFabric;
