global.calc = {}

calc.prototype.getRange = function(a, b) {
    var aXY = fc.getCoordinateXY(a);
    var bXY = fc.getCoordinateXY(b);
    var deltaX = Math.abs(aXY.x - bXY.x);
    var deltaY = Math.abs(aXY.y - bXY.y);
    return Math.round(Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)));
}
calc.prototype.getDirection = function(endPoint, startPoint) {
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
calc.prototype.getLineCoordinateWithoutObstacle = function(startPoint, direction, range) {
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
calc.prototype.getDirectRoute = function(start, end) {
    var startXY = fc.getCoordinateXY(start);
    var endXY = fc.getCoordinateXY(end);
    var nowXY = fc.getCoordinateXY(start);
    var route = [];
    var steps = Math.abs(startXY.x - endXY.x) > Math.abs(startXY.y - endXY.y) ? Math.abs(startXY.x - endXY.x) : Math.abs(startXY.y - endXY.y);
    if (startXY.x >= endXY.x && startXY.y > endXY.y) {
        for (var i = 0; i < steps; ++i) {
            if (nowXY.x > endXY.x) --nowXY.x;
            if (nowXY.y > endXY.y) --nowXY.y;
            route.push(fc.getCoordinateIndex(nowXY.x, nowXY.y));
        }
    } else if (startXY.x >= endXY.x && startXY.y < endXY.y) {
        for (var i = 0; i < steps; ++i) {
            if (nowXY.x > endXY.x) --nowXY.x;
            if (nowXY.y < endXY.y) ++nowXY.y;
            route.push(fc.getCoordinateIndex(nowXY.x, nowXY.y));
        }
    } else if (startXY.x < endXY.x && startXY.y >= endXY.y) {
        for (var i = 0; i < steps; ++i) {
            if (nowXY.x < endXY.x) ++nowXY.x;
            if (nowXY.y > endXY.y) --nowXY.y;
            route.push(fc.getCoordinateIndex(nowXY.x, nowXY.y));
        }
    } else if (startXY.x < endXY.x && startXY.y <= endXY.y) {
        for (var i = 0; i < steps; ++i) {
            if (nowXY.x < endXY.x) ++nowXY.x;
            if (nowXY.y < endXY.y) ++nowXY.y;
            route.push(fc.getCoordinateIndex(nowXY.x, nowXY.y));
        }
    }

    var obstacleList = this.getObstableList();
    var validLine = [];

    for (var x in route) {
        if (obstacleList[route[x]]) {
            return validLine;
        } else {
            validLine.push(route[x]);
        }
    }
    return validLine;
}
