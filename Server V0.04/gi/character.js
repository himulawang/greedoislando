var io = require('./io');

var character = function(cID, name) {
    /* 500 UpRight
     * 501 DownRight
     * 502 DownLeft
     * 503 UpLeft
     * */
    this.DIRECTIONS = {
        //deltaX,deltaY
        '0,-1' : 0
        ,'1,-1' : 1
        ,'1,0' : 2
        ,'1,1' : 3
        ,'0,1' : 4
        ,'-1,1' : 5
        ,'-1,0' : 6
        ,'-1,-1' : 7
    };    
    this.cID = cID;
    this.name = name;
    this.life = 100;
    this.maxLife = 100;
    this.force = 20;
    this.maxForce = 20;
    this.speed = 2;
    do {
        this.x = 12;
        this.y = 6;
        this.position = fc.getCoordinateIndex(this.x, this.y);
        if (giMap.verifyMovePossible(this.position)) break;
    } while (1);
    
    this.characterMoving = false;
    this.nextXY = null;
    this.way = null;
    this.nextGridIndex = null;
}

character.prototype.getInfo = function() {
    return {
        cID : this.cID
        ,name : this.name
        ,life : this.life
        ,maxLife : this.maxLife
        ,force : this.force
        ,maxForce : this.maxForce
        ,speed : this.speed
        ,position : this.position
        ,x : this.x
        ,y : this.y
        ,timestamp : fc.getTimestamp()
    }
}
character.prototype.getCID = function() {
    return this.cID;
}
character.prototype.getLocation = function() {
    return this.position;
}
character.prototype.setLocation = function(index) {
    this.position = index;
    var xy = fc.getCoordinateXY(index);
    this.x = xy.x;
    this.y = xy.y;
}
character.prototype.setWay = function(way) {
    this.way = way;
}
character.prototype.getWay = function(getWay) {
    return this.way;
}
character.prototype.startWay = function() {
    this.wayIndex = 0;
    this.moveWay();
}
character.prototype.moveWay = function() {
    var cID = this.getCID();
    var stream = io.create();
    stream.setSelfCID(cID);
    if (this.wayIndex >= this.way.length) {
        this.characterMoving = false;
        this.nextXY = null;
        this.moveTimeout = null;
        this.way = null;
        this.nextGridIndex = null;
        stream.addOutputData(cID, 'characterStand', 'all', {cID : cID, timestamp : fc.getTimestamp(), nowLocation : this.position });
        stream.response();
        
        return;
    }
    var _this = this;
    this.characterMoving = true;

    //get move one grid start coordinate and end coordinate
    this.nextGridIndex = this.way[this.wayIndex];
    this.nextXY = fc.getCoordinateXY(this.nextGridIndex);

    var time = GI_CHARACTER_MOVING_SPEED;
    this.directionID = this.getTowardNewGridDirection(this.nextXY.x, this.nextXY.y);
    if (this.directionID % 2 === 1) {
        time *= 1.4;
    }

    //moveCharacter -> Other
    stream.addOutputData(cID, 'moveCharacter', 'all', {cID : cID, nowLocation : this.position, nextLocation : this.nextGridIndex, duration : time, timestamp : fc.getTimestamp() });
    stream.response();

    this.moveTimeout = setTimeout(function(){
        if (_this.setNewDestinationTrigger) {
            _this.setNewDestinationTrigger = false;
            _this.startWay();
            return;
        }

        _this.setLocation(_this.nextGridIndex);

        ++_this.wayIndex;
        _this.moveWay();
    }, time);
}
character.prototype.getTowardNewGridDirection = function(x, y) {
    var deltaX = x - this.x;
    var deltaY = y - this.y;
    var deltaIndex = fc.getCoordinateIndex(deltaX, deltaY);
    return this.DIRECTIONS[deltaIndex];
}
exports.create = function(cID, name) {
    return new character(cID, name);
}
