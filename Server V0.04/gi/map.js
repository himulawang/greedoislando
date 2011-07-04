var findway = require('./map_findway');

var Map = function() {}

Map.prototype.init = function(startGridXY, maxGridXY) {
    this.DEFINE = {
    /* 2000 Plain
     * 2001 Broken Wall
     * 2002 Tree
     * 2003 Door
     * 2004 River
     * 2005 Ruins
     * 2006 Bridge
     * */
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
    };
    this.findway = findway.create(startGridXY, maxGridXY);
    this.setObstacleToFindWay();
}
Map.prototype.getGrid = function() {
    return this.grid;
}
Map.prototype.verifyMovePossible = function(index) {
    if (!this.grid[index]) return false;
    var objID = this.grid[index].objID;
    return this.DEFINE[objID].movePossible;
}
Map.prototype.verifyClientLocationMovePossible = function(index) {
    if (this.findway.obstacleList[index]) return false;
    return true;
}
Map.prototype.setObstacleToFindWay = function() {
    var xy;
    for (var index in this.grid) {
        if (this.verifyMovePossible(index)) continue;
        xy = fc.getCoordinateXY(index);
        for (var l = 0; l < this.grid[index].l; ++l) {
            for (var w = 0; w < this.grid[index].w; ++w) {
                this.findway.setObstacle(xy.x + l, xy.y + w);
            }
        }
    }
}
Map.prototype.getObstableList = function() {
    return this.findway.getObstacleList(); 
}
Map.prototype.getWay = function(startPoint, endPoint) {
    var startXY = fc.getCoordinateXY(startPoint);
    var endXY = fc.getCoordinateXY(endPoint);
    this.findway.reset();
    this.findway.setStart(startXY.x, startXY.y);
    this.findway.setEnd(endXY.x, endXY.y);
    return this.findway.getWay();
}
