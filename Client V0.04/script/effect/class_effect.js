var Effect = Coordinate.extend({
    init : function(owner) {
        this._super(owner);
        this.owner = owner;
        this.cID = fc.guid();
    }
    ,make : function() {
        this.animation = new Animation_Effect(this);
        this.actionQueue = new ActionQueue(this);
    }
    ,destroy : function() {
        var effectCID = this.cID;
        $("#" + effectCID).remove();
        delete this.owner.effect[effectCID];
    }
});
