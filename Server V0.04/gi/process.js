var selectCharacter = function(io) {
    var cID = io.iData.cID;

    //getOnlineCharacter -> Self
    var onlineCharacterData = giUserList.getOnlineCharacterList();
    io.addOutputData(cID, 'getOnlineCharacter', 'self', onlineCharacterData);
    
    //initMyCharacter -> Self
    giUserList.initCharacter(cID, io.iData.character);
    var myCharacter = giUserList.getCharacter(cID);
    var myCharacterData = {};
    myCharacterData[cID] = myCharacter.getInfo();
    io.addOutputData(cID, 'initMyCharacter', 'self', myCharacterData);

    //newCharacterLogin -> Other
    var newCharacterLoginData = {};
    newCharacterLoginData[cID] = myCharacter.getInfo();
    io.addOutputData(cID, 'newCharacterLogin', 'other', newCharacterLoginData);

    io.response();
}
var logout = function (io) {
    var cID = io.iData.cID;
    
    //logout -> Other
    giUserList.disconnect(cID);
    io.add(addOutputData, 'logout', 'other', {cID : cID});

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
        character.nextXY = endPoint;
        var way = giMap.getWay(nowLocation, endPoint);
        character.setWay(way);
        return;
    }
    var way = giMap.getWay(nowLocation, endPoint);

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
    if (character.getStatus() === 0) return;
    if (character.getcCD() === 0) {
        io.addOutputData(cID, 'commonCD', 'self', {cID : cID, timestamp : fc.getTimestamp()});
        io.response();
        return;
    }
    var skillID = io.iData.skillID;
    var skill = character.getSkill(skillID);
    //check character has this skill
    if (!skill) return;
    //getSkillType
    if (skill.target === "single") {
        var targetCID = io.iData.target;
        var target = giUserList.getCharacter(targetCID);
        if (!target) return;
        //check range
        var targetLocation = target.getLocation();
        var location = character.getLocation();
        var range = giMap.getRange(location, targetLocation);

        if (range > skill.range + GI_SKILL_CAST_BLUR_RANGE) {
            io.addOutputData(cID, 'castSkillOutOfRange', 'self', {cID : cID, target : targetCID, skillID : skillID});
            io.response();
            return;
        }
        //check NV
        var nv = character.getNV();
        if (skill.costNV > nv) {
            io.addOutputData(cID, 'castSkillOutOfNV', 'self', {cID : cID, target : targetCID, skillID : skillID});
            io.response();
            return;
        }
        //skill effect
        io.addOutputData(cID, 'castSkill', 'all', {cID : cID, target : targetCID, skillID : skillID});

        //skill costNV
        var preNV = character.getNV();
        var nowNV = character.subNV(skill.costNV);
        io.addOutputData(cID, 'nvChange', 'all', {cID : cID, preNV : preNV, nowNV : nowNV, nvDelta : nowNV - preNV});

        //skill miss
        var tangoDodgeRate = target.getDodgeRate();
        var ifHit = character.hitProc(tangoDodgeRate);
        if(ifHit === 0){
            io.addOutputData(cID, 'skillMiss', 'all', {cID : cID , target : targetCID , skillID : skillID});
        }else{
            //skill cause damage
            var preHP = target.getHP();
            var nowHP = target.subHP(skill.damage);
            io.addOutputData(cID, 'hpChange', 'all', {cID : targetCID, preHP : preHP, nowHP : nowHP, hpDelta : nowHP - preHP});
            if (nowHP === 0) io.addOutputData(cID, 'statusChange', 'all', {cID : targetCID, status : target.getStatus(), timestamp : fc.getTimestamp()});
        }
        
        character.cCD = 0;  // GCD -- cant use skill in the next 1.5s
        character.commonCD();  // 1.5s CoolDown Proc begins
        character.setCombat();  // set self status to combat 
        target.setCombat();  // set tango status to combat 
        character.setFree();  // 10s later set self status to free
        target.setFree();  // 10s later set tango status to free
        io.response();
    }
}




global.PROCESS = {
    keepSession : keepSession
    ,selectCharacter: selectCharacter
    ,logout : logout
    ,moveCharacter : moveCharacter
    ,castSkill : castSkill
}
