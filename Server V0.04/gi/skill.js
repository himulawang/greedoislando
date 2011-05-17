var skill = {
    10000 : {
        skillID : 10000
        ,name : "stoneScissorsCloth"
        ,damage : 20
        ,costNV : 100
        ,range : 6
        ,attribution : "physics"
        ,triggerType : "positive"
        ,target : "single"
    }
}

exports.get = function(skillID) {
    return skill[skillID];
}
