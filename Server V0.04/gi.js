var sys = require('sys')
    ,ws = require('./lib/websocket')
    ,fc = require('./lib/facility');

var io = require('./gi/io')
    ,world = require('./gi/world');

var clients = {};

ws.createServer(function (websocket) {
    websocket.addListener("connect", function () { 
        sys.log(websocket.remoteAddress + ' Connected');
        clients[fc.guid()] = websocket;
    }).addListener("data", function (data) {
        var cID, object, output, i;

        for (cID in clients) {
            if (clients[cID] === websocket) {
                sys.log(cID + 'data :' + data);

                object = io.input(cID, data);
                //invalid message
                if (!object) return;
                output = world.entrance(cID, object);
            }
        }

        for (i in output) {
            io.output(output[i], clients);
        }
    }).addListener("close", function () { 
        sys.debug("close");
    });
}).listen(8081);

world.init();
