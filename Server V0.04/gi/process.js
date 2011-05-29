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
    character.setDoAction('toAttack');  // trigger for attack action pausing the moving action
    if (character.getStatus() === 0) return;  // character dead , no action permitted
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
        if (target.getStatus() === 0) return;  //  target dead , no more attack on dead body!!
        if (target.doAction === 3) return;  // target being repeled ... TODO
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
        io.addOutputData(cID, 'castSkill', 'logged', {cID : cID, target : targetCID, skillID : skillID});

        //skill costNV
        var preNV = character.getNV();
        var nowNV = character.subNV(skill.costNV);
        io.addOutputData(cID, 'nvChange', 'logged', {cID : cID, preNV : preNV, nowNV : nowNV, nvDelta : nowNV - preNV});

        character.setCombat();  // set self status to combat 
        target.setCombat();  // set tango status to combat 

        //skill miss
        var tangoDodgeRate = target.getDodgeRate();
        var ifHit = character.hitProc(tangoDodgeRate);
        if(ifHit === 0){
            io.addOutputData(cID, 'skillMiss', 'logged', {cID : cID , target : targetCID , skillID : skillID});
        }else{
            //skill cause damage
            var preHP = target.getHP();
            var damage = character.getSkillPower(skill);
            var nowHP = target.subHP(damage, target.atkRF);
            io.addOutputData(cID, 'hpChange', 'logged', {cID : targetCID, preHP : preHP, nowHP : nowHP, hpDelta : nowHP - preHP});
            if (nowHP === 0) io.addOutputData(cID, 'statusChange', 'logged', {cID : targetCID, status : target.getStatus(), timestamp : fc.getTimestamp()});
            //skill cause additional effect
            if (skill.adtEffect != null) target.doSkillAdtEffect(cID, skill, character.position);
        }
        
        character.cCD = 0;  // GCD -- cant use skill in the next 1.5s
        character.commonCD();  // 1.5s CoolDown Proc begins

        character.setFree();  // 10s later set self status to free
        target.setFree();  // 10s later set tango status to free

        io.response();
    }
}




global.PROCESS = {
    logged : {
        keepSession : keepSession
        ,selectCharacter: selectCharacter
        ,logout : logout
        ,moveCharacter : moveCharacter
        ,castSkill : castSkill
    }
    ,unlogged : {
        keepSession : keepSession
        ,selectCharacter: selectCharacter
    }
}

