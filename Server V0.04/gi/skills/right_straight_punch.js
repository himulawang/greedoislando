var rightStraightPunch = function(chargeFactor) {
	this.sID = "10000";
	this.chargeFactor = chargeFactor;
	this.castSkill();
}
rightStraightPunch.prototype.castSkill = function() {
	this.doDamage(this.skillList[this.sID], this.chargeFactor);
}
util.inherits(rightStraightPunch, Skill);
global.Skill_RightStraightPunch = rightStraightPunch;
