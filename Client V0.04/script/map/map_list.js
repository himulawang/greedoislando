var Map_List = function() {
    Map_List.super_.apply(this, arguments);
    this.list = {};
    this.el = $("#map");
    this.el.style.width = this.WORLDWIDTH + 'px';
    this.el.style.height = this.WORLDHEIGHT + 'px';
};

util.inherits(Map_List, Map);

Map_List.prototype.getBlock = function(directionID) {
    return this.list[directionID];
};
Map_List.prototype.delBlock = function(directionID) {
    var id = this.getBlock(directionID).getID();
    $.remove($('#' + id));
    delete this.list[directionID];
};
Map_List.prototype.getList = function() {
    return this.list;
};
Map_List.prototype.getBlockIDs = function(list) {
    /* list = {
     *  directionID : blockID
     * }
     * */
    if (list === undefined) { //no list inputed
        var list = this.getList();
        var newList = {};
        for (var directionID in list) {
            newList[directionID] = list[directionID].getID();
        }
        return newList;
    }
    
    var xy;
    var newList = {};
    for (var directionID in list) { //list inputed
        xy = list[directionID];
        newList[directionID] = this.transferMapBlockXYToIndex(xy.x, xy.y);
    }

    return newList;
};
Map_List.prototype.getDirectionID = function(mapBlockID) {
    var list = this.getList();
    for (var directionID in list) {
        if (this.getBlock(directionID).getID() === mapBlockID) return mapBlockID;
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
    if (mapX + 1 <= this.MAPBLOCKX && mapY - 1 > 0) {  // directionID 1
        mapBlockIDs[1] = { x : mapX + 1, y : mapY - 1 };
    }
    if (mapX + 1 <= this.MAPBLOCKX) {//directionID 2
        mapBlockIDs[2] = { x : mapX + 1, y : mapY };
    }
    if (mapX + 1 <= this.MAPBLOCKX && mapY + 1 <= this.MAPBLOCKY) {  // directionID 3
        mapBlockIDs[3] = { x : mapX + 1, y : mapY + 1 };
    }
    if (mapY + 1 <= this.MAPBLOCKY) {  // directionID 4
        mapBlockIDs[4] = { x : mapX, y : mapY + 1 };
    }
    if (mapX - 1 > 0 && mapY + 1 <= this.MAPBLOCKY) { // directionID 5
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
    var mapX = Math.floor(absoluteX / this.GRIDQUANTITY) + 1;
    var mapY = Math.floor(absoluteY / this.GRIDQUANTITY) + 1;
    return { x : mapX, y : mapY };
};
Map_List.prototype.getRelativePositionXY = function(absoluteX, absoluteY) {
    var posX = absoluteX % this.GRIDQUANTITY;
    var posY = absoluteY % this.GRIDQUANTITY;
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
        newMapBlockID = newMapBlockIDs[newDirectionID];
        preDirectionID = util.inObject(newMapBlockID, preMapBlockIDs); //get blocks can reuse
        if (preDirectionID === undefined) {
            newMapList[newDirectionID] = new Map_Block(newMapBlockID);
            continue;
        }

        newMapList[newDirectionID] = this.getBlock(preDirectionID);
        delete preMapBlockIDs[preDirectionID];
    }
    // recycle no use mapBlock
    for (var noUseDirectionID in preMapBlockIDs) {
        this.delBlock(noUseDirectionID);
    }
    
    this.list = newMapList;
    //set layout offset
    var offsets = this.getMapOffset();
    this.put(offsets.left, offsets.top);
};
Map_List.prototype.getMapOffset = function() {
    var positionXY = GI.characterList.getSelf().getPosition();
    var x = positionXY.x;
    var y = positionXY.y;

    var left = this.transferAbsolutePositionToOffsetLeft(x, y);
    var top = this.transferAbsolutePositionToOffsetTop(x, y);

    return { left : left, top : top };
};
