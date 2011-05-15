var skill = {
    10000 : {
        skillID : 10000
        ,name : "stoneScissorsCloth"
        ,damage : 100
        ,costNV : 100
        ,range : 3
        ,attribution : "physics"
        ,triggerType : "positive"
        ,target : "single"
    }
}

exports.get = function(skillID) {
    var output = {};
    output[skillID] = skill[skillID];
    return output;
}
