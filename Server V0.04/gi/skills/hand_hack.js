util.inherits(handHack, skill);

var handHack = function(chargeFactor) {
	this.sID = "10100";
	this.chargeFactor = chargeFactor;
	this.excuteSkill();
}
exports.create = function(chargeFactor) {
	return new handHack(chargeFactor);
}

handHack.prototype.excuteSkill = function() {
	this.excuteDamage(this.skillList[this.sID], this.chargeFactor);
}
