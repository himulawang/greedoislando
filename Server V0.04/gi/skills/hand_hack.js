var handHack = function(character) {
    this.initSkill(character);
}
handHack.prototype.initSkill = function() {
    this.sID = "10100";
    this.init(character);
}
handHack.prototype.castSkill = function(target) {
    this.target = target;
    if (this.castProc === 0) return;
    this.doDamage();
}

util.inherits(handHack, Skill);
global.Skill_HandHack = handHack;
