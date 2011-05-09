var sys = require('sys')
    ,fc = require('../lib/facility')
    ,response = require('./response')
    ,map = require('./map')
    ,character = require('./character')
    ,characterList = require('./character_list');

var GI_MAP, GI_CHARACTER_LIST;

function selectCharacter(cID, object) {
    var output = response.create();

    //getOnlineCharacter -> Self
    var onlineCharacterData = GI_CHARACTER_LIST.getOnlineCharacterList();
    output.add(cID, 'getOnlineCharacter', 'self', onlineCharacterData);

    //initMap -> Self
    var mapData = GI_MAP.getGrid();
    output.add(cID, 'map', 'self', mapData);

    //initMyCharacter ->Self
    var myCharacter = character.create(object);
    var myCharacterData = {};
    myCharacterData[cID] = GI_CHARACTER_LIST.add(myCharacter);
    output.add(cID, 'initMyCharacter', 'self', myCharacterData);

    //newCharacterLogin -> Other
    var newCharacterLoginData = {};
    newCharacterLoginData[cID] = myCharacter.getInfo();
    output.add(cID, 'newCharacterLogin', 'other', newCharacterLoginData);

    return output.get();
}
function logout(cID, object) {
    var output = response.create();

    //logout -> Other
    GI_CHARACTER_LIST.del(cID);
    output.add(cID, 'logout', 'other', {cID : cID});

    return output.get();
}
function moveCharacter(cID, object) {
    //verify startPoint And endPoint
    var startPoint = object.startPoint, endPoint = object.endPoint;
    if (!(GI_MAP.verifyMovePossible(startPoint) && GI_MAP.verifyMovePossible(endPoint))) return;

    var character = GI_CHARACTER_LIST.getCharacter(cID);
    //check location
    //1. character standing and startPoint matches
    //2. character moving and startPoint matches
    //3. character standing and startPoint != character Position
    //4. character moving and startPoint doesn't match
    var serverPosition = character.getLocation();
    if (startPoint === serverPosition && !character.characterMoving) { 
        var way = GI_MAP.getWay(startPoint, endPoint);
        character.setWay(way);
        character.startWay();
    } else if (startPoint === serverPosition && character.characterMoving) { 
        var way = GI_MAP.getWay(character.nextGridIndex, endPoint);
        character.setNewDestinationTrigger = true;
        character.setWay(way);
    } else if (startPoint != serverPosition && !character.characterMoving) {
        var deltaPosition = GI_MAP.getWay(startPoint, serverPosition);
        if (deltaPosition.length <= 2) {
            character.setLocation(startPoint);
            var way = GI_MAP.getWay(startPoint, endPoint);
            character.setWay(way);
            character.startWay();            
        }else {
            output.add(cID, 'badMove', 'self', {cID : cID, clientPosition : startPoint ,serverPosition : serverPosition});
        }
    } else if (startPoint != serverPosition && character.characterMoving) {
        var deltaPosition = GI_MAP.getWay(startPoint, serverPosition);
        if (deltaPosition.length <= 2) {
            character.setLocation(startPoint);
            var way = GI_MAP.getWay(character.nextGridIndex, endPoint);
            character.setNewDestinationTrigger = true;
            character.setWay(way);
        }else {
            output.add(cID, 'badMove', 'self', {cID : cID, clientPosition : startPoint ,serverPosition : serverPosition});
        }
    }

    var output = response.create();

    //moveCharacter -> Other
    output.add(cID, 'moveCharacter', 'other', {cID : cID, startPoint : object.startPoint, endPoint : object.endPoint});

    return output.get();
}
function authLocation(cID, object) {
    var output = response.create();
    var character = GI_CHARACTER_LIST.getCharacter(cID);
    var serverPosition = character.position;
    var clientPosition = object.location;
    var authResult = clientPosition === serverPosition ? 'true' : 'false';
    var authLocationData = {
        cID : cID
        ,clientPosition : clientPosition
        ,serverPosition : serverPosition
        ,authResult : authResult
    }
    console.log(authLocationData);
    output.add(cID, 'authLocation', 'self', authLocationData);

    return output.get();
}

exports.entrance = function(cID, object) {
    var type = object.type;
    if (!type) return;
    var actionList = ACTION[object.type];
    if (!actionList) return;

    return ACTION[object.type](cID, object);
}
exports.init = function() {
    GI_CHARACTER_LIST = characterList.create();
    GI_MAP = map.create();
}
exports.gm = function(cmd) {
    if (cmd === 'getAllCharacter') {
        return JSON.stringify(GI_CHARACTER_LIST.getOnlineCharacterList());
    }else if (cmd === '') {
    
    }
}

var ACTION = {
    selectCharacter : selectCharacter
    ,moveCharacter : moveCharacter
    ,authLocation : authLocation
    ,logout : logout
}
