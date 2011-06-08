util.inherits(rightStraightPunch, skill);

var rightStraightPunch = function(chargeFactor) {
	this.sID = "10000";
	this.chargeFactor = chargeFactor;
	this.excuteSkill();
}
exports.create = function(chargeFactor) {
	return new rightStraightPunch(chargeFactor);
}

rightStraightPunch.prototype.excuteSkill = function() {
	this.excuteDamage(this.skillList[this.sID], this.chargeFactor);
}
