var ws1, ws2, wsC, c, g1, g2;
var interval1, interval2;
var GAME_WS_HOST = "ws://192.168.130:8080";
var CONSOLE_WS_HOST = "ws://192.168.130:12345";

//Game1
function connectGame1() {
    if (ws1 && ws1.readyState === 1) return;
    ws1 = new WebSocket(GAME_WS_HOST);
    g1 = $("#game1");
    ws1.onopen = function(e) {
        output('Connected', g1);
        interval1 = setInterval(function() {
            ws1.send('{"type" : "keepSession"}');
        },30000);
    }

    ws1.onmessage = function(e) {
        console.log('game1', JSON.parse(e.data));
        output(e.data, g1);
    }

    ws1.onclose = function(e) {
        clearInterval(interval1);
    }
}
function selectCharacter1() {
    ws1.send('{"type" : "selectCharacter", "character" : "Gon"}');
}
function disconnectGame1() {
    ws1.send('{"type" : "logout"}');
}

//Game2
function connectGame2() {
    if (ws2 && ws2.readyState === 1) return;
    ws2 = new WebSocket(GAME_WS_HOST);
    g2 = $("#game2");
    ws2.onopen = function(e) {
        output('Connected', g2);
        interval2 = setInterval(function() {
            ws2.send('{"type" : "keepSession"}');
        },30000);
    }

    ws2.onmessage = function(e) {
        console.log('game2', JSON.parse(e.data));
        output(e.data, g2);
    }

    ws2.onclose = function(e) {
        clearInterval(interval2);
    }
}
function selectCharacter2() {
    ws2.send('{"type" : "selectCharacter", "character" : "Gon"}');
}
function disconnectGame2() {
    ws2.send('{"type" : "logout"}');
}
//Console
function connectConsole() {
    if (wsC && wsC.readyState === 1) return;
    wsC = new WebSocket(CONSOLE_WS_HOST);
    c = $("#console");
    wsC.onopen = function(e) {
        output('Connected', c);
    }

    wsC.onmessage = function(e) {
        console.log('console', JSON.parse(e.data));
        output(e.data, c);
    }
}

function getAllCharacter() {
    wsC.send('{"cmd" : "getAllCharacter"}');
}
function getClient() {
    wsC.send('{"cmd" : "getClient"}');
}


//Global
function output(text, el) {
    return el.prepend("<div>" + text + "</div>");
}
