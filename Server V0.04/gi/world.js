var sys = require('sys')
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
    if (!(GI_MAP.verifyMovePossible(object.startPoint) && GI_MAP.verifyMovePossible(object.endPoint))) return;

    var output = response.create();

    //moveCharacter -> Other
    output.add(cID, 'moveCharacter', 'other', {cID : cID, startPoint : object.startPoint, endPoint : object.endPoint});

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
    ,logout : logout
}
