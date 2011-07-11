var handHack = function() {}

util.inherits(handHack, Skill);

handHack.prototype.initSkill = function(character) {
    this.sID = "10100";
    this.init(character);
}
handHack.prototype.castSkill = function(target) {
    this.target = target;
    if (!this.castTargetCheck()) return;
    if (!this.castProc()) return;
    this.doDamage();
}

global.Skill_HandHack = handHack;
