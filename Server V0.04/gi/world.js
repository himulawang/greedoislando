var sys = require('sys')
    ,map = require('./map')
    ,char = require('./character');

/* MAP */
var GI_MAP, GI_DEFINE_TERRAIN
    ,GI_CHARACTER = {};

exports.entrance = function(cID, object) {
    var type = object.type;
    if (!type) return '{type : null}';
    var actionList = ACTION[object.type];
    if (!actionList) return '{type : null}';

    var output = doAction(cID, actionList, object);
    return output;
}

exports.init = function() {
    GI_MAP = map.makeMap();
}

/* Action */
function doAction(cID, actionList, object) {
    var output = [], sendType, i, func, data;
    for (sendType in actionList) {
        for(i in actionList[sendType]) {
            data = actionList[sendType][i](object);
            if (!data) continue;
            output.push({
                cID : cID
                ,send : sendType
                ,data : data
            });
        }
    }
    return output;
}

function initMap(object) {
    return {cID : object.cID, type : 'map' ,data : map.initMap()};
}
function initMyCharacter(object) {
    return char.initMyCharacter(object, GI_CHARACTER);
}
function initCharacter(object) {
    return char.initCharacter(object, GI_CHARACTER);
}
function initOnlineCharacters(object) {
    return char.initOnlineCharacters(object, GI_CHARACTER);
}
function moveCharacter(object) {
    return char.moveCharacter(object, GI_CHARACTER, GI_MAP);
}
function authLocation(object) {
    return char.authLocation(object, GI_CHARACTER, GI_MAP);
}

//GM
exports.getAllCharacter = function() {
    return GI_CHARACTER;
}
var ACTION = {
    selectCharacter : {
        all : []
        ,self : [initMap, initMyCharacter, initOnlineCharacters]
        ,other : [initCharacter]
    }
    ,moveCharacter : {
        all : []
        ,self : []
        ,other : [moveCharacter]
    }
    ,authLocation : {
        all : []
        ,self : []
        ,other : [authLocation]
    }
};
