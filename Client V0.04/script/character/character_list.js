var Character_List = function() {
    this.CHARACTER_MAPPING = global.CHARACTER_MAPPING;
    this.selfCID = null;
    this.playerList = {};
    this.npcList = {};
    this.monsterList = {};
};

Character_List.prototype.getSelf = function() {
    return this.playerList[this.selfCID];
};
Character_List.prototype.getPlayer = function(cID) {
    return this.playerList[cID];
};
Character_List.prototype.getNPC = function(cID) {
    return this.npcList[cID];
};
Character_List.prototype.getMonster = function(cID) {
    return this.monsterList[cID];
};
Character_List.prototype.getPlayerList = function(cID) {
    return this.playerList;
};
Character_List.prototype.setPlayer = function(data) {
    var cID = data.cID;
    console.log(data);
    var character = new this.CHARACTER_MAPPING[data.name](data.name);
    character.make(data);
    this.playerList[cID] = character;
    return character;
};
Character_List.prototype.setMyPlayer = function(data) {
    var character = this.setPlayer(data);
    this.selfCID = data.cID;
    character.setSelf();
    return character;
};
Character_List.prototype.delPlayer = function(cID) {
    var character = this.getPlayer(cID);
    if (!character) return;
    cancelRequestAnimationFrame(character.animation.canvasAnimationID);
    cancelRequestAnimationFrame(character.animation.moveAnimationID);
    delete this.playerList[cID];
}
