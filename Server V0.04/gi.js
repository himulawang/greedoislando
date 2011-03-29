var sys = require('sys')
    ,ws = require('./lib/websocket')
    ,fc = require('./lib/facility');

var world = require('./gi/world');

var clients = {};
var cID, i;


ws.createServer(function (websocket) {
    websocket.addListener("connect", function () { 
        sys.log(websocket.remoteAddress + ' Connected');
        clients[fc.guid()] = websocket;
    }).addListener("data", function (data) {
        sys.log(data);

        var output = world.input(data);

        for (cID in clients) {
            clients[cID].write(output);
        }
    }).addListener("close", function () { 
        sys.debug("close");
    });
}).listen(8081);
