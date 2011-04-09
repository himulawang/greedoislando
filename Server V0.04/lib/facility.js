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
//get position index
exports.getPositionIndex = function(x, y) {
    return x + ',' + y;
}
//get x y from position index
exports.getXYFromPosition = function(index) {
    var t = index.split(',');
    return {x : parseInt(t[0]), y : parseInt(t[1])};
}
