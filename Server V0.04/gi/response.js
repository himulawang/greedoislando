var response = function() {
    this.responses = [];
}

exports.create = function() {
    return new response();
}

response.prototype.add = function(cID, protocol, sendTo, data) {
    this.responses.push({
        cID : cID
        ,type : protocol
        ,sendTo : sendTo
        ,data : data
    });
}
response.prototype.get = function() {
    return this.responses;
}
