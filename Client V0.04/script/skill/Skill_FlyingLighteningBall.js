var Skill_FlyingLighteningBall = Skill.extend({
    init : function(skillID) {
        this._super(skillID);
    }
    ,cast : function(data) {
        var effect = new Effect_LightingBall(this.owner);
        effect.make();

        //set target
        var target = GI.character[data.target];
        effect.setTarget(target);

        this.owner.effect[effect.cID] = effect;
        //run
        effect.run();
    }
});
