var findway = require('./map_findway');

var Map = function() {
    this.mapData = {};
    this.findway = findway.create();
}

Map.prototype.initMap = function(mapBlock) {
    var mapIndex = Coordinate.transferMapBlockXYToIndex(mapBlock.x, mapBlock.y);
    this.mapData[mapIndex] = fc.readFile("../config/map/a001_001/" + mapIndex + ".js");
}
Map.prototype.setMap = function(nowLocation) {
    var nowLocationXY = fc.getCoordinateXY(nowLocation);
    var mapIDs = Coordinate.getMapIDs(nowLocationXY.x, nowLocationXY.y);
    var mapIndex;
    for (var x in mapIDs) {
        mapIndex = Coordinate.transferMapBlockXYToIndex(mapIDs[x].x, mapIDs[x].y);
        if (!this.mapData[mapIndex]) this.initMap(mapIDs[x]);
    }
    var mapCombineCoord = Coordinate.nineBlockCoordinate(mapIDs);
    this.findway.setScope(mapCombineCoord.min, mapCombineCoord.max);
}
Map.prototype.setObstacle = function() {
    
}
