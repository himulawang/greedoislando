var Skill_FlyingLighteningBall = function() {};

util.inherits(Skill_FlyingLighteningBall, Skill);
//TODO this._super(skillID);

Skill_FlyingLighteningBall.prototype.cast = function(data) {
    var effect = new Effect_LightingBall(this.owner);
    effect.make();

    //set target
    var target = GI.character[data.target];
    effect.setTarget(target);

    this.owner.effect[effect.cID] = effect;
    //run
    effect.run();
};
