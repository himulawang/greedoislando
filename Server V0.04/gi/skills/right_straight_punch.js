var rightStraightPunch = function() {}

util.inherits(rightStraightPunch, Skill);

rightStraightPunch.prototype.initSkill = function(character) {
    this.sID = "10000";
    this.init(character);
}
rightStraightPunch.prototype.castSkill = function(target) {
    this.target = target;
    if (!this.castProc()) return;
    this.doDamage();
}

global.Skill_RightStraightPunch = rightStraightPunch;
