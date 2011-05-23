var character = require('./character')
    ,io = require('./io');

var list = function() {
    /*  user : {
     *      cID : {
     *          cID : cID
     *          ,character : {}
     *          ,client : {}
     *          ,lastActiveTime : timestamp
     *      }
     *  }
     * */
    this.onlineUser = {};
}

exports.create = function() {
    return new list;
}
list.prototype.getOnlineCharacterCount = function() {
    return fc.objectLength(this.onlineUser);
}
list.prototype.newConnect = function(client) {
    var cID = fc.guid();
    this.onlineUser[cID] = {
        cID : cID
        ,character: null
        ,client : client
        ,lastActiveTime : fc.getTimestamp()
    }
    return cID;
}
list.prototype.getOnlineCharacterList = function() {
    var output = {}, character;
    for (var cID in this.onlineUser) {
        character = this.onlineUser[cID].character;
        if (character === null) continue;
        output[cID] = character.getInfo();
    }
    return output;
}
list.prototype.disconnect = function(cID) {
    if (!(this.onlineUser[cID] && this.onlineUser[cID].client)) return;
    this.onlineUser[cID].client.end();

    // recycle Resources , Important!!!
    var character = giUserList.getCharacter(cID);
    if (character) {
        clearTimeout(character.setFreeTimeout);
        clearInterval(character.setFreeRecInterval);
        clearInterval(character.moveTimeout);
    }
    
    delete this.onlineUser[cID];

    var stream = io.create();
    stream.setSelfCID(cID);
    stream.addOutputData(cID, 'logout', 'logged', {cID : cID});
    stream.response();
}
list.prototype.getCharacter = function(cID) {
    if (!this.onlineUser[cID]) return;
    return this.onlineUser[cID].character;
}
list.prototype.getClient = function(cID) {
    if (this.onlineUser[cID]) return this.onlineUser[cID].client;
}
list.prototype.initInactiveUserRecycle = function() {
    this.inactiveUserRecycleIntervalID = setInterval(this.inactiveUserRecycle, GI_SESSION_RECYCLE_INTERVAL);
}
list.prototype.inactiveUserRecycle = function() {
    var now = fc.getTimestamp();
    for (var cID in this.onlineUser) {
        if (now - this.onlineUser[cID].lastActiveTime < GI_SESSION_RECYCLE_INTERVAL) continue;
        this.disconnect(cID);
    }
}
list.prototype.getCIDByClient = function(client) {
    for (var cID in this.onlineUser) {
        if (this.onlineUser[cID].client === client) return cID;
    }
}
list.prototype.initCharacter = function(cID, name) {
    var char = character.create(cID, name);
    this.onlineUser[cID].character = char;
}
//response
list.prototype.responseAll = function(output) {
    for (var cID in this.onlineUser) {
        this.onlineUser[cID].client.write(JSON.stringify(output));
    }
}
list.prototype.responseSelf = function(output, cID) {
    var self = this.getClient(cID);
    if (self) self.write(JSON.stringify(output));
}
list.prototype.responseOther = function(output, selfCID /* self cID*/) {
    for (var cID in this.onlineUser) {
        if (cID === selfCID) continue;
        this.onlineUser[cID].client.write(JSON.stringify(output));
    }
}
list.prototype.responseLogged = function(output) {
    var character;
    for (var cID in this.onlineUser) {
        character = this.onlineUser[cID].character;
        if (character === null) continue; 
        this.onlineUser[cID].client.write(JSON.stringify(output));
    }
}
//keepSession
list.prototype.keepSession = function(cID) {
    this.onlineUser[cID].lastActiveTime = fc.getTimestamp();
}
/*
list.prototype.destroyWorldInfo = function(cID) {
    var object = {
        cID : cID
        ,type : 'logout'
    };
    var output = world.entrance(cID, object);
    send(output);
}
*/
