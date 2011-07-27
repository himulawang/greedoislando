var Effect_LightingBall = function() {
    this.constructor.super_.apply(this, arguments);
    this.name = 'lightingball';
};

util.inherits(Effect_LightingBall, Effect);

Effect_LightingBall.prototype.setTarget = function(target) {
    this.target = target;
};
Effect_LightingBall.prototype.run = function() {
    this.animation.nowLocation = this.owner.location;
    this.animation.nextLocation = this.target.location;
    this.animation.moveDuration = 1920; //TODO move this into config
    this.animation.switch('move');
};
