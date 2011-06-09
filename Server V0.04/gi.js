/* System */
var sys = require('sys')
    ,ws = require('./lib/websocket')
    ,util = require('util');
require('./lib/facility');
global.util = util;
/* Configuration */
require('./config');
require('../config/constant');
global.SKILL = fc.readFile("../config/skill.js");
/* GI World */
global.giUserList = require('./gi/userList').create();
giUserList.initInactiveUserRecycle();

global.giMap = require('./gi/map').create();
giMap.setObstacleToFindWay();
/* GI Skills */
require('./gi/skills/mora_stone');
require('./gi/skills/mora_scissors');
require('./gi/skills/mora_fabric');
require('./gi/skills/fading_steps');
require('./gi/skills/hand_hack');
require('./gi/skills/right_straight_punch');

require('./gi/process');
var io = require('./gi/io')
//    ,gm = require('./gi/gm');

//game server
ws.createServer(function(websocket) {
    websocket.addListener("connect", function() { 
        var cID = giUserList.newConnect(websocket);
        sys.log(websocket.remoteAddress + ' Connected; cID: ' + cID);
    }).addListener("data", function(data) {
        var stream = io.create();
        stream.getInputData(websocket, data);

        if (!stream.iData) return;
        stream.process();
    }).addListener("close", function() {
        var cID = giUserList.getCIDByClient(websocket);
        if (cID) giUserList.disconnect(cID);
    }).addListener("error", function(e) {
        console.log(e);
    });
}).listen(SERVER_LISTEN_PORT);

//admin console
/*
ws.createServer(function(websocket) {
    websocket.addListener("connect", function() { 
        sys.log('GM Connected');
    }).addListener("data", function(data) {
        var json = io.input('gm', data);
        if (json.cmd === 'getAllCharacter') {
            websocket.write(world.gm(json.cmd));
        }else if (json.cmd === 'getClient') {
            websocket.write(JSON.stringify(clients));
        }
    }).addListener("close", function() { 
        sys.debug("GM Disconnect");
    });
}).listen(SERVER_LISTEN_GM_PORT);
*/
