var Effect_LightingBall = Effect.extend({
    init : function(owner) {
        this._super(owner);
        this.name = 'lightingball';
    }
    ,setTarget : function(target) {
        this.target = target;
    }
    ,run : function() {
        this.animation.nowLocation = this.owner.location;
        this.animation.nextLocation = this.target.location;
        this.animation.moveDuration = 1920; //TODO move this into config
        this.animation.switch('move');
    }
});
