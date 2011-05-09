//generate a GUID
exports.guid = function() {
    var guid = ""; 
    for (var i = 1; i <= 32; i++){ 
        var n = Math.floor(Math.random() * 16.0).toString(16); 
        guid += n; 
        if((i==8)||(i==12)||(i==16)||(i==20)) 
            guid += "-"; 
    } 
    return guid; 
}
//get random
exports.random = function(n) {
    return Math.floor(Math.random() * n + 1);
}
//get timestamp
exports.getTimestamp = function() {
    return Date.parse(new Date());
}
exports.objectLength = function(object) {
    var c = 0;
    for (var i in object) {
        if (object.hasOwnProperty(i)) ++c;
    }
    return c;
}
exports.getCoordinateXY = function(index) {
    index = index.split(',');
    return {x : parseInt(index[0]), y : parseInt(index[1])};
}
exports.getCoordinateIndex = function(x, y) {
        return x + ',' + y;
}

