var sys = require('sys')
    ,ws = require('./lib/websocket')
    ,fc = require('./lib/facility');

var io = require('./gi/io')
    ,world = require('./gi/world')
    ,gm = require('./gi/gm');

var clients = {};

//game server
ws.createServer(function (websocket) {
    websocket.addListener("connect", function () { 
        sys.log(websocket.remoteAddress + ' Connected');
        websocket.sessionTime = fc.getTimestamp();
        clients[fc.guid()] = websocket;
    }).addListener("data", function (data) {
        var cID, object, output, i;

        for (cID in clients) {
            if (clients[cID] === websocket) {
                sys.log(cID + 'data :' + data);

                object = io.input(cID, data);
                //invalid message
                if (!object) return;
                //keepSession
                if (object.type === 'keepSession') {
                    clients[cID].sessionTime = fc.getTimestamp();
                    return;
                }
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

//admin console
ws.createServer(function (websocket) {
    websocket.addListener("connect", function () { 
        sys.log('GM Connected');
    }).addListener("data", function (data) {
        var json = io.input('gm', data);
        if (json.cmd === 'getAllCharacter') {
            websocket.write(gm.getAllCharacter(world));
        }else if (json.cmd === 'getClient') {
            websocket.write(gm.getClient(clients));
        }
    }).addListener("close", function () { 
        sys.debug("close");
    });
}).listen(12346);

//session recycle
setInterval(function(){
    sys.log('begin recycle');
    var now = fc.getTimestamp();
    var cID;
    for (cID in clients) {
        sys.log('now: ' + now + ';' + 'sessionTime:' + clients[cID].sessionTime);
        if (now - clients[cID].sessionTime >= 60000) {
            sys.log(cID + ' be recycled');
            clients[cID].end();
            delete clients[cID];
        }
    }
}, 60000);


world.init();
