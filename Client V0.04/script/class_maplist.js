var MapList = Coordinate.extend({
    init : function() {
        this._super();
        this.list = {};
    }
    ,getBlock : function(directionID) {
        return this.list[directionID];
    }
    ,getList : function() {
        return this.list;
    }
    ,getBlockIDs : function(list) {
        if (list === undefined) var list = this.getList();

        for (var directionID in list) {
            list[directionID] = list[directionID].getID();
        }
        return list;
    }
    /* unuse mark for del TODO
    ,load : function(directionID, mapBlockID) {
        this.list[directionID] = new MapBlock(mapBlockID);
    }
    */
    ,setPosition : function() {
        for (var directionID in this.list) {
            var positions = this.getMapBlockPosition(directionID);
            this.list[directionID].setPosition(positions.left, positions.top);
        }
    }
    ,getDirectionID : function(mapBlockID) {
        for (var directionID in this.list) {
            if (this.list[directionID].getID === mapBlockID) return mapBlockID;
        }
        return false;
    }
    ,transferMapBlockXYToIndex : function(x, y) {
        return 'b' + fc.fill0(3, x) + '_' + fc.fill0(3, y); 
    }
    ,getMapBlockIDsByAbsolutePosition : function(absoluteX, absoluteY) {
        // get center mapblock xy
        var mapX = Math.floor(absoluteX / GI_GRID_QUANTITY) + 1;
        var mapY = Math.floor(absoluteY / GI_GRID_QUANTITY) + 1;

        /*  7  0  1
         *  6  -1 2
         *  5  4  3
         * */
        var mapBlockIDs = {};
        mapBlockIDs[-1] = { x : mapX, y : mapY };
        
        if (mapY - 1 > 0) {  // directionID 0
            mapBlockIDs[0] = { x : mapX, y : mapY - 1 };
        }
        if (mapX + 1 <= GI_MAPBLOCK_X && mapY - 1 > 0) {  // directionID 1
            mapBlockIDs[1] = { x : mapX + 1, y : mapY - 1 };
        }
        if (mapX + 1 <= GI_MAPBLOCK_X) {//directionID 2
            mapBlockIDs[2] = { x : mapX + 1, y : mapY };
        }
        if (mapX + 1 <= GI_MAPBLOCK_X && mapY + 1 <= GI_MAPBLOCK_Y) {  // directionID 3
            mapBlockIDs[3] = { x : mapX + 1, y : mapY + 1 };
        }
        if (mapY + 1 <= GI_MAPBLOCK_Y) {  // directionID 4
            mapBlockIDs[4] = { x : mapX, y : mapY + 1 };
        }
        if (mapX - 1 > 0 && mapY + 1 <= GI_MAPBLOCK_Y) { // directionID 5
            mapBlockIDs[5] = { x : mapX - 1, y : mapY + 1 };
        }
        if (mapX - 1 > 0) {  // directionID 6
            mapBlockIDs[6] = { x : mapX - 1, y : mapY };
        }
        if (mapX - 1 > 0 && mapY - 1 > 0) {  // directionID 7
            mapBlockIDs[7] = { x : mapX - 1, y : mapY - 1 };
        }

        return mapBlockIDs;
    }
    ,getMapBlockPosition : function(directionID) {
        var xy = this.VECTOR[directionID];
        var x = xy.x;
        var y = xy.y;
        var left = (this.SCREEN_WIDTH - this.MAPWIDTH) / 2 + (x - y) * this.MAPWIDTH / 2;
        var top = (this.SCREEN_HEIGHT - this.MAPHEIGHT) / 2 + (x + y) * this.MAPHEIGHT / 2;
        return { left: left, top: top };
    }
    ,make : function(x, y) {
        var newMapBlockList = this.getMapBlockIDsByAbsolutePosition(x, y);

        var preMapBlockIDs = this.getBlockIDs();
        var newMapBlockIDs = this.getBlockIDs(newMapBlockList);
    
        var preDirectionID, newMapBlockID;
        var reuseBlockIDs = {};
        var newMapList = {};
        for (var newDirectionID in newMapBlockIDs) {
            newMapBlockID = this.transferMapBlockXYToIndex(newMapBlockList[newDirectionID]);
            preDirectionID = fc.inObject(newMapBlockIDs[newDirectionID], preMapBlockIDs); //get blocks can reuse
            if (preDirectionID === undefined) {
                newMapList[newDirectionID] = new MapBlock(newDirectionID, newMapBlockID);
                continue;
            }

            newMapList[newDirectionID] = this.getBlock(preDirectionID);
        }
        this.list = newMapList;
    }
});
