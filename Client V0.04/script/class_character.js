var Character = Coordinate.extend({
    init : function() {
        this._super();
        this.moveOrbit = [];
        this.isMoving = false;
        this.progress = 0;
        this.lastStamp = 0;
    }
    ,getTimeDifference : function(data) {
        var cNowTimestamp = Date.now();
        return cNowTimestamp - data.timestamp;;
    }
    ,setPosition : function(x, y) {
        this.x = x;
        this.y = y;
    }
});
