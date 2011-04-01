var sys = require('sys')
    ,map = require('./map');

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
    /* 500 UpRight
     * 501 DownRight
     * 502 DownLeft
     * 503 UpLeft
     * */
    var cID = object.cID;
    var character = object.character;
    var position = character === 'Gon' ? "2,2" : "16,16";
    var faceTo = character === 'Gon' ? 501 : 503;
    GI_CHARACTER[cID] = {
        cID : cID
        ,name : character
        ,life : 100
        ,maxLife : 100
        ,force : 20
        ,maxForce : 20
        ,speed : 2
        ,positon : position
        ,faceTo : faceTo
    };
    return {
        cID : cID
        ,type : 'initMyCharacter'
        ,data : GI_CHARACTER[cID]
    };
}
var ACTION = {
    selectCharacter : {
        all : []
        ,self : [initMap, initMyCharacter]
        ,other : []
    }
};

