var Gon = Character.extend({
    init : function() {
        this.MAPWIDTH = GI_MAP_WIDTH;
        this.MAPHEIGHT = GI_MAP_HEIGHT;
        this.GRIDQUANTITY = GI_GRID_QUANTITY;

        this.SQUARESIDE = Math.sqrt(Math.pow(this.MAPWIDTH, 2) + Math.pow(this.MAPHEIGHT, 2));
        this.TILEWIDTH = this.MAPWIDTH / this.GRIDQUANTITY;
        this.TILEHEIGHT = this.MAPHEIGHT / this.GRIDQUANTITY;
        this.HALFTILEWIDTH = this.TILEWIDTH / 2;
        this.HALFTILEHEIGHT = this.TILEHEIGHT / 2;

    }
    ,CalculateGonRunOffset : function(runWidth,runHeight) {
        this.runOffsetX = (this.TILEWIDTH - runWidth) / 2;
        this.runOffsetY = runHeight - this.HALFTILEHEIGHT - 5;
    }
    ,CalculateGonStandOffset : function(standWidth,standHeight) {
        this.standOffsetX = (this.TILEWIDTH - standWidth) / 2 + 5;
        this.standOffsetY = standHeight - this.HALFTILEHEIGHT - 5;
    }
});
