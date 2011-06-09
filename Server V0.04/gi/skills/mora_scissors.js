var moraScissors = function(character) {
	this.initSkill(character);
}
moraScissors.prototype.initSkill = function(character) {
	this.sID = "10002";	
	this.init(character);
}
moraScissors.prototype.castSkill = function(target) {
	this.target = target;
	if(this.castProc() === 0) return;
	this.doDamage();
	this.doBleed();
}
moraScissors.prototype.doBleed = function() {
	this.pushDebuffList();
	this.dID = this.getDebuffID();
	if (this.target.debuffList[this.dID].stack < 5) {
		++this.debuffList[this.dID].stack;
	}	
	this.doTimes = this.skill.adtEffectTime / this.dotTimer;	
	this.io.addOutputData(this.cID, 'debuff', 'logged', { cID : this.target.cID, sourceCID : this.cID, skillID : this.skill.skillID, last : this.skill.adtEffectTime ,effect : this.skill.adtEffect, stack : this.target.debuffList[this.dID].stack , isOn : 1 });
	this.io.response();
	this.dotCounts = 0;
	if (this.target.debuffList[this.dID].stack > 1) return;	
	this.doBleedLoop();
}
moraScissors.prototype.doBleedLoop = function() {
	var _this = this;
	this.doBleedTimeout = setTimeout(function(){
		_this.doBleedDamage();
		++_this.dotCounts;
		if (_this.dotCounts === _this.doTimes) {
			_this.io.addOutputData(_this.cID, 'debuff', 'logged', { cID : _this.target.cID, sourceCID : _this.cID, skillID : _this.skill.skillID, last : _this.skill.adtEffectTime ,effect : _this.skill.adtEffect, stack : _this.tareget.debuffList[_this.dID].stack , isOn : 0 });
			_this.io.response();
			_this.dotCounts = 0;
			delete _this.target.debuffList[_this.dID];
			return;
		}
		_this.doBleedLoop();
	});
}
moraScissors.prototype.doBleedDamage = function() {
	var dotDamage = skill.adtEffectVal * this.target.debuffList[this.dID].stack;
	dotDamage = fc.fix(dotDamage);
	var preHP = this.target.getHP();
	this.target.hp = (dotDamage < this.target.hp) ? this.target.hp - dotDamage : 0;
	this.io.addOutputData(this.cID, 'hpChange', 'logged', {cID : this.target.cID, preHP : preHP, nowHP : this.target.hp, hpDelta : this.target.hp - preHP});
	if (this.target.getHP() === 0) {
		this.target.setStatus(0);
		this.setCharDead();
	}	
	this.io.response();
}

util.inherits(moraScissors, Skill);
global.Skill_MoraScissors = moraScissors;
