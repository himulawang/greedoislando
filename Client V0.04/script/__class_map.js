var Map = Coordinate.extend({
    init : function() {
        this._super();
        this.DEFINE = {
            2000 : {
                name : 'Plain'
                ,movePossible : 1
                ,w : 6
                ,l : 6
                ,offsetX : 39
                ,offsetY : 42
            }
            ,2001 : {
                name : 'Rock'
                ,movePossible : 0
                ,w : 6
                ,l : 6
                ,offsetX : 39
                ,offsetY : 42
            }
            ,2002 : {
                name : 'Tree'
                ,movePossible : 0
                ,w : 6
                ,l : 6
                ,offsetX : 39
                ,offsetY : 30
            }
            ,2003 : {
                name : 'Door'
                ,movePossible : 0
                ,w : 6
                ,l : 6
                ,offsetX : 39
                ,offsetY : 42
            }
            ,2004 : {
                name : 'Pillar'
                ,movePossible : 1
                ,w : 6
                ,l : 6
                ,offsetX : 20
                ,offsetY : 75
            }
            ,2005 : {
                name : 'Ruins'
                ,movePossible : 1
                ,w : 6
                ,l : 6
                ,offsetX : 39
                ,offsetY : 42
            }
            ,2006 : {
                name : 'Bridge'
                ,movePossible : 1
                ,w : 6
                ,l : 6
                ,offsetX : 39
                ,offsetY : 42
            }
        }
    }
    ,getCanvas : function(el) {
    /*
        el.width = this.MAPWIDTH;
        el.height = this.MAPHEIGHT;
        */
        this.context = el.getContext('2d');
    }
    ,getData : function() {
        this.grid = MAP_DATA;
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
        /*
        for (var i = 1; i < this.GRIDQUANTITY; ++i) {
            if (i % 6 === 0) {
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
        }

        for (var i = 1; i < this.GRIDQUANTITY; ++i) {
            if (i % 6 === 0) {
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
        }
        */

        //draw map material
        var terrainType, coordinate, xy, tmpXY;
        for (var index in this.grid) {
            tmpXY = this.getCoordinateXY(index);
            x = tmpXY.x;
            y = tmpXY.y;
            index = this.getCoordinateIndex(x, y);

            terrainType = this.getTerrainType(index);
            coordinate = index;
            
            /*
            this.context.fillStyle    = '#000000';
            this.context.font         = 'Calibri 8px sans-serif';
            this.context.textBaseline = 'top';
            this.context.fillText(terrainType + ' ' + index, this.transferLogicToScreenX(x, y) - 21, this.transferLogicToScreenY(x, y) + 14);
            */
            
            //Init Terrain
            var objID = this.grid[index].objID;
            var offsetX = this.DEFINE[objID].offsetX;
            var offsetY = this.DEFINE[objID].offsetY;
            var lib = GI.material.images.map;
            if(objID == 2001  || objID == 2002 || objID == 2004) {
                var img = lib[objID];
                this.context.drawImage(img, this.transferLogicToScreenX(x, y) - offsetX,this.transferLogicToScreenY(x, y) - offsetY);
            }
        }
    }
    ,verifyMovePossible : function(index) {
        if (!this.grid[index]) return false;
        var objID = this.grid[index].objID;

        return this.DEFINE[objID].movePossible;
    }
    ,verifyClickMovePossible : function(index) {
        if (this.obstacleList[index]) return false;
        return true;
    }
    ,getTerrainType : function(index) {
        if (!this.grid[index]) return false;
        var objID = this.grid[index].objID;
        
        return this.DEFINE[objID].name;
    }
    ,setObstacle : function(x, y) {
        this.obstacleList[this.getIndex(x, y)] = {x : parseInt(x), y : parseInt(y)};
    }
    ,getIndex : function(x, y) {
        return x + ',' + y;
    }
    ,initObstacle : function() {
        this.obstacleList = {};
        var xy, i, j;
        for (var index in this.grid) {
            if (this.verifyMovePossible(index)) continue;
            xy = this.getCoordinateXY(index);
            for (i = 0; i < this.grid[index].l; ++i) {
                for (j = 0; j < this.grid[index].w; ++j) {
                    this.setObstacle(xy.x + i, xy.y + j);
                }
            }
        }
    }
});
