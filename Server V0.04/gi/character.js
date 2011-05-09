var fc = require('../lib/facility');
var CONSTANT = require('./constant').create();

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
    this.x = fc.random(15);
    this.y = fc.random(15);
    this.position = fc.getCoordinateIndex(this.x, this.y);
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
    if (this.wayIndex >= this.way.length) {
        this.characterMoving = false;
        this.nextXY = null;
        this.moveTimeout = null;
        this.way = null;
        this.nextGridIndex = null;
        return;
    }
    var _this = this;
    this.characterMoving = true;
    //get move one grid start coordinate and end coordinate
    this.nextGridIndex = this.way[this.wayIndex];
    this.nextXY = fc.getCoordinateXY(this.nextGridIndex);

    var time = CONSTANT.GI_CHARACTER_MOVING_SPEED;
    this.directionID = this.getTowardNewGridDirection(this.nextXY.x, this.nextXY.y);
    if (this.directionID % 2 === 1) {
        time *= 1.4;
    }

    this.moveTimeout = setTimeout(function(){
        _this.x = _this.nextXY.x;
        _this.y = _this.nextXY.y;
        _this.position = _this.nextGridIndex;
        console.log(_this.position);

        if (_this.setNewDestinationTrigger) {
            _this.setNewDestinationTrigger = false;
            _this.startWay();
            return;
        }

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
/*
character.prototype.getWayEndPoint = function(x, y) {
    if (this.way === null) return null;
    return this.way[this.way.length - 1];
}
*/
exports.create = function(object) {
    return new character(object.cID, object.character);
}
