var Skill = function(skillID) {
    this.skillID = skillID;
    this.name = SKILL[skillID].name;
    this.abbreviation = SKILL[skillID].abbreviation;
    this.skillCD = SKILL[skillID].skillCD;

    this.resetCD();
}
Skill.prototype.make = function(owner) {
    this.owner = owner;
};
Skill.prototype.getSkillID = function() {
    return this.skillID;
};
Skill.prototype.launch = function() {
    var obj = {
        type : "castSkill"
        ,target : GI.targetCID
        ,skillID: this.skillID
    }
    wsocket.sendMessage(obj);
    this.preCastSkill = false;
};
Skill.prototype.cast = function(data) {
    this.owner.animation.switch('attack');
    this.setCD();
};
Skill.prototype.setCD = function() {
    this.cd = fc.getNowTimestamp();
    if (!this.owner.self) return;
    GI.ui.skillbar.skill[this.skillID].setCD();
};
Skill.prototype.resetCD = function() {
    this.cd = null;
};
Skill.prototype.getCDProgress = function() { // return %
    if (!this.cd) return;
    var progress = (fc.getNowTimestamp() - this.cd) / this.skillCD;
    if (progress < 1) {
        return progress;
    }

    this.resetCD();
    GI.ui.skillbar.skill[this.skillID].resetCD();
};
Skill.prototype.keydown = function(keyboard, keyCode) {
};
Skill.prototype.keyup = function(keyboard, keyCode) {
    this.launch();
};
