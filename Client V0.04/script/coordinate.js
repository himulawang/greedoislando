var Coordinate = function() {
    //World
    this.WORLDWIDTH = GI_MAP_WIDTH * GI_MAPBLOCK_X;
    this.WORLDHEIGHT = GI_MAP_HEIGHT * GI_MAPBLOCK_Y;
    this.HALFWORLDWIDTH = this.WORLDWIDTH / 2;
    this.HALFWORLDHEIGHT = this.WORLDHEIGHT / 2;
    //Map Block
    this.MAPWIDTH = GI_MAP_WIDTH;
    this.MAPHEIGHT = GI_MAP_HEIGHT;
    this.HALFMAPWIDTH = this.MAPWIDTH / 2;
    this.HALFMAPHEIGHT = this.MAPHEIGHT / 2;
    //Screen
    this.SCREENWIDTH = GI_SCREEN_WIDTH;
    this.SCREENHEIGHT = GI_SCREEN_HEIGHT;
    this.HALFSCREENWIDTH = this.SCREENWIDTH / 2;
    this.HALFSCREENHEIGHT = this.SCREENHEIGHT / 2;
    this.GRIDQUANTITY = GI_GRID_QUANTITY;
    //Title
    this.TILEWIDTH = this.MAPWIDTH / this.GRIDQUANTITY;
    this.TILEHEIGHT = this.MAPHEIGHT / this.GRIDQUANTITY;
    this.HALFTILEWIDTH = this.TILEWIDTH / 2;
    this.HALFTILEHEIGHT = this.TILEHEIGHT / 2;

    this.SQUARESIDE = Math.sqrt(Math.pow(this.MAPWIDTH, 2) + Math.pow(this.MAPHEIGHT, 2));

    this.DIRECTIONS = {
        //deltaX,deltaY
        '0,0' : -1
        ,'0,-1' : 0
        ,'1,-1' : 1
        ,'1,0' : 2
        ,'1,1' : 3
        ,'0,1' : 4
        ,'-1,1' : 5
        ,'-1,0' : 6
        ,'-1,-1' : 7
    };
    this.VECTOR = {
        '-1' : { x : 0, y : 0 }
        ,'0' : { x : 0, y :-1 }
        ,'1' : { x : 1, y :-1 }
        ,'2' : { x : 1, y : 0 }
        ,'3' : { x : 1, y : 1 }
        ,'4' : { x : 0, y : 1 }
        ,'5' : { x :-1, y : 1 }
        ,'6' : { x :-1, y : 0 }
        ,'7' : { x :-1, y :-1 }
    };
};

Coordinate.prototype.transferLogicToScreenX = function(x, y) {
    return this.MAPWIDTH / 2 + (x - y) * this.HALFTILEWIDTH;
};
Coordinate.prototype.transferLogicToScreenY = function(x, y) {
    return (x + y) * this.HALFTILEHEIGHT;
};
/*
Coordinate.prototype.transferScreenToLogicX = function(x, y) {
    return parseInt((x - this.MAPWIDTH / 2) / (2 * this.HALFTILEWIDTH) + y / (2 * this.HALFTILEHEIGHT));
};
Coordinate.prototype.transferScreenToLogicY = function(x, y) {
    return parseInt((this.MAPWIDTH / 2 - x) / (2 * this.HALFTILEWIDTH) + y / (2 * this.HALFTILEHEIGHT));
};
*/
Coordinate.prototype.put = function(screenX, screenY) {
    //var ScreenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH;
    //var ScreenY = this.transferLogicToScreenY(this.x, this.y);
            
    //var ScreenX = (this.TILEWIDTH - this.transferLogicToScreenX(this.x, this.y))/2 + x;
    //var ScreenY = this.transferLogicToScreenY(this.x, this.y) + this.HALFTILEHEIGHT;
    
    $(this.el).css({left : screenX + 'px', top : screenY + 'px'});
};

Coordinate.prototype.checkMoveOut = function(x, y) {
    if (x >= 0
        && x < this.GRIDQUANTITY
        && y >= 0
        && y < this.GRIDQUANTITY
    ) return true;
};
Coordinate.prototype.getCoordinateIndex = function(x, y) {
    return x + ',' + y;
};
Coordinate.prototype.getCoordinateXY = function(index) {
    index = index.split(',');
    return {x : parseInt(index[0]), y : parseInt(index[1])};
};
Coordinate.prototype.getDirection = function(start, end) {
    var startXY = this.getCoordinateXY(start);
    var endXY = this.getCoordinateXY(end);
    var deltaX = endXY.x - startXY.x;
    var deltaY = endXY.y - startXY.y;
    var deltaIndex = this.getCoordinateIndex(deltaX, deltaY);
    var direction = this.DIRECTIONS[deltaIndex];
    return direction === undefined ? 0 : direction; //TODO use tringle cos / sin to fix this
};
Coordinate.prototype.getPlayerAbsoluteXY = function() {
    return xy = GI.character[GI.cID].getPosition();
};
//mapBlock
Coordinate.prototype.transferMapBlockXYToIndex = function(x, y) {
    return 'b' + fc.fill0(3, x) + '_' + fc.fill0(3, y); 
};
Coordinate.prototype.transferMapBlockIndexToXY = function(index) {
    var xy = /^b(\d{3})_(\d{3})$/.exec(index);
    return { x : parseInt(xy[1]), y : parseInt(xy[2]) };
};
Coordinate.prototype.transferMapBlockLogicToLayoutX = function(x, y) {
    return (x - y) * this.HALFMAPWIDTH;
};
Coordinate.prototype.transferMapBlockLogicToLayoutY = function(x, y) {
    return (x + y) * this.HALFMAPHEIGHT;
};
//absolutePosition
Coordinate.prototype.transferAbsolutePositionToOffsetLeft = function(x, y) {
    return (x - y) * this.HALFTILEWIDTH - this.HALFMAPWIDTH + this.HALFSCREENWIDTH;
};
Coordinate.prototype.transferAbsolutePositionToOffsetTop = function(x, y) {
    return - (x + y) * this.HALFTILEHEIGHT + this.HALFSCREENHEIGHT;
};
