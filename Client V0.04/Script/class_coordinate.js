var Coordinate = Class.extend({
    init : function() {
        this.MAPWIDTH = GI_MAP_WIDTH;
        this.MAPHEIGHT = GI_MAP_HEIGHT;
        this.GRIDQUANTITY = GI_GRID_QUANTITY;

        this.TILEWIDTH = this.MAPWIDTH / this.GRIDQUANTITY;
        this.TILEHEIGHT = this.MAPHEIGHT / this.GRIDQUANTITY;
        this.HALFTILEWIDTH = this.TILEWIDTH / 2;
        this.HALFTILEHEIGHT = this.TILEHEIGHT / 2;
    }
    ,transferLogicToScreenX : function(x, y) {
        return this.MAPWIDTH / 2 + (x - y) * this.HALFTILEWIDTH;
    }
    ,transferLogicToScreenY : function(x, y) {
        return (y + x) * this.HALFTILEHEIGHT;
    }
    ,transferScreenToLogicX : function(x, y) {
        return parseInt((x - this.MAPWIDTH / 2) / (2 * this.HALFTILEWIDTH) + y / (2 * this.HALFTILEHEIGHT));
    }
    ,transferScreenToLogicY : function(x, y) {
        return parseInt((this.MAPWIDTH / 2 - x) / (2 * this.HALFTILEWIDTH) + y / (2 * this.HALFTILEHEIGHT));
    }
    ,put : function() {
        var ScreenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH;
        var ScreenY = this.transferLogicToScreenY(this.x, this.y);

        //var ScreenX = (this.TILEWIDTH - this.transferLogicToScreenX(this.x, this.y))/2 + x;
        //var ScreenY = this.transferLogicToScreenY(this.x, this.y) + this.HALFTILEHEIGHT;
        
        $(this.el).css({left : ScreenX + 'px', top : ScreenY + 'px'});
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
});
