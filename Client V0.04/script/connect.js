var Connect = function() {};

Connect.prototype.connect = function() {
    if (this.connection) return;
    var connection = new WebSocket(global.GI_SERVER.DEV);
    connection.onopen = function(e) { GI.log.syslog('Connected'); };
    connection.onclose = function(e) { GI.log.syslog('Disconnected'); };
    connection.onmessage = function(e) { GI.input.execute(JSON.parse(e.data)); };
    this.connection = connection;
};
Connect.prototype.send = function(obj) {
    this.connection.send(JSON.stringify(obj));
};
