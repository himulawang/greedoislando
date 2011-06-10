var rightStraightPunch = function(character) {
	this.initSkill(character);
}
rightStraightPunch.prototype.initSkill = function(character) {
    this.sID = "10000";
    this.init(character);
}
rightStraightPunch.prototype.castSkill = function(target) {
    this.target = target;
    if (this.castProc === 0) return;
    this.doDamage();
}

util.inherits(rightStraightPunch, Skill);
global.Skill_RightStraightPunch = rightStraightPunch;
