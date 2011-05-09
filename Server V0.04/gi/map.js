var findway = require('./map_findway');
var fc = require('../lib/facility');
var constant = require('./constant').create();

var map = function() {
    this.GI_GRID_QUANTITY = constant;
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
    this.grid = {
        // x = 0
         '0,0' : {objID : 2001, x : 0, y : 0}
        ,'1,0' : {objID : 2001, x : 1, y : 0}
        ,'2,0' : {objID : 2001, x : 2, y : 0}
        ,'3,0' : {objID : 2001, x : 3, y : 0}
        ,'4,0' : {objID : 2001, x : 4, y : 0}
        ,'5,0' : {objID : 2001, x : 5, y : 0}
        ,'6,0' : {objID : 2000, x : 6, y : 0}
        ,'7,0' : {objID : 2000, x : 7, y : 0}
        ,'8,0' : {objID : 2000, x : 8, y : 0}
        ,'9,0' : {objID : 2000, x : 9, y : 0}
        ,'10,0' : {objID : 2000, x : 10, y : 0}
        ,'11,0' : {objID : 2002, x : 11, y : 0}
        ,'12,0' : {objID : 2000, x : 12, y : 0}
        ,'13,0' : {objID : 2000, x : 13, y : 0}
        ,'14,0' : {objID : 2000, x : 14, y : 0}
        ,'15,0' : {objID : 2000, x : 15, y : 0}
        // x = 1
        ,'0,1' : {objID : 2001, x : 0, y : 1}
        ,'1,1' : {objID : 2005, x : 1, y : 1}
        ,'2,1' : {objID : 2005, x : 2, y : 1}
        ,'3,1' : {objID : 2005, x : 3, y : 1}
        ,'4,1' : {objID : 2005, x : 4, y : 1}
        ,'5,1' : {objID : 2001, x : 5, y : 1}
        ,'6,1' : {objID : 2000, x : 6, y : 1}
        ,'7,1' : {objID : 2000, x : 7, y : 1}
        ,'8,1' : {objID : 2002, x : 8, y : 1}
        ,'9,1' : {objID : 2002, x : 9, y : 1}
        ,'10,1' : {objID : 2000, x : 10, y : 1}
        ,'11,1' : {objID : 2000, x : 11, y : 1}
        ,'12,1' : {objID : 2000, x : 12, y : 1}
        ,'13,1' : {objID : 2000, x : 13, y : 1}
        ,'14,1' : {objID : 2000, x : 14, y : 1}
        ,'15,1' : {objID : 2000, x : 15, y : 1}
        // x = 2
        ,'0,2' : {objID : 2001, x : 0, y : 2}
        ,'1,2' : {objID : 2005, x : 1, y : 2}
        ,'2,2' : {objID : 2005, x : 2, y : 2}
        ,'3,2' : {objID : 2005, x : 3, y : 2}
        ,'4,2' : {objID : 2005, x : 4, y : 2}
        ,'5,2' : {objID : 2001, x : 5, y : 2}
        ,'6,2' : {objID : 2000, x : 6, y : 2}
        ,'7,2' : {objID : 2000, x : 7, y : 2}
        ,'8,2' : {objID : 2000, x : 8, y : 2}
        ,'9,2' : {objID : 2000, x : 9, y : 2}
        ,'10,2' : {objID : 2002, x : 10, y : 2}
        ,'11,2' : {objID : 2000, x : 11, y : 2}
        ,'12,2' : {objID : 2000, x : 12, y : 2}
        ,'13,2' : {objID : 2002, x : 13, y : 2}
        ,'14,2' : {objID : 2002, x : 14, y : 2}
        ,'15,2' : {objID : 2000, x : 15, y : 2}
        // x = 3
        ,'0,3' : {objID : 2001, x : 0, y : 3}
        ,'1,3' : {objID : 2005, x : 1, y : 3}
        ,'2,3' : {objID : 2005, x : 2, y : 3}
        ,'3,3' : {objID : 2005, x : 3, y : 3}
        ,'4,3' : {objID : 2005, x : 4, y : 3}
        ,'5,3' : {objID : 2001, x : 5, y : 3}
        ,'6,3' : {objID : 2002, x : 6, y : 3}
        ,'7,3' : {objID : 2000, x : 7, y : 3}
        ,'8,3' : {objID : 2000, x : 8, y : 3}
        ,'9,3' : {objID : 2002, x : 9, y : 3}
        ,'10,3' : {objID : 2002, x : 10, y : 3}
        ,'11,3' : {objID : 2000, x : 11, y : 3}
        ,'12,3' : {objID : 2000, x : 12, y : 3}
        ,'13,3' : {objID : 2002, x : 13, y : 3}
        ,'14,3' : {objID : 2002, x : 14, y : 3}
        ,'15,3' : {objID : 2000, x : 15, y : 3}
        // x = 4
        ,'0,4' : {objID : 2001, x : 0, y : 4}
        ,'1,4' : {objID : 2005, x : 1, y : 4}
        ,'2,4' : {objID : 2005, x : 2, y : 4}
        ,'3,4' : {objID : 2005, x : 3, y : 4}
        ,'4,4' : {objID : 2005, x : 4, y : 4}
        ,'5,4' : {objID : 2003, x : 5, y : 4}
        ,'6,4' : {objID : 2000, x : 6, y : 4}
        ,'7,4' : {objID : 2000, x : 7, y : 4}
        ,'8,4' : {objID : 2000, x : 8, y : 4}
        ,'9,4' : {objID : 2000, x : 9, y : 4}
        ,'10,4' : {objID : 2000, x : 10, y : 4}
        ,'11,4' : {objID : 2000, x : 11, y : 4}
        ,'12,4' : {objID : 2000, x : 12, y : 4}
        ,'13,4' : {objID : 2000, x : 13, y : 4}
        ,'14,4' : {objID : 2000, x : 14, y : 4}
        ,'15,4' : {objID : 2000, x : 15, y : 4}
        // x = 5
        ,'0,5' : {objID : 2001, x : 0, y : 5}
        ,'1,5' : {objID : 2003, x : 1, y : 5}
        ,'2,5' : {objID : 2001, x : 2, y : 5}
        ,'3,5' : {objID : 2001, x : 3, y : 5}
        ,'4,5' : {objID : 2001, x : 4, y : 5}
        ,'5,5' : {objID : 2001, x : 5, y : 5}
        ,'6,5' : {objID : 2000, x : 6, y : 5}
        ,'7,5' : {objID : 2002, x : 7, y : 5}
        ,'8,5' : {objID : 2000, x : 8, y : 5}
        ,'9,5' : {objID : 2000, x : 9, y : 5}
        ,'10,5' : {objID : 2000, x : 10, y : 5}
        ,'11,5' : {objID : 2000, x : 11, y : 5}
        ,'12,5' : {objID : 2002, x : 12, y : 5}
        ,'13,5' : {objID : 2000, x : 13, y : 5}
        ,'14,5' : {objID : 2000, x : 14, y : 5}
        ,'15,5' : {objID : 2000, x : 15, y : 5}
        // x = 6
        ,'0,6' : {objID : 2000, x : 0, y : 6}
        ,'1,6' : {objID : 2000, x : 1, y : 6}
        ,'2,6' : {objID : 2000, x : 2, y : 6}
        ,'3,6' : {objID : 2000, x : 3, y : 6}
        ,'4,6' : {objID : 2000, x : 4, y : 6}
        ,'5,6' : {objID : 2000, x : 5, y : 6}
        ,'6,6' : {objID : 2000, x : 6, y : 6}
        ,'7,6' : {objID : 2000, x : 7, y : 6}
        ,'8,6' : {objID : 2000, x : 8, y : 6}
        ,'9,6' : {objID : 2000, x : 9, y : 6}
        ,'10,6' : {objID : 2000, x : 10, y : 6}
        ,'11,6' : {objID : 2002, x : 11, y : 6}
        ,'12,6' : {objID : 2002, x : 12, y : 6}
        ,'13,6' : {objID : 2000, x : 13, y : 6}
        ,'14,6' : {objID : 2000, x : 14, y : 6}
        ,'15,6' : {objID : 2000, x : 15, y : 6}
        // x = 7
        ,'0,7' : {objID : 2002, x : 0, y : 7}
        ,'1,7' : {objID : 2002, x : 1, y : 7}
        ,'2,7' : {objID : 2000, x : 2, y : 7}
        ,'3,7' : {objID : 2000, x : 3, y : 7}
        ,'4,7' : {objID : 2001, x : 4, y : 7}
        ,'5,7' : {objID : 2001, x : 5, y : 7}
        ,'6,7' : {objID : 2001, x : 6, y : 7}
        ,'7,7' : {objID : 2001, x : 7, y : 7}
        ,'8,7' : {objID : 2003, x : 8, y : 7}
        ,'9,7' : {objID : 2001, x : 9, y : 7}
        ,'10,7' : {objID : 2001, x : 10, y : 7}
        ,'11,7' : {objID : 2001, x : 11, y : 7}
        ,'12,7' : {objID : 2004, x : 12, y : 7}
        ,'13,7' : {objID : 2006, x : 13, y : 7}
        ,'14,7' : {objID : 2004, x : 14, y : 7}
        ,'15,7' : {objID : 2004, x : 15, y : 7}
        // x = 8
        ,'0,8' : {objID : 2002, x : 0, y : 8}
        ,'1,8' : {objID : 2000, x : 1, y : 8}
        ,'2,8' : {objID : 2000, x : 2, y : 8}
        ,'3,8' : {objID : 2000, x : 3, y : 8}
        ,'4,8' : {objID : 2001, x : 4, y : 8}
        ,'5,8' : {objID : 2005, x : 5, y : 8}
        ,'6,8' : {objID : 2005, x : 6, y : 8}
        ,'7,8' : {objID : 2005, x : 7, y : 8}
        ,'8,8' : {objID : 2005, x : 8, y : 8}
        ,'9,8' : {objID : 2005, x : 9, y : 8}
        ,'10,8' : {objID : 2005, x : 10, y : 8}
        ,'11,8' : {objID : 2001, x : 11, y : 8}
        ,'12,8' : {objID : 2000, x : 12, y : 8}
        ,'13,8' : {objID : 2000, x : 13, y : 8}
        ,'14,8' : {objID : 2000, x : 14, y : 8}
        ,'15,8' : {objID : 2000, x : 15, y : 8}
        // x = 9
        ,'0,9' : {objID : 2000, x : 0, y : 9}
        ,'1,9' : {objID : 2000, x : 1, y : 9}
        ,'2,9' : {objID : 2000, x : 2, y : 9}
        ,'3,9' : {objID : 2000, x : 3, y : 9}
        ,'4,9' : {objID : 2001, x : 4, y : 9}
        ,'5,9' : {objID : 2005, x : 5, y : 9}
        ,'6,9' : {objID : 2005, x : 6, y : 9}
        ,'7,9' : {objID : 2005, x : 7, y : 9}
        ,'8,9' : {objID : 2005, x : 8, y : 9}
        ,'9,9' : {objID : 2005, x : 9, y : 9}
        ,'10,9' : {objID : 2005, x : 10, y : 9}
        ,'11,9' : {objID : 2001, x : 11, y : 9}
        ,'12,9' : {objID : 2000, x : 12, y : 9}
        ,'13,9' : {objID : 2000, x : 13, y : 9}
        ,'14,9' : {objID : 2000, x : 14, y : 9}
        ,'15,9' : {objID : 2000, x : 15, y : 9}
        // x = 10
        ,'0,10' : {objID : 2000, x : 0, y : 10}
        ,'1,10' : {objID : 2000, x : 1, y : 10}
        ,'2,10' : {objID : 2000, x : 2, y : 10}
        ,'3,10' : {objID : 2000, x : 3, y : 10}
        ,'4,10' : {objID : 2001, x : 4, y : 10}
        ,'5,10' : {objID : 2001, x : 5, y : 10}
        ,'6,10' : {objID : 2001, x : 6, y : 10}
        ,'7,10' : {objID : 2003, x : 7, y : 10}
        ,'8,10' : {objID : 2001, x : 8, y : 10}
        ,'9,10' : {objID : 2001, x : 9, y : 10}
        ,'10,10' : {objID : 2001, x : 10, y : 10}
        ,'11,10' : {objID : 2001, x : 11, y : 10}
        ,'12,10' : {objID : 2000, x : 12, y : 10}
        ,'13,10' : {objID : 2002, x : 13, y : 10}
        ,'14,10' : {objID : 2000, x : 14, y : 10}
        ,'15,10' : {objID : 2000, x : 15, y : 10}
        // x = 11
        ,'0,11' : {objID : 2000, x : 0, y : 11}
        ,'1,11' : {objID : 2000, x : 1, y : 11}
        ,'2,11' : {objID : 2000, x : 2, y : 11}
        ,'3,11' : {objID : 2000, x : 3, y : 11}
        ,'4,11' : {objID : 2000, x : 4, y : 11}
        ,'5,11' : {objID : 2000, x : 5, y : 11}
        ,'6,11' : {objID : 2004, x : 6, y : 11}
        ,'7,11' : {objID : 2000, x : 7, y : 11}
        ,'8,11' : {objID : 2000, x : 8, y : 11}
        ,'9,11' : {objID : 2000, x : 9, y : 11}
        ,'10,11' : {objID : 2000, x : 10, y : 11}
        ,'11,11' : {objID : 2000, x : 11, y : 11}
        ,'12,11' : {objID : 2000, x : 12, y : 11}
        ,'13,11' : {objID : 2002, x : 13, y : 11}
        ,'14,11' : {objID : 2000, x : 14, y : 11}
        ,'15,11' : {objID : 2000, x : 15, y : 11}
        // x = 12
        ,'0,12' : {objID : 2000, x : 0, y : 12}
        ,'1,12' : {objID : 2002, x : 1, y : 12}
        ,'2,12' : {objID : 2000, x : 2, y : 12}
        ,'3,12' : {objID : 2000, x : 3, y : 12}
        ,'4,12' : {objID : 2000, x : 4, y : 12}
        ,'5,12' : {objID : 2000, x : 5, y : 12}
        ,'6,12' : {objID : 2004, x : 6, y : 12}
        ,'7,12' : {objID : 2000, x : 7, y : 12}
        ,'8,12' : {objID : 2000, x : 8, y : 12}
        ,'9,12' : {objID : 2000, x : 9, y : 12}
        ,'10,12' : {objID : 2000, x : 10, y : 12}
        ,'11,12' : {objID : 2002, x : 11, y : 12}
        ,'12,12' : {objID : 2002, x : 12, y : 12}
        ,'13,12' : {objID : 2000, x : 13, y : 12}
        ,'14,12' : {objID : 2000, x : 14, y : 12}
        ,'15,12' : {objID : 2000, x : 15, y : 12}
        // x = 13
        ,'0,13' : {objID : 2000, x : 0, y : 13}
        ,'1,13' : {objID : 2002, x : 1, y : 13}
        ,'2,13' : {objID : 2002, x : 2, y : 13}
        ,'3,13' : {objID : 2000, x : 3, y : 13}
        ,'4,13' : {objID : 2000, x : 4, y : 13}
        ,'5,13' : {objID : 2000, x : 5, y : 13}
        ,'6,13' : {objID : 2004, x : 6, y : 13}
        ,'7,13' : {objID : 2000, x : 7, y : 13}
        ,'8,13' : {objID : 2000, x : 8, y : 13}
        ,'9,13' : {objID : 2000, x : 9, y : 13}
        ,'10,13' : {objID : 2000, x : 10, y : 13}
        ,'11,13' : {objID : 2000, x : 11, y : 13}
        ,'12,13' : {objID : 2000, x : 12, y : 13}
        ,'13,13' : {objID : 2000, x : 13, y : 13}
        ,'14,13' : {objID : 2002, x : 14, y : 13}
        ,'15,13' : {objID : 2000, x : 15, y : 13}
        // x = 14
        ,'0,14' : {objID : 2000, x : 0, y : 14}
        ,'1,14' : {objID : 2000, x : 1, y : 14}
        ,'2,14' : {objID : 2002, x : 2, y : 14}
        ,'3,14' : {objID : 2000, x : 3, y : 14}
        ,'4,14' : {objID : 2000, x : 4, y : 14}
        ,'5,14' : {objID : 2000, x : 5, y : 14}
        ,'6,14' : {objID : 2004, x : 6, y : 14}
        ,'7,14' : {objID : 2000, x : 7, y : 14}
        ,'8,14' : {objID : 2002, x : 8, y : 14}
        ,'9,14' : {objID : 2000, x : 9, y : 14}
        ,'10,14' : {objID : 2000, x : 10, y : 14}
        ,'11,14' : {objID : 2000, x : 11, y : 14}
        ,'12,14' : {objID : 2002, x : 12, y : 14}
        ,'13,14' : {objID : 2002, x : 13, y : 14}
        ,'14,14' : {objID : 2000, x : 14, y : 14}
        ,'15,14' : {objID : 2000, x : 15, y : 14}
        // x = 15
        ,'0,15' : {objID : 2000, x : 0, y : 15}
        ,'1,15' : {objID : 2000, x : 1, y : 15}
        ,'2,15' : {objID : 2000, x : 2, y : 15}
        ,'3,15' : {objID : 2000, x : 3, y : 15}
        ,'4,15' : {objID : 2000, x : 4, y : 15}
        ,'5,15' : {objID : 2000, x : 5, y : 15}
        ,'6,15' : {objID : 2004, x : 6, y : 15}
        ,'7,15' : {objID : 2000, x : 7, y : 15}
        ,'8,15' : {objID : 2000, x : 8, y : 15}
        ,'9,15' : {objID : 2002, x : 9, y : 15}
        ,'10,15' : {objID : 2000, x : 10, y : 15}
        ,'11,15' : {objID : 2000, x : 11, y : 15}
        ,'12,15' : {objID : 2000, x : 12, y : 15}
        ,'13,15' : {objID : 2000, x : 13, y : 15}
        ,'14,15' : {objID : 2000, x : 14, y : 15}
        ,'15,15' : {objID : 2000, x : 15, y : 15}
    }
    this.findway = findway.create();
    this.setObstacleToFindWay();
}

exports.create = function() {
    return new map();
}

map.prototype.getGrid = function() {
    return this.grid;
}
map.prototype.verifyMovePossible = function(index) {
    if (!this.grid[index]) return false;
    var objID = this.grid[index].objID;

    return this.DEFINE[objID].movePossible;
}
map.prototype.setObstacleToFindWay = function() {
    var xy;
    for (var index in this.grid) {
        if (this.verifyMovePossible(index)) continue;
        xy = fc.getCoordinateXY(index);
        this.findway.setObstacle(xy.x, xy.y);
    }
}
map.prototype.getWay = function(startPoint, endPoint) {
    var startXY = fc.getCoordinateXY(startPoint);
    var endXY = fc.getCoordinateXY(endPoint);
    this.findway.reset();
    this.findway.setStart(startXY.x, startXY.y);
    this.findway.setEnd(endXY.x, endXY.y);
    return this.findway.getWay();
}
