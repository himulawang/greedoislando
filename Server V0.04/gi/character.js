var fc = require('../lib/facility');

exports.initMyCharacter = function(object, GI_CHARACTER) {
    /* 500 UpRight
     * 501 DownRight
     * 502 DownLeft
     * 503 UpLeft
     * */
    var cID = object.cID;
    var character = object.character;
    var x = fc.random(15);
    var y = fc.random(15);
    var position = fc.getPositionIndex(x, y);
    var faceTo = character === 'Gon' ? 501 : 503;
    GI_CHARACTER[cID] = {
        cID : cID
        ,name : character
        ,life : 100
        ,maxLife : 100
        ,force : 20
        ,maxForce : 20
        ,speed : 2
        ,position : position
        ,x : x
        ,y : y
        ,faceTo : faceTo
    };
    return {
        cID : cID
        ,type : 'initMyCharacter'
        ,data : GI_CHARACTER[cID]
    };
}

exports.initCharacter = function(object, GI_CHARACTER) {
    var cID = object.cID
    return {
        cID : cID
        ,type : 'initCharacter'
        ,data : GI_CHARACTER[cID]
    };
}

exports.initOnlineCharacters = function(object, GI_CHARACTER) {
    var cID = object.cID;
    var data = [];
    var i;
    for (i in GI_CHARACTER) {
        if (i === cID) continue;
        data.push(GI_CHARACTER[i]);
    }
    return {
        cID : cID
        ,type : 'initOnlineCharacters'
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
