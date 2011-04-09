var fc = require('../lib/facility');

exports.initMyCharacter = function(object, GI_CHARACTER) {
    /* 500 UpRight
     * 501 DownRight
     * 502 DownLeft
     * 503 UpLeft
     * */
    var cID = object.cID;
    var character = object.character;
    //var position = character === 'Gon' ? "2,2" : "16,16";
    var x = fc.random(15);
    var y = fc.random(15);
    var position = x + ',' + y;
    var faceTo = character === 'Gon' ? 501 : 503;
    GI_CHARACTER[cID] = {
        cID : cID
        ,name : character
        ,life : 100
        ,maxLife : 100
        ,force : 20
        ,maxForce : 20
        ,speed : 2
        ,position : position
        ,faceTo : faceTo
    };
    return {
        cID : cID
        ,type : 'initMyCharacter'
        ,data : GI_CHARACTER[cID]
    };
}

exports.initCharacter = function(object, GI_CHARACTER) {
    var cID = object.cID
    return {
        cID : cID
        ,type : 'initCharacter'
        ,data : GI_CHARACTER[cID]
    };
}
