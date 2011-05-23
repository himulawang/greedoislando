var sys = require('sys');

var io = function() {
    this.iData = null;
    this.oData = [];
}

exports.create = function() {
    return new io;
}
io.prototype.setSelfCID = function(cID) {
    this.iData = {
        cID : cID
    };
}
io.prototype.getInputData = function(client, data) {
    try {
        object = JSON.parse(data);
        object.cID = giUserList.getCIDByClient(client);
    } catch(e) {
    }
    this.iData = object;
}
io.prototype.addOutputData = function(cID, protocol, sendTo, data) {
    this.oData.push({
        cID : cID
        ,type : protocol
        ,sendTo : sendTo
        ,data : data
    });
}
io.prototype.process = function() {
    var type = this.iData.type;
    if (!type) return;
    var action = PROCESS[type];
    if (!action) return;

    return PROCESS[type](this);
}
io.prototype.response = function() {
    var i, x, object, output;
    var cID = this.iData.cID;

    for (x in this.oData) {
        object = this.oData[x];
        output = {
            type : object.type
            ,data : object.data
        }

//console.log(cID, '<-[', object.sendTo, ']', JSON.stringify(output.type));
    
        if (object.sendTo === 'all') {
            giUserList.responseAll(output);
        }else if (object.sendTo === 'self') {
            giUserList.responseSelf(output, cID);
        }else if (object.sendTo === 'other') {
            giUserList.responseOther(output, cID);
        }else if (object.sendTo === 'logged') {
            giUserList.responseLogged(output);
        }
    }
}
