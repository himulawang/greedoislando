var Log = Class.extend({
    init : function() {
        this.el = $("#ui-chat-history");
        this.skill = {
            10000 : {
                skillID : 10000
                ,name : "rightStraightPunch"
                ,damage : 80
                ,costNV : 100
                ,range : 6
                ,attribution : "physics"
                ,triggerType : "positive"
                ,target : "single"
                ,sEffect : null
                ,adtEffect : null
                ,adtEffectVal : null
                ,adtEffectTime : null
                ,skillCD : null
                ,lvUPMod : {
                    damage : 30
                }
            }
            ,5000 : {
                skillID : 5000
                ,name : "warp"
                ,attribution : "physics"
                ,triggerType : "aura"
                ,target : "self"
                ,sEffect : null
                ,adtEffect : null
                ,adtEffectVal : null
                ,skillCD : null
                ,auraType : "defRF"
                ,auraRFVal : 0.05
                ,lvUpMod : {
                    auraRFVal : 0.05
                }
            }
            ,5001 : {
                skillID : 5001
                ,name : "obstruct"
                ,attribution : "physics"
                ,triggerType : "aura"
                ,target : "self"
                ,sEffect : null   //side effect
                ,adtEffect : null
                ,adtEffectVal : null
                ,skillCD : null
                ,auraType : "recRF"   
                ,auraRFVal : 0.1    // aura reinforce value
                ,lvUpMod : {
                    auraRFVal : 0.1
                }
            }
            ,5002 : {
                skillID : 5002
                ,name : "charge"
                ,attribution : "all"
                ,triggerType : "aura"
                ,target : "self"
                ,sEffect : null
                ,adtEffect : null
                ,adtEffectVal : null
                ,skillCD : null
                ,auraType : "atkRF"
                ,auraRFVal : 0.05
                ,lvUpMod : {
                    auraRFVal : 0.05
                }
            }
            ,5003 : {
                skillID : 5003
                ,name : "launch"
                ,attribution : "all"
                ,triggerType : "aura"
                ,target : "self"
                ,sEffect : null
                ,adtEffect : null
                ,adtEffectVal : null
                ,skillCD : null
                ,auraType : "skillRF"
                ,auraRFVal : 0.03
                ,lvUpMod : {
                    auraRFVal : 0.03
                }
            }
            ,10001 : {
                skillID : 10001
                ,name : "moraStone"
                ,damage : 200
                ,costNV : 200
                ,range : 6
                ,attribution : "physics"
                ,triggerType : "positive"
                ,target : "single"
                ,sEffect : null
                ,adtEffect : "repel"
                ,adtEffectVal : 6
                ,adtEffectTime : 200
                ,skillCD : 5
                ,lvUPMod : {
                    damage : 100
                }
            }
            ,10002 : {
                skillID : 10002
                ,name : "moraScissors"
                ,damage : 0
                ,costNV : 50
                ,range : 18
                ,attribution : "physics"
                ,triggerType : "positive"
                ,target : "single"
                ,sEffect : null
                ,adtEffect : "bleed"
                ,adtEffectVal : 50
                ,adtEffectTime : 15000
                ,skillCD : null
                ,lvUPMod : {
                    adtEffectVal : 10
                }
            }
            ,10003 : {
                skillID : 10003
                ,name : "moraFabric"
                ,damage : 30
                ,costNV : 100
                ,range : 24
                ,attribution : "physics"
                ,triggerType : "positive"
                ,target : "single"
                ,sEffect : null
                ,adtEffect : "slow"
                ,adtEffectVal : 0.7
                ,adtEffectTime : 5000
                ,skillCD : 10
                ,lvUPMod : {
                    adtEffectTime : 3
                }
            }
        }
        this.status = {
            0 : "Dead"
            ,1 : "Free"
            ,2 : "Combat"
            ,3 : "Criminal"
        }
    }
    ,log : function(info) {
        this.el.prepend('<div>' + info + '</div>');
    }
    ,truncateCID : function(cID) {
        return '[' + cID.substr(0, 4) + ']';
    }
    ,getSkillName : function(skillID) {
        return this.skill[skillID].name;
    }
    ,getStatusName : function(statusID) {
        return this.status[statusID];
    }
    ,castSkill : function(data) {
        var caster = this.truncateCID(data.cID);
        var target = this.truncateCID(data.target);
        var skillName = this.getSkillName(data.skillID);
        this.log(caster + ' castSkill ' + skillName + ' -> ' + target);
    }
    ,hpChange : function(data) {
        var object = this.truncateCID(data.cID);
        this.log(object + ' HP: ' + data.preHP + '->' + data.nowHP + ' Delta:' + data.hpDelta);
    }
    ,nvChange : function(data) {
        var object = this.truncateCID(data.cID);
        this.log(object + ' NV: ' + data.preNV + '->' + data.nowNV + ' Delta:' + data.nvDelta);
    }
    ,statusChange : function(data) {
        var object = this.truncateCID(data.cID);
        var statusName = this.getStatusName(data.status);
        this.log(object + ' Status -> ' + statusName);
    }
    ,commonCD : function(data) {
        var object = this.truncateCID(data.cID);
        this.log(object + ' is in CommonCD');
    }
    ,debuff : function(data) {
        var caster = this.truncateCID(data.sourcecID);
        var target = this.truncateCID(data.cID);
        var skillName = this.getSkillName(data.skillID);
        if (data.isOn) {
            this.log(target + ' get Debuff ' + skillName + ' from ' + caster);
        } else {
            this.log(target + ' Debuff ' + skillName + ' Disappear from ' + caster);
        }
    }
    ,castSkillOutOfRange : function(data) {
        var caster = this.truncateCID(data.cID);
        var target = this.truncateCID(data.target);
        var skillName = this.getSkillName(data.skillID);
        this.log(caster + ' castSkill ' + skillName + ' -> ' + target + ' Miss!!');
    }
    ,skillCDing : function(data) {
        var caster = this.truncateCID(data.cID);
        this.log(caster + ' skill ' + data.skillID + ' is cooling down');
    }
});
