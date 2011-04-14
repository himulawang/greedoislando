var Map = Coordinate.extend({
    init : function() {
        this._super();
        this.DEFINE = {
            2000 : {
                name : 'Plain'
                ,movePossible : 1
            }
            ,2001 : {
                name : 'Broken Wall'
                ,movePossible : 0
            }
            ,2002 : {
                name : 'Tree'
                ,movePossible : 0
            }
            ,2003 : {
                name : 'Door'
                ,movePossible : 1
            }
            ,2004 : {
                name : 'River'
                ,movePossible : 0
            }
            ,2005 : {
                name : 'Ruins'
                ,movePossible : 1
            }
            ,2006 : {
                name : 'Bridge'
                ,movePossible : 1
            }
        }
    }
    ,getCanvas : function(el) {
        el.width = this.MAPWIDTH;
        el.height = this.MAPHEIGHT;
        this.context = el.getContext('2d');
    }
    ,getData : function(data) {
        this.grid = data;
    }
    ,draw : function() { // Draw Map Side
        var x, y;
        this.context.beginPath();
        this.context.moveTo(this.MAPWIDTH / 2, 0);
        this.context.lineTo(0, this.MAPHEIGHT / 2);
        this.context.lineTo(this.MAPWIDTH / 2, this.MAPHEIGHT);
        this.context.lineTo(this.MAPWIDTH, this.MAPHEIGHT / 2);
        this.context.closePath();
        this.context.stroke();

        //draw line
        for (var i = 1; i < this.GRIDQUANTITY; ++i) {
            // 0 , 1
            x = 0; y = i;
            this.context.beginPath();
            this.context.moveTo(this.transferLogicToScreenX(x, y), this.transferLogicToScreenY(x, y));
            // 16, 1
            x = this.GRIDQUANTITY; y = i;
            this.context.lineTo(this.transferLogicToScreenX(x, y), this.transferLogicToScreenY(x, y));
            this.context.closePath();
            this.context.stroke();
        }

        for (var i = 1; i < this.GRIDQUANTITY; ++i) {
            // 1 , 0
            x = i; y = 0;
            this.context.beginPath();
            this.context.moveTo(this.transferLogicToScreenX(x, y), this.transferLogicToScreenY(x, y));
            // 1, 16
            x = i; y = this.GRIDQUANTITY;
            this.context.lineTo(this.transferLogicToScreenX(x, y), this.transferLogicToScreenY(x, y));
            this.context.closePath();
            this.context.stroke();
        }

        //draw text
        var terrainType, coordinate, xy;
        for (var index in this.grid) {
            xy = this.getCoordinateXY(index);
            x = xy.x;
            y = xy.y;

            terrainType = this.getTerrainType(index);
            coordinate = index;

            this.context.fillStyle    = '#000000';
            this.context.font         = 'Calibri 8px sans-serif';
            this.context.textBaseline = 'top';
            this.context.fillText  (terrainType + ' ' + index, this.transferLogicToScreenX(x, y) - 21, this.transferLogicToScreenY(x, y) + 14);
        }
        //this.context.fillText  (obsname, this.transferLogicToScreenX(x, y) - 10, this.transferLogicToScreenY(x, y) - 30);
    }
    ,verifyMovePossible : function(index) {
        if (!this.grid[index]) return false;
        var objID = this.grid[index].objID;

        return this.DEFINE[objID].movePossible;
    }
    ,getTerrainType : function(index) {
        if (!this.grid[index]) return false;
        var objID = this.grid[index].objID;
        
        return this.DEFINE[objID].name;
    }
});
