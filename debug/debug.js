var WS,SESSIONINTERVAL;
var DATA = {};
var GAME_WS_HOST = "ws://192.168.0.130:8081";

function gameConnect() {
    WS = new WebSocket(GAME_WS_HOST);
    WS.onopen = function(e) {
        SESSIONINTERVAL = setInterval(function() {
            WS.send('{"type" : "keepSession"}');
        },29000);
    }

    WS.onmessage = function(e) {
        var words = JSON.parse(e.data);
        write(words);
    }

    WS.oncolse = function(e) {
        clearInterval(SESSIONINTERVAL);
    }
}

function write(message) {
    var deb = document.getElementById('debugger');
    var wrap = document.createElement("div");
    deb.appendChild(wrap);
    var line = document.createElement("div");
    line.id = message.data.resourceID;
    line.textContent = "> " + message;    
    line.className = "messages";
    wrap.appendChild(line);
    DATA[message.data.resourceID] = message.data.resource;
    line.onclick = expandData;
}

function expandData(e) {
    if (e.target.childElementCount === 0) {
        var id = e.target.id;
        var line = document.getElementById(id);
        var content = DATA[id];
        for (var x in content) {
            var attr = document.createElement("div");
            attr.id = x + "-" + Date.now();
            attr.textContent = "> " + x + " : " + content[x];            
            attr.className = "messages";
            line.appendChild(attr);
            DATA[attr.id] = content[x];
            attr.ondblclick = expandData;
        }
    } else {
        closeData(e.target);
    }
}

function closeData(el) {
    var length = el.children.length;
    for ( var i = 0; i < length; ++i ) {
        el.removeChild(el.children[0]);
    }
}

function sendMsg(obj) {
    WS.send('{"type" : "debug", "object" : "' + obj + '"}');
}

function DOMContentLoaded() {
    gameConnect();
    addListener();
}

function addListener() {
    var input = document.getElementById('consoleinput');
    input.onkeypress = startConsole;
}

function startConsole(e) {
    if (e.which != 13) return;
    var message = document.getElementById('consoleinput').value;
    document.getElementById('consoleinput').value = '';
    sendMsg(message);
    writeConsole(message);
}

function writeConsole(message) {
    var con = document.getElementById('console');
    var line = document.createElement("div");
    line.textContent = message;
    line.className = "messages";
    con.appendChild(line);
}

document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );




