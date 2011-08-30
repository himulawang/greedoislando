var Map = function() {
    this.GRIDQUANTITY = global.GI_GRID_QUANTITY;
    //World
    this.MAPBLOCKX = global.GI_MAPBLOCK_X;
    this.MAPBLOCKY = global.GI_MAPBLOCK_Y;
    this.WORLDWIDTH = global.GI_MAP_WIDTH * this.MAPBLOCKX;
    this.WORLDHEIGHT = global.GI_MAP_HEIGHT * this.MAPBLOCKY;
    this.HALFWORLDWIDTH = this.WORLDWIDTH / 2;
    this.HALFWORLDHEIGHT = this.WORLDHEIGHT / 2;

    this.WORLDGRIDQUANTITY = this.GRIDQUANTITY * this.MAPBLOCKX;
    //Map Block
    this.MAPWIDTH = global.GI_MAP_WIDTH;
    this.MAPHEIGHT = global.GI_MAP_HEIGHT;
    this.HALFMAPWIDTH = this.MAPWIDTH / 2;
    this.HALFMAPHEIGHT = this.MAPHEIGHT / 2;
    //Screen
    this.SCREENWIDTH = global.GI_SCREEN_WIDTH;
    this.SCREENHEIGHT = global.GI_SCREEN_HEIGHT;
    this.HALFSCREENWIDTH = this.SCREENWIDTH / 2;
    this.HALFSCREENHEIGHT = this.SCREENHEIGHT / 2;
    //Title
    this.TILEWIDTH = this.MAPWIDTH / this.GRIDQUANTITY;
    this.TILEHEIGHT = this.MAPHEIGHT / this.GRIDQUANTITY;
    this.HALFTILEWIDTH = this.TILEWIDTH / 2;
    this.HALFTILEHEIGHT = this.TILEHEIGHT / 2;

    this.SQUARESIDE = Math.sqrt(Math.pow(this.MAPWIDTH, 2) + Math.pow(this.MAPHEIGHT, 2));

    this.DIRECTIONS = global.DIRECTION;
    this.VECTOR = global.VECTOR;
};

Map.prototype.transferLogicToScreenX = function(x, y) {
    return this.MAPWIDTH / 2 + (x - y) * this.HALFTILEWIDTH;
};
Map.prototype.transferLogicToScreenY = function(x, y) {
    return (x + y) * this.HALFTILEHEIGHT;
};
Map.prototype.put = function(left, top) {
    //var ScreenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH;
    //var ScreenY = this.transferLogicToScreenY(this.x, this.y);
            
    //var ScreenX = (this.TILEWIDTH - this.transferLogicToScreenX(this.x, this.y))/2 + x;
    //var ScreenY = this.transferLogicToScreenY(this.x, this.y) + this.HALFTILEHEIGHT;
    
    $.left(this.el, left);
    $.top(this.el, top);
};

Map.prototype.checkMoveOut = function(x, y) {
    if (x >= 0
        && x < this.WORLDGRIDQUANTITY
        && y >= 0
        && y < this.WORLDGRIDQUANTITY
    ) return true;
};
Map.prototype.getCoordinateIndex = function(x, y) {
    return x + ',' + y;
};
Map.prototype.getCoordinateXY = function(index) {
    index = index.split(',');
    return {x : parseInt(index[0]), y : parseInt(index[1])};
};
Map.prototype.getDirection = function(start, end) {
    var startXY = this.getCoordinateXY(start);
    var endXY = this.getCoordinateXY(end);
    var deltaX = endXY.x - startXY.x;
    var deltaY = endXY.y - startXY.y;
    var deltaIndex = this.getCoordinateIndex(deltaX, deltaY);
    var direction = this.DIRECTIONS[deltaIndex];
    return direction === undefined ? 0 : direction; //TODO use tringle cos / sin to fix this
};
Map.prototype.getPlayerAbsoluteXY = function() {
    return xy = GI.character[GI.cID].getPosition();
};
//mapBlock
Map.prototype.transferMapBlockXYToIndex = function(x, y) {
    return 'b' + fc.fill0(3, x) + '_' + fc.fill0(3, y); 
};
Map.prototype.transferMapBlockIndexToXY = function(index) {
    var xy = /^b(\d{3})_(\d{3})$/.exec(index);
    return { x : parseInt(xy[1]), y : parseInt(xy[2]) };
};
Map.prototype.transferMapBlockLogicToLayerX = function(x, y) {
    return (x - y) * this.HALFMAPWIDTH + this.HALFWORLDWIDTH - this.HALFMAPWIDTH;
};
Map.prototype.transferMapBlockLogicToLayerY = function(x, y) {
    return (x + y) * this.HALFMAPHEIGHT;
};
//absolutePosition
Map.prototype.transferAbsolutePositionToOffsetLeft = function(x, y) {
    return - (x - y) * this.HALFTILEWIDTH - this.HALFWORLDWIDTH + this.HALFSCREENWIDTH;
};
Map.prototype.transferAbsolutePositionToOffsetTop = function(x, y) {
    return - (x + y) * this.HALFTILEHEIGHT + this.HALFSCREENHEIGHT;
};
Map.prototype.transferAbsolutePositionToLogicX = function(x, y) {
    return parseInt((x - this.WORLDWIDTH / 2) / (2 * this.HALFTILEWIDTH) + y / (2 * this.HALFTILEHEIGHT));
};
Map.prototype.transferAbsolutePositionToLogicY = function(x, y) {
    return parseInt((this.WORLDWIDTH / 2 - x) / (2 * this.HALFTILEWIDTH) + y / (2 * this.HALFTILEHEIGHT));
};
//z-index
Map.prototype.getZIndex = function(x, y) {
    return (x + y) * 10;
};
