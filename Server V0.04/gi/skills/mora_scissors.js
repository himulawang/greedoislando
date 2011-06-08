util.inherits(moraScissors, skill);

var moraScissors = function(chargeFactor) {
	this.sID = "10002";
	this.chargeFactor = chargeFactor;
	this.excuteSkill();
}
exports.create = function(chargeFactor) {
	return new moraScissors(chargeFactor);
}

moraScissors.prototype.excuteSkill = function() {
	this.excuteDamage(this.skillList[this.sID], this.chargeFactor);
	this.excuteBleed();
}
moraScissors.prototype.excuteBleed = function() {
	var skill = this.skillList[this.sID];
	var dID = this.getDebuffID(skill);
	
	if (this.target.debuffList[dID].stack < 5) {
		++this.debuffList[dID].stack;
	}
	
	this.doTimes = skill.adtEffectTime / this.dotTimer;
	
	this.io.addOutputData(this.cID, 'debuff', 'logged', { cID : this.target.cID, sourceCID : this.cID, skillID : skill.skillID, last : skill.adtEffectTime ,effect : skill.adtEffect, stack : this.target.debuffList[dID].stack , isOn : 1 });
	
	this.dotCounts = 0;
	if (this.target.debuffList[dID].stack > 1) return;
	
	this.excuteBleedLoop();
}
moraScissors.prototype.excuteBleedLoop = function() {
	var _this = this;
	var skill = this.skillList[this.sID];
	var dID = this.getDebuffID(skill);
	
	this.doBleedTimeout = setTimeout(function(){
		_this.excuteBleedDamage();
		++_this.dotCounts;
		if (_this.dotCounts === _this.doTimes) {
			_this.io.addOutputData(_this.cID, 'debuff', 'logged', { cID : _this.target.cID, sourceCID : _this.cID, skillID : skill.skillID, last : skill.adtEffectTime ,effect : skill.adtEffect, stack : _this.tareget.debuffList[dID].stack , isOn : 0 });
			_this.io.response();
			_this.dotCounts = 0;
			delete _this.target.debuffList[dID];
			return;
		}
		_this.excuteBleedLoop();
	});
}
moraScissors.prototype.excuteBleedDamage = function() {
	var skill = this.skillList[this.sID];
	var dID = this.getDebuffID(skill);
	
	var dotDamage = skill.adtEffectVal * this.target.debuffList[dID].stack;
	dotDamage = fc.fix(dotDamage);
	var preHP = this.target.getHP();
	this.target.hp = (dotDamage < this.target.hp) ? this.target.hp - dotDamage : 0;
	if (this.target.hp === 0) {
		this.target.setStatus(0);
	}
	this.io.addOutputData(this.cID, 'hpChange', 'logged', {cID : this.target.cID, preHP : preHP, nowHP : this.target.hp, hpDelta : this.target.hp - preHP});
	this.io.response();
}


