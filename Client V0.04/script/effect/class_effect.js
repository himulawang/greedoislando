var Effect = Coordinate.extend({
    init : function(owner) {
        this._super(owner);
        this.owner = owner;
        this.cID = fc.guid();
    }
    ,make : function(cID) {
        this.anmiation = new Animation_Effect(this);
        this.actionQueue = new ActionQueue(this);
    }
});
