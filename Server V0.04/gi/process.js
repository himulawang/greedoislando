var selectCharacter = function() {
    var cID = io.iData.cID;

    //getOnlineCharacter -> Self
    var onlineCharacterData = giUserList.getOnlineCharacterList();
    io.addOutputData(cID, 'getOnlineCharacter', 'self', onlineCharacterData);
    
    //initMyCharacter -> Self
    giUserList.initCharacter(cID, io.iData.character);
    var myCharacter = giUserList.getCharacter(cID);
    var myCharacterData = {};
    myCharacterData = myCharacter.getInfo();
    io.addOutputData(cID, 'initMyCharacter', 'self', myCharacterData);

    //newCharacterLogin -> Other
    var newCharacterLoginData = {};
    newCharacterLoginData = myCharacter.getInfo();
    io.addOutputData(cID, 'newCharacterLogin', 'loggedOther', newCharacterLoginData);

    io.response();
}
var logout = function () {
    var cID = io.iData.cID;
    
    //logout -> Other
    giUserList.disconnect(cID);
    io.addOutputData(cID, 'logout', 'loggedOther', {cID : cID});

    io.response();
}
var moveCharacter = function () {
    var cID = io.iData.cID;
    var destination_mapArea = io.iData.mapArea;
    
    var endPoint = object.endPoint;
    var character = giUserList.getCharacter(cID);
    if (character.getStatus() === 0) return;
    if (character.doAction === 5 || character.doAction === 4) return;
    var nowLocation = character.getLocation();
    
    if (destination_mapArea != character.mapArea) {
        if (!maps[destination_mapArea]) {
            maps[destination_mapArea] = new MAPMAPPING[MAPDATA[destination_mapArea].mapName];
        }

        // Create a combine Map of nowLocatedMap & destinationMap
        // Run the setWay in combine Map
        
    } else {
        // Instantiated Map start
        if (!maps[character.mapArea]) {
            maps[character.mapArea] = new MAPMAPPING[MAPDATA[character.mapArea].mapName];
        }
        // Instantiated Map end
        if (!(endPoint //invalid endPoint
            && maps[character.mapArea].verifyClientLocationMovePossible(endPoint) //verify endPoint movePossible
            && endPoint != nowLocation) // endPoint is nowLocation
        ) return;

        //character is moving
        if (character.characterMoving) {
            character.setNewDestinationTrigger = true;
            var way = maps[character.mapArea].getWay(character.nextGridIndex, endPoint);
            character.setWay(way);
            return;
        }
        var way = maps[character.mapArea].getWay(nowLocation, endPoint);

        character.setWay(way);
        character.startWay();
    }
}
var keepSession = function() {
    var cID = io.iData.cID;
    giUserList.keepSession(cID);
    io.addOutputData(cID, 'keepSession', 'self', {timestamp : io.iData.timestamp});
    io.response();
}
var castSkill = function() {
    var cID = io.iData.cID;
    var character = giUserList.getCharacter(cID);
    var skillID = io.iData.skillID;
    var skill = character.getSkill(skillID);   
    //check character has this skill
    if (!skill) return;
    if (character.castSelfCheck(skillID) === 0) return;
    //getSkillType
    if (skill.target === "single") {
        var targetCID = io.iData.target;
        var target = giUserList.getCharacter(targetCID);
        if (!target) return;
        character.intSkill[skillID].castSkill(target);
    } else if (skill.target === "location") {
        var location = io.iData.location;
        character.intSkill[skillID].castSkill(location);
    }
}
var skillCharge = function() {
    var cID = io.iData.cID;
    var character = giUserList.getCharacter(cID);
    var skillID = io.iData.skillID;
    var skill = character.getSkill(skillID);
    
    if (!skill) return; //check character if has this skill or not
    if (character.castSelfCheck(skillID) === 0) return;
    
    if (skill.target === 'single') {
    	if (io.iData.status === 1) {
            character.intSkill[skillID].chargeStart();
        } else if (io.iData.status === 0) {
        	var targetCID = io.iData.target;
            var target = giUserList.getCharacter(targetCID);
            if (!target) return;
            character.intSkill[skillID].setChargeLevel();
            character.intSkill[skillID].castSkill(target);
        } else {
            return; // reserved for later , eg. INTERUPTED
        }    	
    }    
}

var debug = function() {
    var cID = io.iData.cID;
    try {
        var requestResource = global[io.iData.object] || eval(io.iData.object);
        io.addOutputData(cID, 'debug', 'self', {resource : requestResource, resourceID : io.iData.object + "-" + fc.getTimestamp()});
        io.response();
    } catch (e) {
        return; 
    }    
}

global.PROCESS = {
    logged : {
        keepSession : keepSession
        ,selectCharacter: selectCharacter
        ,logout : logout
        ,moveCharacter : moveCharacter
        ,castSkill : castSkill
        ,skillCharge :　skillCharge
        ,debug : debug
    }
    ,unlogged : {
        keepSession : keepSession
        ,selectCharacter: selectCharacter
        ,debug : debug
    }
}

