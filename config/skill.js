var SKILL = 
{
    "10000" : {
        "skillID" : 10000
        ,"name" : "rightStraightPunch"
        ,"abbreviation" : "Punch"
        ,"className" : "Skill_RightStraightPunch"
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
        ,"abbreviation" : "Stone"
        ,"className" : "Skill_MoraStone"
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
        ,"abbreviation" : "Sciss"
        ,"className" : "Skill_MoraScissors"
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
        ,"abbreviation" : "Fabri"
        ,"className" : "Skill_MoraFabric"
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
    ,"10100" : {
        "skillID" : 10100
        ,"name" : "handHack"
        ,"abbreviation" : "Hack"
        ,"className" : "Skill_HandHack"
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
    ,"10101" : {
    	"skillID" : 10101
    	,"name" : "fadingSteps"
        ,"abbreviation" : "Step"
        ,"className" : "Skill_FadingSteps"
    	,"damage" : 0
        ,"costNV" : 50
        ,"range" : 24
        ,"attribution" : "physics"
        ,"triggerType" : "positive"
        ,"target" : "location"
        ,"sEffect" : null
        ,"adtEffect" : "speedup"
        ,"adtEffectVal" : 0.3
        ,"adtEffectTime" : 5000
        ,"skillCD" : 5000
        ,"lvUPMod" : {
        	"skillCD" : -1
        }
    }
    ,"10102" : {
    	"skillID" : 10102
    	,"name" : "patheticChildhood"
        ,"abbreviation" : "Child"
        ,"className" : "Skill_PatheticChildhood"
    	,"damage" : 120
        ,"costNV" : 130
        ,"range" : 6
        ,"attribution" : "attribution"
        ,"attributionType" : "lightening"
        ,"triggerType" : "positive"
        ,"target" : "single"
        ,"sEffect" : null
        ,"adtEffect" : "paralysis"
        ,"adtEffectVal" : null
        ,"adtEffectTime" : 6000
        ,"skillCD" : 8000
        ,"lvUPMod" : {
        	"skillCD" : -1
        }
    }
    ,"10103" : {
    	"skillID" : 10103
    	,"name" : "flyingLighteningBall"
        ,"abbreviation" : "Light"
        ,"className" : "Skill_FlyingLighteningBall"
    	,"damage" : 250
        ,"costNV" : 130
        ,"range" : 24
        ,"attribution" : "attribution"
        ,"attributionType" : "lightening"
        ,"triggerType" : "positive"
        ,"target" : "single"
        ,"sEffect" : null
        ,"adtEffect" : null
        ,"adtEffectVal" : null
        ,"adtEffectTime" : null
        ,"skillCD" : 3000
        ,"lvUPMod" : {
        	"rangeFactor" : 0.1
        }
        ,"animationEffect" : "lightingball"
    }
};
