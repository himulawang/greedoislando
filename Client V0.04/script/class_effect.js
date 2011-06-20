var Effect = Coordinate.extend({
    init : function() {
        this._super();
    }
    ,make : function() {
        this.anmiation = new Animation(this);
    }
});
