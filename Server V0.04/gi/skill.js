global.util = require('util');

var moraStone = require('skills/mora_stone')
	,moraScissors = require('skills/mora_scissors')
	,moraFabric = require('skills/mora_fabric');

var skill = function(character) {
	this.initSkill(character);
}

exports.create = function(character) {
	return new skill(character);
}

skill.prototype.skillList = fc.readFile("../config/skill.js");

skill.prototype.initSkill = function(character) {
	this.self = character;
	this.cID = this.self.getCID();
	this.dotTimer = 3000;
	this.skillCDTimeout = {};
	this.initIO();
}
skill.prototype.initIO = function() {
	this.io = io.create();
    this.io.setSelfCID(this.cID);
}
skill.prototype.getSkill = function(skillID) {
	return this.skillList[skillID];
}

//CAST PROC START
skill.prototype.castProc = function(skill, target) {
	this.target = target;
	this.io.addOutputData(this.cID, 'castSkill', 'logged', {cID : this.cID, target : this.target.cID, skillID : skill.skillID});
	this.setToCombat();
	this.castNVConsume(skill);
	return this.skillHit(skill);
}
skill.prototype.setToCombat = function() {
	this.self.setCombat();
	this.target.setCombat();
}
skill.prototype.castNVConsume = function(skill) {
	var preNV = this.self.getNV();
	var nowNV = this.self.subNV(skill.costNV);
	this.io.addOutputData(this.cID, 'nvChange', 'logged', {cID : this.cID, preNV : preNV, nowNV : nowNV, nvDelta : nowNV - preNV});
}
skill.prototype.skillHit = function(skill) {
	var targetDodgeRate = this.target.getDodgeRate();
	var hitted = this.self.hitProc(targetDodgeRate);
	if (hitted === 0) {
		this.io.addOutputData(this.cID, 'skillMiss', 'logged', {cID : this.cID , target : this.target.cID , skillID : skill.skillID});
	}
	return hitted;
}
//CAST PROC END

//CAST SKILL START
skill.prototype.castSkill = function(skill, target, chargeFactor) {
	//this.target = target;
	this.excuteSkillProc(skill, chargeFactor);
}
skill.prototype.excuteSkillProc = function(skill, chargeFactor) {
	this.pushDebuffList(skill);
	this.ooSkill = skill.name.create(chargeFactor);  //TODO
	this.io.response();
}
skill.prototype.excuteDamage = function(skill, chargeFactor) {
	var damage = this.getSkillDamage(skill, chargeFactor);
	var preHP = this.target.getHP();
	
	var hp = damage * (1 + this.self.atkRF)  - damage * this.target.defRF;   // Damage reduction formulation
    
	hp = fc.fix(hp);
    this.target.hp = (hp < this.target.hp) ? this.target.hp - hp : 0;
    this.io.addOutputData(this.cID, 'hpChange', 'logged', {cID : this.target.getCID(), preHP : preHP, nowHP : this.target.hp, hpDelta : this.target.hp - preHP});
    if (this.target.hp === 0) {
        clearTimeout(this.target.setFreeTimeout);
        this.target.setStatus(0);
        this.io.addOutputData(this.cID, 'statusChange', 'logged', {cID : this.target.getCID(), status : this.target.getStatus(), timestamp : fc.getTimestamp()});
    }
    //this.io.response();
}
skill.prototype.getSkillDamage = function(skill, chargeFactor) {
	return skill.damage * chargeFactor;
}
skill.prototype.getDebuffID = function(skill) {
    return this.cID + "_" + skill.skillID;
}
skill.prototype.pushDebuffList = function(skill) {
    var dID = this.getDebuffID(skill);
    if (!this.debuffList[dID]) {
        var debuff = { skillName : skill.name, debuff : skill.adtEffect, stack : 0 };
        this.target.debuffList[dID] = debuff;
    }
}
skill.prototype.getBuffID = function(skill) {
    return this.cID + "_" + skill.skillID;
}
skill.prototype.pushBuffList = function(skill) {
    var bID = this.getBuffID(skill);
    if (!this.buffList[bID]) {
        var buff = { skillName : skill.name, buff : skill.adtEffect, stack : 0 };
        this.target.buffList[dID] = buff;
    }
}
// CAST SKILL END

// CAST DIRECTLY SKILL START
skill.prototype.castDirectlySkill = function(skill, coordinate) {
	this.castDirectlySkillProc(skill, coordinate);
}
skill.prototype.castDirectlySkillProc = function(skill, coordinate) {
	this.ooSkill = skill.name.create(coordinate);  //TODO
	this.io.response();
}
skill.prototype.coordinateVerify = function(skill, coordinate) {
	var direction = giMap.getDirection(this.self.position, coordinate);
	var startXY = fc.getCoordinateXY(this.self.postion);
	var endXY = fc.getCoordinateXY(coordinate);
	var range = Math.max(Math.abs(startXY.x - endXY.y), Math.abs(startXY.y - endXY.y));
	var validLine = giMap.getLineCoordinateWithoutObstacle(this.self.position, direction, range);
	var len = validLine.length;
	var endGridIndex = (len === 0) ? this.target.position : validLine[len - 1];
	return endGridIndex;
}
// CAST DIRECTLY SKILL END

// SKILL CD START
skill.prototype.setSkillCD = function(skill) {
    if (skill.skillCD === null) return;
    if (!this.self.skillCDList[skill.skillID]) {
        this.self.skillCDList[skill.skillID] = { cdStatus : 0, cdTime : skill.skillCD };  // cdStatus : 0 = CDing
    }
    this.startSkillCDProc(skill);
}
skill.prototype.startSkillCDProc = function(skill) {
    var _this = this;
    this.skillCDTimeout[skill.skillID] = setTimeout(function(){  // For later Version : Some New skill reset the skillCD...
        delete _this.self.skillCDList[skill.skillID];
    }, skill.skillCD);
}
skill.prototype.getSkillCDList = function(skillID) {
    return this.self.skillCDList[skillID];
}
// SKILL CD END


// SKILL CHARGE START
skill.prototype.chargeStart = function(skillID) {
    this.self.skillCharge[skillID] = fc.getTimestamp();
}
skill.prototype.getChargeLevel = function(skillID) {
    var chargeTimeDelta = fc.getTimestamp() - this.self.skillCharge[skillID];
    var skillChargeLevel;
    if (chargeTimeDelta >= 0 && chargeTimeDelta < 1000) {
        skillChargeLevel = 1;
    } else if (chargeTimeDelta >= 1000 && chargeTimeDelta < 2000) {
        skillChargeLevel = 2;
    } else if (chargeTimeDelta >= 2000) {
        skillChargeLevel = 3;
    } else {
        return;
    }
    delete this.self.skillCharge[skillID]; // equal to this.self.skillCharge = {};
    return skillChargeLevel;
}
skill.prototype.getSkillChargeDamageFactor = function(skill, skillChargeLevel) {
    return skill.chargeLevel[skillChargeLevel]; // Fetch Charge Level Factor Mapping By skillID From Skill Setting
}
// SKILL CHARGE END





