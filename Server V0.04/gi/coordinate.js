var Coordinate = function() {
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

Coordinate.prototype.getMapIDs = function(absoluteX, absoluteY) {
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
Coordinate.prototype.transferMapBlockXYToIndex = function(x, y) {
    return 'b' + fc.fill0(3, x) + '_' + fc.fill0(3, y);
}
Coordinate.prototype.nineBlockCoordinate = function(mapBlocks) {
    var minCoordXY = {};
    minCoordXY.x = mapBlocks[7].x * 96;
    minCoordXY.y = mapBlocks[7].y * 96;
    var maxCoordXY = {};
    maxCoordXY.x = mapBlocks[3].x * 96;
    maxCoordXY.y = mapBlocks[3].y * 96;
    return { min : minCoordXY, max : maxCoordXY };
}
