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
var castSkill = function(io, skillChargeDamageFactor) {
    if (skillChargeDamageFactor === undefined) var skillChargeDamageFactor = 1;
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
        
        var ifHit = character.skill.castProc(skill, target);
        
        if (ifHit != 0) character.skill.castSkill(skill, target, skillChargeDamageFactor);
        
        character.cCD = 0;  // GCD -- cant use skill in the next 1.5s
        character.commonCD();  // 1.5s CoolDown Proc begins

        character.skill.setSkillCD(skill);

        character.setFree();  // 10s later set self status to free
        target.setFree();  // 10s later set tango status to free

        io.response();
    }
}
var skillCharge = function(io) {
    var cID = io.iData.cID;
    var character = giUserList.getCharacter(cID);
    var skillID = io.iData.skillID;
    var skill = character.getSkill(skillID);
    
    if (!skill) return; //check character if has this skill or not
    if (character.getStatus() === 0) return;  // character dead , no action permitted
    if (character.doAction === 1 || character.doAction === 3) return; // must standing while charging

    if (io.iData.status === 1) {
        character.skill.chargeStart(skillID);
    } else if (io.iData.status === 0) {
        var skillChargeLevel = character.skill.getChargeLevel(skillID);
        var skillChargeDamageFactor = character.getSkillChargeDamageFactor(skill, skillChargeLevel);
        if (skillChargeDamageFactor) castSkill(io, skillChargeDamageFactor);
    } else {
        return; // reserved for later , eg. INTERUPTED
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

