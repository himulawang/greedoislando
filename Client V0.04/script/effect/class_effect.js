var Effect = function(owner) {
    this.constructor.super_.apply(this, arguments);
    this.owner = owner;
    this.cID = fc.guid();
};

util.inherits(Effect, Map);

Effect.prototype.make = function() {
    this.animation = new Animation_Effect(this);
    this.actionQueue = new ActionQueue(this);
};
Effect.prototype.destroy = function() {
    var effectCID = this.cID;
    $("#" + effectCID).remove();
    delete this.owner.effect[effectCID];
};
