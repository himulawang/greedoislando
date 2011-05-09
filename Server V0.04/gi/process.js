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
    giUserList.keepSession(io.iData.cID);
}

global.PROCESS = {
    keepSession : keepSession
    ,selectCharacter: selectCharacter
    ,logout: logout
    ,moveCharacter : moveCharacter
}
