var Map_List = function() {
    this.constructor.super_.apply(this, arguments);
    this.list = {};
    this.el = $("#map");
};

util.inherits(Map_List, Map);

Map_List.prototype.getBlock = function(directionID) {
    return this.list[directionID];
};
Map_List.prototype.getList = function() {
    return this.list;
};
Map_List.prototype.getBlockIDs = function(list) {
    if (list === undefined) { //no list inputed
        var list = this.getList();
        for (var directionID in list) {
            list[directionID] = list[directionID].getID();
        }
        return list;
    }
    
    var xy;
    for (var directionID in list) { //list inputed
        xy = list[directionID];
        list[directionID] = this.transferMapBlockXYToIndex(xy.x, xy.y);
    }

    return list;
};
Map_List.prototype.getDirectionID = function(mapBlockID) {
    for (var directionID in this.list) {
        if (this.list[directionID].getID === mapBlockID) return mapBlockID;
    }
    return false;
};
Map_List.prototype.getMapBlockXYList = function(absoluteX, absoluteY) {
    // get center mapblock xy
    var centerXY = this.getMapBlockXY(absoluteX, absoluteY);

    var mapX = centerXY.x;
    var mapY = centerXY.y;

    /*  7  0   1
     *  6  -1  2
     *  5  4   3
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
};
Map_List.prototype.getMapBlockXY = function(absoluteX, absoluteY) {
    var mapX = Math.floor(absoluteX / GI_GRID_QUANTITY) + 1;
    var mapY = Math.floor(absoluteY / GI_GRID_QUANTITY) + 1;
    return { x : mapX, y : mapY };
};
Map_List.prototype.getRelativePositionXY = function(absoluteX, absoluteY) {
    var posX = absoluteX % GI_GRID_QUANTITY;
    var posY = absoluteY % GI_GRID_QUANTITY;
    return { x : posX, y : posY };
};
Map_List.prototype.make = function(x, y) {
    var newMapBlockList = this.getMapBlockXYList(x, y);

    var preMapBlockIDs = this.getBlockIDs();
    var newMapBlockIDs = this.getBlockIDs(newMapBlockList);

    var preDirectionID, newMapBlockID;
    var reuseBlockIDs = {};
    var newMapList = {};
    for (var newDirectionID in newMapBlockIDs) {
        newMapBlockID = newMapBlockList[newDirectionID];
        preDirectionID = fc.inObject(newMapBlockIDs[newDirectionID], preMapBlockIDs); //get blocks can reuse
        if (preDirectionID === undefined) {
            newMapList[newDirectionID] = new MapBlock(newMapBlockID);
            continue;
        }

        newMapList[newDirectionID] = this.getBlock(preDirectionID);
    }
    this.list = newMapList;
    //set layout offset
    var offsets = this.getMapOffset();
    this.put(offsets.left, offsets.top);
};
Map_List.prototype.put = function(left, top) {
    //TODO
    this.el.css({ left : left + 'px', top : top + 'px' });
};
Map_List.prototype.getMapOffset = function() {
    var positionXY = GI.character[GI.cID].getPosition();
    var x = positionXY.x;
    var y = positionXY.y;

    var left = this.transferAbsolutePositionToOffsetLeft(x, y);
    var top = this.transferAbsolutePositionToOffsetTop(x, y);

    return { left : left, top : top };
};
