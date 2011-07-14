var MapList = Coordinate.extend({
    init : function() {
        this._super();
        this.list = {};
    }
    ,load : function(id) {
        if (this.list[id]) return;
        this.list[id] = new MapBlock(id);
    }
});
