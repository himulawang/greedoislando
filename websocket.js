var WS_HOST = "ws://58.35.202.241:8080";


var ws;
var consoleDiv;
function log(text) {
    if (!consoleDiv) {
        consoleDiv = document.getElementById('console');
    }
    consoleDiv.innerHTML = consoleDiv.innerHTML + "<div>" + text + "</div>";
}

function connect() {
    ws = new WebSocket(WS_HOST);
    ws.onopen = function(e) {
        console.log(e);
        log("connected");
    }
    ws.onclose = function(e) {
        log("disconnect");
    }
    ws.onmessage = function(e) {
        console.log(e);
        log(e.data)
    }
}

function disconnect() {
    ws.close();
}

function selectGon() {
    var obj = {
        type : "selectCharacter"
        ,character : "gon"
    }
    ws.send(JSON.stringify(obj));
}
