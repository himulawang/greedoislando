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
sys.debug(JSON.stringify(object.data.type));
    if (object.send === 'all') {
        for (i in clients) {
            clients[i].write(JSON.stringify(object.data));
        }
    }else if (object.send === 'self') {
        if (!clients[cID]) return;
        clients[cID].write(JSON.stringify(object.data));
    }else if (object.send === 'other') {
        for (i in clients) {
            if (i === object.cID) continue;
            clients[i].write(JSON.stringify(object.data));
        }
    }
}
