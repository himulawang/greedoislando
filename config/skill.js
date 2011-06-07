var SKILL = 
{
    "10000" : {
        "skillID" : 10000
        ,"name" : "rightStraightPunch"
        ,"damage" : 80
        ,"costNV" : 100
        ,"range" : 6
        ,"attribution" : "physics"
        ,"triggerType" : "positive"
        ,"target" : "single"
        ,"sEffect" : null
        ,"adtEffect" : null
        ,"adtEffectVal" : null
        ,"adtEffectTime" : null
        ,"skillCD" : null
        ,"lvUPMod" : {
            "damage" : 30
        }
    }
    ,"5000" : {
        "skillID" : 5000
        ,"name" : "wrap"
        ,"attribution" : "physics"
        ,"triggerType" : "aura"
        ,"target" : "self"
        ,"sEffect" : null
        ,"adtEffect" : null
        ,"adtEffectVal" : null
        ,"skillCD" : null
        ,"auraType" : "defRF"
        ,"auraRFVal" : 0.05
        ,"lvUpMod" : {
            "auraRFVal" : 0.05
        }
    }
    ,"5001" : {
        "skillID" : 5001
        ,"name" : "obstruct"
        ,"attribution" : "physics"
        ,"triggerType" : "aura"
        ,"target" : "self"
        ,"sEffect" : null
        ,"adtEffect" : null
        ,"adtEffectVal" : null
        ,"skillCD" : null
        ,"auraType" : "recRF"   
        ,"auraRFVal" : 0.1
        ,"lvUpMod" : {
            "auraRFVal" : 0.1
        }
    }
    ,"5002" : {
        "skillID" : 5002
        ,"name" : "charge"
        ,"attribution" : "all"
        ,"triggerType" : "aura"
        ,"target" : "self"
        ,"sEffect" : null
        ,"adtEffect" : null
        ,"adtEffectVal" : null
        ,"skillCD" : null
        ,"auraType" : "atkRF"
        ,"auraRFVal" : 0.05
        ,"lvUpMod" : {
            "auraRFVal" : 0.05
        }
    }
    ,"5003" : {
        "skillID" : 5003
        ,"name" : "launch"
        ,"attribution" : "all"
        ,"triggerType" : "aura"
        ,"target" : "self"
        ,"sEffect" : null
        ,"adtEffect" : null
        ,"adtEffectVal" : null
        ,"skillCD" : null
        ,"auraType" : "skillRF"
        ,"auraRFVal" : 0.03
        ,"lvUpMod" : {
            "auraRFVal" : 0.03
        }
    }
    ,"10001" : {
        "skillID" : 10001
        ,"name" : "moraStone"
        ,"damage" : 200
        ,"costNV" : 200
        ,"range" : 6
        ,"attribution" : "physics"
        ,"triggerType" : "positive"
        ,"target" : "single"
        ,"sEffect" : null
        ,"adtEffect" : "repel"
        ,"adtEffectVal" : 6
        ,"adtEffectTime" : 200
        ,"skillCD" : 5000
        ,"lvUPMod" : {
            "damage" : 100
        }
        ,"chargeLevel" : {
            "1" : 0.5
            ,"2" : 1
            ,"3" : 2
        }
    }
    ,"10002" : {
        "skillID" : 10002
        ,"name" : "moraScissors"
        ,"damage" : 0
        ,"costNV" : 50
        ,"range" : 18
        ,"attribution" : "physics"
        ,"triggerType" : "positive"
        ,"target" : "single"
        ,"sEffect" : null
        ,"adtEffect" : "bleed"
        ,"adtEffectVal" : 10
        ,"adtEffectTime" : 15000
        ,"skillCD" : 5000
        ,"lvUPMod" : {
            "adtEffectVal" : 10
        }
    }
    ,"10003" : {
        "skillID" : 10003
        ,"name" : "moraFabric"
        ,"damage" : 30
        ,"costNV" : 100
        ,"range" : 24
        ,"attribution" : "physics"
        ,"triggerType" : "positive"
        ,"target" : "single"
        ,"sEffect" : null
        ,"adtEffect" : "slow"
        ,"adtEffectVal" : 0.7
        ,"adtEffectTime" : 5000
        ,"skillCD" : 10000
        ,"lvUPMod" : {
            "adtEffectTime" : 3
        }
    }
}
