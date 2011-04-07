var sys = require('sys')
    ,map = require('./map')
    ,char = require('./character');

/* MAP */
var GI_MAP
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
    GI_MAP = map.initMap();
}

/* Action */
function doAction(cID, actionList, object) {
    var output = [], sendType, i, func;
    for (sendType in actionList) {
        for(i in actionList[sendType]) {
            output.push({
                cID : cID
                ,send : sendType
                ,data : actionList[sendType][i](object)
            });
        }
    }
    return output;
}

function initMap(object) {
    return {cID : object.cID, type : 'map' ,data : GI_MAP};
}

function initMyCharacter(object) {
    return char.initMyCharacter(object, GI_CHARACTER);
}

function initCharacter(object) {
    return char.initCharacter(object, GI_CHARACTER);
    //return {type : 'initCharacter'}
}

//GM
exports.getAllCharacter = function() {
    return GI_CHARACTER;
}
var ACTION = {
    selectCharacter : {
        all : []
        ,self : [initMap, initMyCharacter]
        ,other : [initCharacter]
    }
};
