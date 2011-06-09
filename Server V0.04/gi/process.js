var selectCharacter = function(io) {
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
var logout = function (io) {
    var cID = io.iData.cID;
    
    //logout -> Other
    giUserList.disconnect(cID);
    io.add(addOutputData, 'logout', 'loggedOther', {cID : cID});

    io.response();
}
var moveCharacter = function (io) {
    var cID = io.iData.cID;

    var endPoint = object.endPoint;
    var character = giUserList.getCharacter(cID);
    if (character.getStatus() === 0) return;
    var nowLocation = character.getLocation();
    if (!(endPoint //invalid endPoint
        && giMap.verifyClientLocationMovePossible(endPoint) //verify endPoint movePossible
        && endPoint != nowLocation) // endPoint is nowLocation
    ) return;

    //character is moving
    if (character.characterMoving) {
        character.setNewDestinationTrigger = true;
        var way = giMap.getWay(character.nextGridIndex, endPoint);
        character.setWay(way);
        return;
    }
    var way = giMap.getWay(nowLocation, endPoint);

    character.setDoAction('toMove');  // trigger for move / attack switch

    character.setWay(way);
    character.startWay();
}
var keepSession = function(io) {
    var cID = io.iData.cID;
    giUserList.keepSession(cID);

    io.addOutputData(cID, 'keepSession', 'self', {timestamp : io.iData.timestamp});

    io.response();
}
var castSkill = function(io) {
    var cID = io.iData.cID;
    var character = giUserList.getCharacter(cID);
    var skillID = io.iData.skillID;
    var skill = character.skill.getSkill(skillID);   

    //check character has this skill
    if (!skill) return;
    character.setDoAction(2);  // trigger for attack action pausing the moving action
    if (character.castSelfCheck(io, skillID) === 0) return;
    
    //getSkillType
    if (skill.target === "single") {
        var targetCID = io.iData.target;
        var target = giUserList.getCharacter(targetCID);
        if (!target) return;
        if (character.castTargetCheck(io, target, skill) === 0) return;
        
        character.intSkill[skillID].excuteSkill(target);
    }
}
var skillCharge = function(io) {
    var cID = io.iData.cID;
    var character = giUserList.getCharacter(cID);
    var skillID = io.iData.skillID;
    var skill = character.getSkill(skillID);
    
    if (!skill) return; //check character if has this skill or not
    character.setDoAction(2);  // trigger for attack action pausing the moving action
    if (character.castSelfCheck(io, skillID) === 0) return;

    if (skill.target === 'single') {
    	if (io.iData.status === 1) {
            character.intSkill[skillID].chargeStart();
        } else if (io.iData.status === 0) {
        	var targetCID = io.iData.target;
            var target = giUserList.getCharacter(targetCID);
            if (!target) return;
            if (character.castTargetCheck(io, target, skill) === 0) return;
        	
            character.intSkill[skillID].setChargeLevel();
            character.intSkill[skillID].excuteSkill(target);
        } else {
            return; // reserved for later , eg. INTERUPTED
        }    	
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
    }
    ,unlogged : {
        keepSession : keepSession
        ,selectCharacter: selectCharacter
    }
}

