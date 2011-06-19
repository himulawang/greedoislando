var findway = require('./map_findway');

var map = function() {
    this.GI_GRID_QUANTITY = GI_GRID_QUANTITY;
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
        "0,0":{
            "x":0,
            "y":0,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "0,6":{
            "x":0,
            "y":6,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "0,12":{
            "x":0,
            "y":12,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "0,18":{
            "x":0,
            "y":18,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "0,24":{
            "x":0,
            "y":24,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "0,30":{
            "x":0,
            "y":30,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "12,30":{
            "x":12,
            "y":30,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "18,30":{
            "x":18,
            "y":30,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "24,30":{
            "x":24,
            "y":30,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "30,30":{
            "x":30,
            "y":30,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "30,18":{
            "x":30,
            "y":18,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "30,12":{
            "x":30,
            "y":12,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "30,6":{
            "x":30,
            "y":6,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "30,0":{
            "x":30,
            "y":0,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "24,0":{
            "x":24,
            "y":0,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "18,0":{
            "x":18,
            "y":0,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "12,0":{
            "x":12,
            "y":0,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "6,0":{
            "x":6,
            "y":0,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "24,42":{
            "x":24,
            "y":42,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "30,42":{
            "x":30,
            "y":42,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "24,48":{
            "x":24,
            "y":48,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "24,54":{
            "x":24,
            "y":54,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "24,60":{
            "x":24,
            "y":60,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "30,60":{
            "x":30,
            "y":60,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "36,60":{
            "x":36,
            "y":60,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "48,60":{
            "x":48,
            "y":60,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "54,60":{
            "x":54,
            "y":60,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "60,60":{
            "x":60,
            "y":60,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "66,60":{
            "x":66,
            "y":60,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "66,54":{
            "x":66,
            "y":54,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "66,48":{
            "x":66,
            "y":48,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "36,42":{
            "x":36,
            "y":42,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "42,42":{
            "x":42,
            "y":42,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "54,42":{
            "x":54,
            "y":42,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "60,42":{
            "x":60,
            "y":42,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "66,42":{
            "x":66,
            "y":42,
            "objID":"2001",
            "l":"6",
            "w":"6"
        },
        "42,60":{
            "x":42,
            "y":60,
            "objID":"2003",
            "l":"6",
            "w":"6"
        },
        "48,42":{
            "x":48,
            "y":42,
            "objID":"2003",
            "l":"6",
            "w":"6"
        },
        "6,30":{
            "x":6,
            "y":30,
            "objID":"2003",
            "l":"6",
            "w":"6"
        },
        "30,24":{
            "x":30,
            "y":24,
            "objID":"2003",
            "l":"6",
            "w":"6"
        },
        "30,48":{
            "x":30,
            "y":48,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "30,54":{
            "x":30,
            "y":54,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "36,54":{
            "x":36,
            "y":54,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "36,48":{
            "x":36,
            "y":48,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "42,48":{
            "x":42,
            "y":48,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "48,48":{
            "x":48,
            "y":48,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "42,54":{
            "x":42,
            "y":54,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "48,54":{
            "x":48,
            "y":54,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "54,54":{
            "x":54,
            "y":54,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "54,48":{
            "x":54,
            "y":48,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "60,48":{
            "x":60,
            "y":48,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "60,54":{
            "x":60,
            "y":54,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "6,6":{
            "x":6,
            "y":6,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "6,12":{
            "x":6,
            "y":12,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "6,18":{
            "x":6,
            "y":18,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "6,24":{
            "x":6,
            "y":24,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "12,24":{
            "x":12,
            "y":24,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "18,24":{
            "x":18,
            "y":24,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "24,24":{
            "x":24,
            "y":24,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "12,18":{
            "x":12,
            "y":18,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "12,12":{
            "x":12,
            "y":12,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "12,6":{
            "x":12,
            "y":6,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "18,6":{
            "x":18,
            "y":6,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "18,12":{
            "x":18,
            "y":12,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "18,18":{
            "x":18,
            "y":18,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "24,18":{
            "x":24,
            "y":18,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "24,12":{
            "x":24,
            "y":12,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "24,6":{
            "x":24,
            "y":6,
            "objID":"2005",
            "l":"6",
            "w":"6"
        },
        "36,66":{
            "x":36,
            "y":66,
            "objID":"2004",
            "l":"6",
            "w":"6"
        },
        "36,72":{
            "x":36,
            "y":72,
            "objID":"2004",
            "l":"6",
            "w":"6"
        },
        "36,78":{
            "x":36,
            "y":78,
            "objID":"2004",
            "l":"6",
            "w":"6"
        },
        "36,84":{
            "x":36,
            "y":84,
            "objID":"2004",
            "l":"6",
            "w":"6"
        },
        "36,90":{
            "x":36,
            "y":90,
            "objID":"2004",
            "l":"6",
            "w":"6"
        },
        "72,42":{
            "x":72,
            "y":42,
            "objID":"2004",
            "l":"6",
            "w":"6"
        },
        "84,42":{
            "x":84,
            "y":42,
            "objID":"2004",
            "l":"6",
            "w":"6"
        },
        "90,42":{
            "x":90,
            "y":42,
            "objID":"2004",
            "l":"6",
            "w":"6"
        },
        "78,42":{
            "x":78,
            "y":42,
            "objID":"2006",
            "l":"6",
            "w":"6"
        },
        "0,42":{
            "x":0,
            "y":42,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "0,48":{
            "x":0,
            "y":48,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "6,42":{
            "x":6,
            "y":42,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "6,72":{
            "x":6,
            "y":72,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "6,78":{
            "x":6,
            "y":78,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "12,78":{
            "x":12,
            "y":78,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "12,84":{
            "x":12,
            "y":84,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "48,84":{
            "x":48,
            "y":84,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "54,90":{
            "x":54,
            "y":90,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "66,72":{
            "x":66,
            "y":72,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "72,72":{
            "x":72,
            "y":72,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "78,66":{
            "x":78,
            "y":66,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "78,60":{
            "x":78,
            "y":60,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "72,84":{
            "x":72,
            "y":84,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "78,84":{
            "x":78,
            "y":84,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "84,78":{
            "x":84,
            "y":78,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "36,18":{
            "x":36,
            "y":18,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "42,30":{
            "x":42,
            "y":30,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "48,6":{
            "x":48,
            "y":6,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "54,6":{
            "x":54,
            "y":6,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "66,0":{
            "x":66,
            "y":0,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "60,12":{
            "x":60,
            "y":12,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "54,18":{
            "x":54,
            "y":18,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "60,18":{
            "x":60,
            "y":18,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "78,12":{
            "x":78,
            "y":12,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "78,18":{
            "x":78,
            "y":18,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "84,18":{
            "x":84,
            "y":18,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "84,12":{
            "x":84,
            "y":12,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "66,36":{
            "x":66,
            "y":36,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "72,36":{
            "x":72,
            "y":36,
            "objID":"2002",
            "l":"6",
            "w":"6"
        },
        "72,30":{
            "x":72,
            "y":30,
            "objID":"2002",
            "l":"6",
            "w":"6"
        }
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
map.prototype.verifyClientLocationMovePossible = function(index) {
    if (this.findway.obstacleList[index]) return false;
    return true;
}
map.prototype.setObstacleToFindWay = function() {
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
map.prototype.getObstableList = function() {
    return this.findway.getObstacleList(); 
}
map.prototype.getWay = function(startPoint, endPoint) {
    var startXY = fc.getCoordinateXY(startPoint);
    var endXY = fc.getCoordinateXY(endPoint);
    this.findway.reset();
    this.findway.setStart(startXY.x, startXY.y);
    this.findway.setEnd(endXY.x, endXY.y);
    return this.findway.getWay();
}
map.prototype.getRange = function(a, b) {
    var aXY = fc.getCoordinateXY(a);
    var bXY = fc.getCoordinateXY(b);
    var deltaX = Math.abs(aXY.x - bXY.x);
    var deltaY = Math.abs(aXY.y - bXY.y);
    return Math.round(Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)));
}
map.prototype.getDirection = function(endPoint, startPoint) {
    var startXY = fc.getCoordinateXY(startPoint);
    var endXY = fc.getCoordinateXY(endPoint);
    if (startXY.x === endXY.x && startXY.y > endXY.y) {
        return 0;
    } else if (startXY.x === endXY.x && startXY.y < endXY.y) {
        return 4;
    } else if (startXY.y === endXY.y && startXY.x > endXY.x) {
        return 6;
    } else if (startXY.y === endXY.y && startXY.x < endXY.x) {
        return 2;
    } else if (startXY.x > endXY.x && startXY.y > endXY.y) {
        return 7;
    } else if (startXY.x < endXY.x && startXY.y > endXY.y) {
        return 1;
    } else if (startXY.x > endXY.x && startXY.y < endXY.y) {
        return 5;
    } else if (startXY.x < endXY.x && startXY.y < endXY.y) {
        return 3;
    }
}
map.prototype.getLineCoordinateWithoutObstacle = function(startPoint, direction, range) {
    var line = [];
    var startPointXY = fc.getCoordinateXY(startPoint);
    var tmpXY = startPointXY;
    if (direction === 0) {
        for (var i = 0; i < range; ++i) {
            line.push(fc.getCoordinateIndex(tmpXY.x, ++tmpXY.y));
        }
    } else if (direction === 4) {
        for (var i = 0; i < range; ++i) {
            line.push(fc.getCoordinateIndex(tmpXY.x, --tmpXY.y));
        }
    } else if (direction === 6) {
        for (var i = 0; i < range; ++i) {
            line.push(fc.getCoordinateIndex(++tmpXY.x, tmpXY.y));
        }
    } else if (direction === 2) {
        for (var i = 0; i < range; ++i) {
            line.push(fc.getCoordinateIndex(--tmpXY.x, tmpXY.y));
        }
    } else if (direction === 7) {
        for (var i = 0; i < range; ++i) {
            line.push(fc.getCoordinateIndex(++tmpXY.x, ++tmpXY.y));
        }
    } else if (direction === 1) {
        for (var i = 0; i < range; ++i) {
            line.push(fc.getCoordinateIndex(--tmpXY.x, ++tmpXY.y));
        }
    } else if (direction === 5) {
        for (var i = 0; i < range; ++i) {
            line.push(fc.getCoordinateIndex(++tmpXY.x, --tmpXY.y));
        }
    } else if (direction === 3) {
        for (var i = 0; i < range; ++i) {
            line.push(fc.getCoordinateIndex(--tmpXY.x, --tmpXY.y));
        }
    }

    var obstacleList = this.getObstableList();
    var validLine = [];

    for (var x in line) {
        if (obstacleList[line[x]]) {
            return validLine;
        } else {
            validLine.push(line[x]);
        }
    }
    return validLine;
}
