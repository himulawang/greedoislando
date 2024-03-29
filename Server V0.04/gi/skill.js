var skill = function() {}

skill.prototype.init = function(character) {
	this.self = character;
	this.cID = this.self.getCID();
	this.skill = SKILL[this.sID];
	this.chargeFactor = 1;
	this.dotTimer = 3000;
}
//TARGET CAST PROC START
skill.prototype.castProc = function() {    
	io.addOutputData(this.cID, 'castSkill', 'logged', {cID : this.cID, target : this.target.cID, skillID : this.skill.skillID});
    this.self.stopMoving(2);
	this.setToCombat();
	this.castNVConsume();
	return this.skillHit();
}
skill.prototype.posCastProc = function() {
    io.addOutputData(this.cID, 'castSkill', 'logged', {cID : this.cID, location : this.coordinate, skillID : this.skill.skillID});
    this.self.stopMoving(2);
	this.castNVConsume();
}
skill.prototype.setToCombat = function() {
	this.self.setCombat();
	this.target.setCombat();
}
skill.prototype.castNVConsume = function() {
	var preNV = this.self.getNV();
	var nowNV = this.self.subNV(this.skill.costNV);
	io.addOutputData(this.cID, 'nvChange', 'logged', {cID : this.cID, preNV : preNV, nowNV : nowNV, nvDelta : nowNV - preNV});
}
skill.prototype.skillHit = function() {
	var targetDodgeRate = this.target.getDodgeRate();
	var hitted = this.self.hitProc(targetDodgeRate);
	if (!hitted) {
        this.chargeFactor = 1;
        this.self.beginStanding();
        io.addOutputData(this.cID, 'skillMiss', 'logged', {cID : this.cID , target : this.target.cID , skillID : this.skill.skillID});
        io.response();
	}
	return hitted;
}
//TARGET CAST PROC END

//CAST SKILL START
skill.prototype.doDamage = function() {
	var damage = this.getSkillDamage();
	var preHP = this.target.getHP();
	var hp = damage * (1 + this.self.atkRF) - damage * this.target.defRF;   // Damage reduction formulation    
    hp = fc.fix(hp);
    this.target.hp = (hp < this.target.hp) ? this.target.hp - hp : 0;
    io.addOutputData(this.cID, 'hpChange', 'logged', {cID : this.target.cID, preHP : preHP, nowHP : this.target.getHP(), hpDelta : this.target.getHP() - preHP});
    if (this.target.getHP() === 0) {        
        this.target.setStatus(0);
        this.setCharDead();
    }
    this.setSkillCD();
    this.startSkillCDProc();
    this.setCommonCD();
    this.freeStatusCountDown();
    io.response();
    this.self.beginStanding();
    this.chargeFactor = 1;
}
skill.prototype.setCharDead = function() {
	clearTimeout(this.target.setFreeTimeout);
	io.addOutputData(this.cID, 'statusChange', 'logged', {cID : this.target.cID, status : this.target.getStatus(), timestamp : fc.getTimestamp()});
}
skill.prototype.getSkillDamage = function() {
    return this.skill.damage * this.chargeFactor * (1 + this.self.skillRF);
}
skill.prototype.getDebuffID = function(character) {
    return character.cID + "_" + this.skill.skillID;
}
skill.prototype.pushDebuffList = function(character) {
    var dID = this.getDebuffID(character);
    if (!character.debuffList[dID]) {
        var debuff = { skillName : this.skill.name, debuff : this.skill.adtEffect, stack : 0 };
        character.debuffList[dID] = debuff;
    }
}
skill.prototype.getBuffID = function(character) {
    return character.cID + "_" + this.skill.skillID;
}
skill.prototype.pushBuffList = function(character) {
    var bID = this.getBuffID(character);
    if (!character.buffList[bID]) {
        var buff = { skillName : this.skill.name, buff : this.skill.adtEffect, stack : 0 };
        character.buffList[bID] = buff;
    }
}
// CAST SKILL END

// CAST DIRECTLY SKILL START
skill.prototype.doTeleportCoordinateVerify = function() {
	var validLine = calc.getDirectRoute(this.self.position, this.coordinate);
	var len = validLine.length;
	var endGridIndex = (len === 0) ? this.self.position : validLine[len - 1];
	return endGridIndex;
}
// CAST DIRECTLY SKILL END

// SKILL CD START
skill.prototype.setSkillCD = function() {
    if (this.skill.skillCD === null) return;
    if (!this.self.skillCDList[this.skill.skillID]) {
        this.self.skillCDList[this.skill.skillID] = { cdStatus : 0, cdTime : this.skill.skillCD };  // cdStatus : 0 = CDing
    }
}
skill.prototype.startSkillCDProc = function() {
    var _this = this;
    this.self.skillCDTimeout[this.skill.skillID] = setTimeout(function(){  // For later to reset skillCD...
        delete _this.self.skillCDList[_this.skill.skillID];
    }, this.skill.skillCD);
}
// SKILL CD END

// SKILL CHARGE START
skill.prototype.chargeStart = function() {
    io.addOutputData(this.cID, 'characterStand', 'logged', {cID : this.cID, timestamp : fc.getTimestamp(), nowLocation : this.self.position });
    io.response();
    this.self.stopMoving(5);
    this.self.skillCharge[this.skill.skillID] = fc.getTimestamp();
}
skill.prototype.setChargeLevel = function() {
    var chargeTimeDelta = fc.getTimestamp() - this.self.skillCharge[this.skill.skillID];
    var skillChargeLevel;
    if (chargeTimeDelta >= 0 && chargeTimeDelta < 1000) {
        skillChargeLevel = 0.5;
    } else if (chargeTimeDelta >= 1000 && chargeTimeDelta < 2000) {
        skillChargeLevel = 1.5;
    } else if (chargeTimeDelta >= 2000) {
        skillChargeLevel = 2;
    } else {
        return;
    }
    delete this.self.skillCharge[this.skill.skillID]; // equal to this.self.skillCharge = {};
    this.chargeFactor = skillChargeLevel;
    this.self.beginStanding();
}
// SKILL CHARGE END

// COMMONCD START
skill.prototype.setCommonCD = function() {
	this.self.cCD = 0;  // GCD -- cant use skill in the next 1.5s
	this.self.commonCD();  // 1.5s CoolDown Proc begins
}
// COMMONCD END

// Set to Free START
skill.prototype.freeStatusCountDown = function() {
	this.self.setFree();  // 10s later set self status to free
    this.target.setFree();  // 10s later set tango status to free
}
// Set to Free END

// CHECK IF CHARACTER CAN CAST SKILL ON TARGET START
skill.prototype.castTargetCheck = function() {
	var checked = this.checkTargetAlive() && this.checkRange() && this.checkNV();
	return checked;
}
skill.prototype.checkTargetAlive = function() {
	return this.target.getStatus();
}
skill.prototype.checkRange = function() {
    var range = calc.getRange(this.self.getLocation(), this.target.getLocation());
	
	if (range > this.skill.range + GI_SKILL_CAST_BLUR_RANGE) {
		io.addOutputData(this.cID, 'castSkillOutOfRange', 'self', {cID : this.cID, skillID : this.skill.skillID, timestamp : fc.getTimestamp()});
        io.response();
        return 0;
	} else {
		return 1;
	}
}
skill.prototype.checkNV = function() {
	var nv = this.self.getNV();
	if (this.skill.costNV > nv) {
		io.addOutputData(this.cID, 'castSkillOutOfNV', 'self', {cID : this.cID, skillID : this.skill.skillID, timestamp : fc.getTimestamp()});
        io.response();
        return 0;
	} else {
		return 1;
	}
}
// CHECK IF skill CAN CAST SKILL ON TARGET END

// CHECK IF CHARACTER CAN CAST SKILL ON THE LOCATION START
skill.prototype.castLocationCheck = function() {
    var checkRes = map[this.self.mapArea].verifyClientLocationMovePossible() && this.verifyCastLocationRange() && this.checkNV();
    return checkRes;
}
skill.prototype.verifyCastLocationRange = function() {
    var range = calc.getRange(this.self.getLocation(), this.coordinate);
    if (range > this.skill.range) {
		io.addOutputData(this.cID, 'castSkillOutOfRange', 'self', {cID : this.cID, skillID : this.skill.skillID, timestamp : fc.getTimestamp()});
        io.response();
        return 0;
	} else {
		return 1;
	}
}
// CHECK IF CHARACTER CAN CAST SKILL ON THE LOCATION END

global.Skill = skill;
