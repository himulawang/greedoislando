//var WS_HOST = "ws://192.168.0.130:8081";
//var WS_HOST = "ws://ginodedemo.duostack.net:9980";
var WS_HOST = "ws://192.168.0.130:8064";
//var WS_HOST = "ws://giworld.gicp.net:8081";
//var WS_HOST = "ws://gi.no.de:8080";
var Connect = function() {
    this.connection = null;
};
Connect.prototype.connect = function() {
    this.connection = new WebSocket(WS_HOST);
    this.connection.onopen = function(e) {
        GI.log.syslog('Connected');
    };
    this.connection.onclose = function(e) {
        GI.log.syslog('Disconnected');
    };
    this.connection.onmessage = function(e) {
        var stream = JSON.parse(e.data);
        GI.input.execute(stream);
    };
};
Connect.prototype.send = function(obj) {
    this.connection.send(JSON.stringify(obj));
};
