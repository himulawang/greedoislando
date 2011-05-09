var fc = require('../lib/facility');

var list = function() {
    this.onlineCharacter = {};
}

exports.create = function() {
    return new list();
}

list.prototype.getOnlineCharacterCount = function() {
    return fc.objectLength(this.onlineCharacter);
}
list.prototype.add = function(character) {
    var cID = character.getCID();
    this.onlineCharacter[cID] = character;
    return character.getInfo();
}
list.prototype.getOnlineCharacterList = function() {
    var output = {}, character;
    for (var i in this.onlineCharacter) {
        character = this.onlineCharacter[i];
        output[character.getCID()] = character.getInfo();
    }
    return output;
}
list.prototype.del = function(cID) {
    delete this.onlineCharacter[cID];
}
list.prototype.getCharacter = function(cID) {
    return this.onlineCharacter[cID];
}
