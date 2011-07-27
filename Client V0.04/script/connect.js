var Connect = function() {
    this.connection = null;
};
Connect.prototype.connect = function() {
    this.connection = new WebSocket(global.GI_SERVER.DEV);
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
