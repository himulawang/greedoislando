var moraScissors = function() {}

util.inherits(moraScissors, Skill);

moraScissors.prototype.initSkill = function(character) {
	this.sID = "10002";
	this.init(character);
}
moraScissors.prototype.castSkill = function(target) {
	this.target = target;
    if (!this.castTargetCheck()) return;
    if (!this.castProc()) return;
	this.doDamage();
	this.doBleed();
}
moraScissors.prototype.doBleed = function() {
	this.pushDebuffList(this.target);
	this.dID = this.getDebuffID(this.target);
	if (this.target.debuffList[this.dID].stack < 5) {
		++this.target.debuffList[this.dID].stack;
	}	
	this.doTimes = this.skill.adtEffectTime / this.dotTimer;	
	io.addOutputData(this.cID, 'debuff', 'logged', { cID : this.target.cID, sourceCID : this.cID, skillID : this.skill.skillID, last : this.skill.adtEffectTime ,effect : this.skill.adtEffect, stack : this.target.debuffList[this.dID].stack , isOn : 1 });
	io.response();
	this.dotCounts = 0;
	if (this.target.debuffList[this.dID].stack > 1) return;	
	this.doBleedLoop();
}
moraScissors.prototype.doBleedLoop = function() {
	var _this = this;
    
    if (this.self.doBleedTimeout[this.dID]) clearTimeout(this.self.doBleedTimeout[this.dID]);
	
    this.self.doBleedTimeout[this.dID] = setTimeout(function(){
		_this.doBleedDamage();
		++_this.dotCounts;
		if (_this.dotCounts === _this.doTimes) {
			io.addOutputData(_this.cID, 'debuff', 'logged', { cID : _this.target.cID, sourceCID : _this.cID, skillID : _this.skill.skillID, last : _this.skill.adtEffectTime ,effect : _this.skill.adtEffect, stack : _this.target.debuffList[_this.dID].stack , isOn : 0 });
			io.response();
			_this.dotCounts = 0;
			delete _this.target.debuffList[_this.dID];
			return;
		}
		_this.doBleedLoop();
	}, this.dotTimer);
}
moraScissors.prototype.doBleedDamage = function() {
	var dotDamage = this.skill.adtEffectVal * this.target.debuffList[this.dID].stack;
	dotDamage = fc.fix(dotDamage);
	var preHP = this.target.getHP();
	this.target.hp = (dotDamage < this.target.hp) ? this.target.hp - dotDamage : 0;
	io.addOutputData(this.cID, 'hpChange', 'logged', {cID : this.target.cID, preHP : preHP, nowHP : this.target.hp, hpDelta : this.target.hp - preHP});
	if (this.target.getHP() === 0) {
		this.target.setStatus(0);
		this.setCharDead();
	}	
	io.response();
}

global.Skill_MoraScissors = moraScissors;
