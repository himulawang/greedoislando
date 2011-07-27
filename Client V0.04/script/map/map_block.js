var Map_Block = function() {
    this.constructor.super_.apply(this, arguments);
    this.id = id;
    this.grid = eval(id);
    var xy = this.transferMapBlockIndexToXY(id);
    this.x = xy.x;
    this.y = xy.y;

    //create canvas
    //TODO
    var canvas = $("<canvas class='mapblock' id='" + this.id + "'></canvas>");
    $('#map').append(canvas);
    this.el = $("#" + this.id);
    this.el.width = GI_MAP_WIDTH;
    this.el.height = GI_MAP_HEIGHT;

    this.canvas = this.el.getContext('2d');
    this.draw();
    this.setPosition();
}

util.inherits(Map_Block, Map);

Map_Block.prototype.setPosition = function() {
    var x = this.x - 1;
    var y = this.y - 1;

    var left = this.transferMapBlockLogicToLayoutX(x, y);
    var top = this.transferMapBlockLogicToLayoutY(x, y);
    //TODO
    this.el.css({left : left + 'px', top : top + 'px'});
};
Map_Block.prototype.draw = function() {
    var x, y;
    this.canvas.beginPath();
    this.canvas.moveTo(this.MAPWIDTH / 2, 0);
    this.canvas.lineTo(0, this.MAPHEIGHT / 2);
    this.canvas.lineTo(this.MAPWIDTH / 2, this.MAPHEIGHT);
    this.canvas.lineTo(this.MAPWIDTH, this.MAPHEIGHT / 2);
    this.canvas.closePath();
    this.canvas.stroke();

    var terrainType, coordinate, xy, tmpXY;
    for (var index in this.grid) {
        tmpXY = this.getCoordinateXY(index);
        x = tmpXY.x;
        y = tmpXY.y;
        index = this.getCoordinateIndex(x, y);

        terrainType = this.getTerrainType(index);
        coordinate = index;
        
        //Init Terrain
        var objID = this.grid[index].objID;
        var offsetX = TERRAIN[objID].offsetX;
        var offsetY = TERRAIN[objID].offsetY;
        var lib = GI.material.images.map;
        if (objID == 2001  || objID == 2002 || objID == 2004) {
            var img = lib[objID];
            this.canvas.drawImage(img, this.transferLogicToScreenX(x, y) - offsetX,this.transferLogicToScreenY(x, y) - offsetY);
        }
    }
};
Map_Block.prototype.getTerrainType = function(index) {
    if (!this.grid[index]) return false;
    var objID = this.grid[index].objID;
    
    return TERRAIN[objID].name;
};
Map_Block.prototype.getID = function() {
    return this.id;
};
