var sys = require('sys')
    ,map = require('./map');

var PROCESS = {
    selectCharacter : ['outputs.push(map.getMap(stream))']
};

var stream;

exports.input = function(data) {
    //try {
        stream = JSON.parse(data);
        if (!PROCESS[stream.type]) return '{type : null}';
            
        var funcs = PROCESS[stream.type];

        var outputs = [];
        for (var i = 0; i < funcs.length; ++i) {
        sys.debug(funcs[i]);
            eval(funcs[i]); 
        }
    //} catch(e) {
    //}
    return JSON.stringify(outputs);
}
