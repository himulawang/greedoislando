var Coordinate = Class.extend({
    init : function() {
        //World
        this.WORLDWIDTH = GI_MAP_WIDTH * GI_MAPBLOCK_X;
        this.WORLDHEIGHT = GI_MAP_HEIGHT * GI_MAPBLOCK_Y;
        //Map Block
        this.MAPWIDTH = GI_MAP_WIDTH;
        this.MAPHEIGHT = GI_MAP_HEIGHT;
        this.HALFMAPWIDTH = GI_MAP_WIDTH / 2;
        this.HALFMAPHEIGHT = GI_MAP_HEIGHT / 2;
        this.GRIDQUANTITY = GI_GRID_QUANTITY;
        this.SCREEN_WIDTH = GI_SCREEN_WIDTH;
        this.SCREEN_HEIGHT = GI_SCREEN_HEIGHT;

        this.SQUARESIDE = Math.sqrt(Math.pow(this.MAPWIDTH, 2) + Math.pow(this.MAPHEIGHT, 2));

        this.TILEWIDTH = this.MAPWIDTH / this.GRIDQUANTITY;
        this.TILEHEIGHT = this.MAPHEIGHT / this.GRIDQUANTITY;
        this.HALFTILEWIDTH = this.TILEWIDTH / 2;
        this.HALFTILEHEIGHT = this.TILEHEIGHT / 2;
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
    }
    ,transferLogicToScreenX : function(x, y) {
        return this.MAPWIDTH / 2 + (x - y) * this.HALFTILEWIDTH;
    }
    ,transferLogicToScreenY : function(x, y) {
        return (parseInt(y) + parseInt(x)) * this.HALFTILEHEIGHT;
    }
    ,transferScreenToLogicX : function(x, y) {
        return parseInt((x - this.MAPWIDTH / 2) / (2 * this.HALFTILEWIDTH) + y / (2 * this.HALFTILEHEIGHT));
    }
    ,transferScreenToLogicY : function(x, y) {
        return parseInt((this.MAPWIDTH / 2 - x) / (2 * this.HALFTILEWIDTH) + y / (2 * this.HALFTILEHEIGHT));
    }
    ,put : function(screenX, screenY) {
        //var ScreenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH;
        //var ScreenY = this.transferLogicToScreenY(this.x, this.y);
                
        //var ScreenX = (this.TILEWIDTH - this.transferLogicToScreenX(this.x, this.y))/2 + x;
        //var ScreenY = this.transferLogicToScreenY(this.x, this.y) + this.HALFTILEHEIGHT;
        
        $(this.el).css({left : screenX + 'px', top : screenY + 'px'});
    }
    ,move : function(e) {
        var xPX = e.layerX;
        var yPX = e.layerY;
        var x = this.transferScreenToLogicX(xPX, yPX);
        var y = this.transferScreenToLogicY(xPX, yPX);

        if (this.checkMoveOut(x, y)) {
            this.x = x;
            this.y = y;
            this.put();
        }
    }
    ,moveUp : function() {
        if (this.y === 0) return;
        --this.y;
    }
    ,moveDown : function() {
        if (this.y === this.GRIDQUANTITY - 1) return;
        ++this.y;
    }
    ,moveLeft : function() {
        if (this.x === 0) return;
        --this.x;
    }
    ,moveRight : function() {
        if (this.x === this.GRIDQUANTITY - 1) return;
        ++this.x;
    }
    ,checkMoveOut : function(x, y) {
        if (x >= 0
            && x < this.GRIDQUANTITY
            && y >= 0
            && y < this.GRIDQUANTITY
        ) return true;
    }
    ,getCoordinateIndex : function(x, y) {
        return x + ',' + y;
    }
    ,getCoordinateXY : function(index) {
        index = index.split(',');
        return {x : parseInt(index[0]), y : parseInt(index[1])};
    }
    ,getDirection : function(start, end) {
        var startXY = this.getCoordinateXY(start);
        var endXY = this.getCoordinateXY(end);
        var deltaX = endXY.x - startXY.x;
        var deltaY = endXY.y - startXY.y;
        var deltaIndex = this.getCoordinateIndex(deltaX, deltaY);
        var direction = this.DIRECTIONS[deltaIndex];
        return direction === undefined ? 0 : direction; //TODO use tringle cos / sin to fix this
    }
    ,getPlayerAbsoluteXY : function() {
        return xy = GI.character[GI.cID].getPosition();
    }
    ,transferMapBlockXYToIndex : function(x, y) {
        return 'b' + fc.fill0(3, x) + '_' + fc.fill0(3, y); 
    }
    ,transferMapBlockIndexToXY : function(index) {
        var xy = /^b(\d{3})_(\d{3})$/.exec(index);
        return { x : parseInt(xy[1]), y : parseInt(xy[2]) };
    }
    ,transferMapBlockLogicToScreenX : function(x, y) {
        return this.WORLDWIDTH / 2 + (x - y) * this.HALFMAPWIDTH;
    }
    ,transferMapBlockLogicToScreenY : function(x, y) {
        return (x + y) * this.HALFMAPHEIGHT;
    }
});
