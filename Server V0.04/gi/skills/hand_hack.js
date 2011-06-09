var handHack = function(chargeFactor) {
	this.sID = "10100";
	this.chargeFactor = chargeFactor;
	this.castSkill();
}
handHack.prototype.castSkill = function() {
	this.doDamage(this.skillList[this.sID], this.chargeFactor);
}

util.inherits(handHack, Skill);
global.Skill_HandHack = handHack;
