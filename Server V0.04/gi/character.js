var fc = require('../lib/facility');

var character = function(cID, name) {
    /* 500 UpRight
     * 501 DownRight
     * 502 DownLeft
     * 503 UpLeft
     * */
    this.cID = cID;
    this.name = name;
    this.life = 100;
    this.maxLife = 100;
    this.force = 20;
    this.maxForce = 20;
    this.speed = 2;
    this.x = fc.random(15);
    this.y = fc.random(15);
    this.position = fc.getPositionIndex(this.x, this.y);
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
exports.create = function(object) {
    return new character(object.cID, object.character);
}

////////////////////
exports.newCharacterLogin = function(object, GI_CHARACTER) {
    var cID = object.cID
    return {
        cID : cID
        ,type : 'newCharacterLogin'
        ,data : GI_CHARACTER[cID]
    };
}

exports.getOnlineCharacter = function(object, GI_CHARACTER) {
    var cID = object.cID;
    var data = [];
    var i;
    for (i in GI_CHARACTER) {
        if (i === cID) continue;
        data.push(GI_CHARACTER[i]);
    }
    return {
        cID : cID
        ,type : 'getOnlineCharacter'
        ,data : data
    }
}

exports.moveCharacter = function(object, GI_CHARACTER, GI_MAP) {
    var cID = object.cID;
    var startPoint = object.startPoint;
    var endPoint = object.endPoint;
    var char = GI_CHARACTER[cID];


    verify = 1;
    /*
    verify = verify
        && verifyPointMovePossible(startPoint, GI_MAP)
        && verifyPointMovePossible(endPoint, GI_MAP)
        && verifyCharacterOnThePoint(startPoint, char);
        */

    return verify ? {
        cID : cID
        ,type : 'moveCharacter'
        ,startPoint : startPoint
        ,endPoint : endPoint
    } 
    :
    null;
}

exports.authLocation = function(object, GI_CHARACTER, GI_MAP) {
    var cID = object.cID;
    var point = object.point;

    var xy = fc.getXYFromPosition(point);
    GI_CHARACTER[cID].position = point;
    GI_CHARACTER[cID].x = xy.x;
    GI_CHARACTER[cID].y = xy.y;

    return {
        cID : cID
        ,type : 'authLocation'
        ,point : point
    }
}

function verifyPointMovePossible(index, GI_MAP) {
    return GI_MAP[index].movePossible;
}
function verifyCharacterOnThePoint(index, char) {
    return char.position === index;
}
