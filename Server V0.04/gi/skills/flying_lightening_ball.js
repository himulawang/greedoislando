var flyingLighteningBall = function() {}

util.inherits(flyingLighteningBall, Skill);

flyingLighteningBall.prototype.initSkill = function(character) {
    this.sID = "10103";
    this.init(character);
}
flyingLighteningBall.prototype.castSkill = function(target) {
    this.target = target;
    if (!this.castTargetCheck()) return;
    if (!this.castProc()) return;
    this.doDamage();
}
flyingLighteningBall.prototype.doDamage = function() {    
    this.startGridXY = fc.getCoordinateXY(this.self.getLocation());
    this.endGridXY = fc.getCoordinateXY(this.target.getLocation());
    var range = Math.max(Math.abs(this.startGridXY.x - this.endGridXY.x), Math.abs(this.startGridXY.y - this.endGridXY.y));
    // Distance Formulation
    var damageFactor = 5 / range;
    var damage = this.getSkillDamage();
    var preHP = this.target.getHP();
	var hp = (damage * (1 + this.self.atkRF) - damage * this.target.defRF) * damageFactor;   // Damage reduction formulation    
	hp = fc.fix(hp);
    this.target.hp = (hp < this.target.hp) ? this.target.hp - hp : 0;
    io.addOutputData(this.cID, 'hpChange', 'logged', {cID : this.target.cID, preHP : preHP, nowHP : this.target.getHP(), hpDelta : this.target.getHP() - preHP});
    if (this.target.getHP() === 0) {        
        this.target.setStatus(0);
        this.setCharDead();
    }
    this.setSkillCD();
    this.startSkillCDProc();
    this.setCommonCD();
    this.freeStatusCountDown();
    io.response();
    this.self.beginStanding();
    this.chargeFactor = 1;
}

global.Skill_FlyingLighteningBall = flyingLighteningBall;
