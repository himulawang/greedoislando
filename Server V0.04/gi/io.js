//input JSON data and return an object
var sys = require('sys');
exports.input = function(cID, data) {
    try {
        object = JSON.parse(data);
        object.cID = cID;
    } catch(e) {
        return null;
    }
    return object;
}
exports.output = function(object, clients) {
    var i;
    var cID = object.cID;

    var output = {
        type : object.type
        ,data : object.data
    }
console.log(cID, '<-[', object.sendTo, ']', JSON.stringify(output.type));

    if (object.sendTo === 'all') {
        for (i in clients) {
            clients[i].write(JSON.stringify(output));
        }
    }else if (object.sendTo === 'self') {
        if (!clients[cID]) return;
        clients[cID].write(JSON.stringify(output));
    }else if (object.sendTo === 'other') {
        for (i in clients) {
            if (i === object.cID) continue;
            clients[i].write(JSON.stringify(output));
        }
    }
}
