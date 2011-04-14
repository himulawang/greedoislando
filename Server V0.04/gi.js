var sys = require('sys')
    ,ws = require('./lib/websocket')
    ,fc = require('./lib/facility');

var config = require('./config')
    ,io = require('./gi/io')
    ,world = require('./gi/world')
    ,gm = require('./gi/gm');

var clients = {};

function getCID(websocket) {
    for (var cID in clients) {
        if (clients[cID] === websocket) return cID;
    }
}
function send(output) {
    for (var i = 0; i < output.length; ++i) {
        io.output(output[i], clients);
    }
}
function destroyWorldInfo(cID) {
    var object = {
        cID : cID
        ,type : 'logout'
    };
    var output = world.entrance(cID, object);
    send(output);
}
function clearConnectionPool(cID) {
    if (!clients[cID]) return;
    clients[cID].end();
    delete clients[cID];
}
function logout(cID) {
    destroyWorldInfo(cID);
    clearConnectionPool(cID);
}

//game server
ws.createServer(function (websocket) {
    websocket.addListener("connect", function () { 
        sys.log(websocket.remoteAddress + ' Connected');
        websocket.sessionTime = fc.getTimestamp();
        clients[fc.guid()] = websocket;
    }).addListener("data", function (data) {
        var object, output, i;
        var cID = getCID(websocket);

        object = io.input(cID, data);
        //invalid message
        if (!object) return;
        //keepSession
        if (object.type === 'keepSession') {
            clients[cID].sessionTime = fc.getTimestamp();
            return;
        }
        console.log(cID, '->', data);
        if (object.type === 'logout') {
            logout(cID);
            return;
        }

        output = world.entrance(cID, object);
        if (!output) return;
        //send
        send(output);
    }).addListener("close", function () { 
        var cID = getCID(websocket);
        if (cID) logout(cID);
    });
}).listen(config.port());

//admin console
ws.createServer(function (websocket) {
    websocket.addListener("connect", function () { 
        sys.log('GM Connected');
    }).addListener("data", function (data) {
        var json = io.input('gm', data);
        if (json.cmd === 'getAllCharacter') {
            websocket.write(world.gm(json.cmd));
        }else if (json.cmd === 'getClient') {
            websocket.write(JSON.stringify(clients));
        }
    }).addListener("close", function () { 
        sys.debug("GM Disconnect");
    });
}).listen(config.gmPort());

//session recycle
setInterval(function(){
    sys.log('Begin recycle');
    var now = fc.getTimestamp();
    for (var cID in clients) {
        if (now - clients[cID].sessionTime < 40000) continue;
        sys.log(cID + ' be recycled');
        logout(cID);
    }
}, 40000);

world.init();
