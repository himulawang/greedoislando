var MapList = Coordinate.extend({
    init : function() {
        this._super();
        this.list = {};
    }
    ,load : function(directionID, mapBlockID) {
        this.list[directionID] = new MapBlock(mapBlockID);
    }
    ,setPosition : function() {
        for (var directionID in this.list) {
            var positions = this.getMapBlockPosition(directionID);
            console.log(positions);
            this.list[directionID].setPosition(positions.left, positions.top);
        }
    }
});
