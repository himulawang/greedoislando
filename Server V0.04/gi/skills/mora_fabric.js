util.inherits(moraFabric, skill);

var moraFabric = function(chargeFactor) {
	this.sID = "10003";
	this.chargeFactor = chargeFactor;
	this.excuteSkill();
}
exports.create = function(chargeFactor) {
	return new moraFabric(chargeFactor);
}

moraFabric.prototype.excuteSkill = function() {
	this.excuteDamage(this.skillList[this.sID], this.chargeFactor);
	this.excuteSlow();
}
moraFabric.prototype.excuteSlow = function() {
	var _this = this;
	var skill = this.skillList[this.sID];
	var dID = this.getDebuffID(skill);
	
	this.target.speedFactor = 1 - skill.adtEffectVal;
	
	this.io.addOutputData(this.cID, 'debuff', 'logged', { cID : this.target.cID, sourceCID : this.cID, skillID : skill.skillID, last : skill.adtEffectTime ,effect : skill.adtEffect, stack : 1, isOn : 1 });
    this.io.response();
    
    this.doSlowTimeout = setTimeout(function(){
    	_this.target.speedFactor = 1;
    	_this.io.addOutputData(_this.cID, 'debuff', 'logged', { cID : _this.target.cID, sourceCID : _this.cID, skillID : skill.skillID, last : skill.adtEffectTime ,effect : skill.adtEffect, stack : 1, isOn : 0 });
        _this.io.response();
    	delete _this.target.debuffList[dID];
    }, skill.adtEffectTime);
}
