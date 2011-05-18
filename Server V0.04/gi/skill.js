var skill = {
    10000 : {
        skillID : 10000
        ,name : "stoneScissorsCloth"
        ,damage : 50
        ,costNV : 100
        ,range : 6
        ,attribution : "physics"
        ,triggerType : "positive"
        ,target : "single"
        ,sEffect : null
        ,lvUPMod : 30
    }
    ,5000 : {
        skillID : 5000
        ,name : "warp"
        ,attribution : "physics"
        ,triggerType : "aura"
        ,target : "self"
        ,sEffect : null
        ,auraType : "defRF"
        ,auraRFVal : 0.05
        ,lvUpMod : 0.05
    }
    ,5001 : {
        skillID : 5001
        ,name : "obstruct"
        ,attribution : "physics"
        ,triggerType : "aura"
        ,target : "self"
        ,sEffect : null   //side effect
        ,auraType : "recRF"
        ,auraRFVal : 0.1
        ,lvUpMod : 0.1
    }
    ,5002 : {
        skillID : 5002
        ,name : "charge"
        ,attribution : "all"
        ,triggerType : "aura"
        ,target : "self"
        ,sEffect : null
        ,auraType : "atkRF"
        ,auraRFVal : 0.05
        ,lvUpMod : 0.05
    }
    ,5003 : {
        skillID : 5003
        ,name : "launch"
        ,attribution : "all"
        ,triggerType : "aura"
        ,target : "self"
        ,sEffect : null
        ,auraType : "skillRF"
        ,auraRFVal : 0.03
        ,lvUpMod : 0.03
    }
}

exports.get = function(skillID) {
    return skill[skillID];
}
