var io = require('./io')
    ,skill = require('./skill')
    ,system = require('./system');

var character = function(cID, name) {
    /* 500 UpRight
     * 501 DownRight
     * 502 DownLeft
     * 503 UpLeft
     * */
    this.DIRECTIONS = {
        //deltaX,deltaY
        '0,-1' : 0
        ,'1,-1' : 1
        ,'1,0' : 2
        ,'1,1' : 3
        ,'0,1' : 4
        ,'-1,1' : 5
        ,'-1,0' : 6
        ,'-1,-1' : 7
    };    
    this.cID = cID;
    this.name = name;
    /* System Define List
     * 1 strengthening
     *
     * */
    this.systemID = this.getSystem(this.name);
    this.system = system.get(this.systemID);
    // Attribute Begin
    this.hp = 1000;
    this.maxHP = 1000;
    this.nv = 1500;
    this.maxNV = 1500;
    this.gCD = 1500; //ms
    this.basicHit = 75; // Basic Hit Rate = 75%
    this.hitRateAdd = 10; // Additional Hit Rate = 10% , Suppose
    this.dodgeRateAdd = 5; // Additional Hit Rate = 5% , Suppose
    // 0 = Dead , 1 = Free , 2 = Combat , 3 = Criminal , 4 = Invincible , 5 = KnockOut
    this.status = 1; 
    this.cCD = 1; // GCD status , 0 = CoolDowning , 1 = Cooledowned
    this.cDuration = 1500; // ms , GCD
    this.freeDuration = 5000; // ms , status to free
    this.recDuration = 3000; // ms , freerecover while not in combat
    this.hpRecVal = 10; // HP freerecover val
    this.nvRecVal = 10; // NV freerecover val
    this.defRF = 0;  // Defense Aura Reinforcement
    this.atkRF = 0;  // Attack Aura Reinforcement
    this.recRF = 0;  // Free Recover Aura Reinforcement
    this.skillRF = 0;  // Skill Power Aura Reinforcement
    this.doAction = 0;  // 0 = stand , 1 = moving , 2 = castSkill , 3 = repel
    this.speedFactor = 1; // Init Speed  = 100%
    this.dotTimer = 3000; // ms , take dot effect per 3s
    this.debuffList = {};
    this.buffList = {};
    this.skillCDList = {};    
    this.inCharge = 1; // Charge Status , 0 = inCharging , 1 = not inCharge
    this.skillCharge = {};
    
    this.baseNein = { wrap : 1, obstruct : 1, charge : 1,launch : 1 };

    this.skill = fc.readFile("../config/skill.js");
    this.intSkill = {};
    
    // Attribute End
    do {
        this.x = 12;
        this.y = 6;
        this.position = fc.getCoordinateIndex(this.x, this.y);
        if (giMap.verifyMovePossible(this.position)) break;
    } while (1);
    
    this.characterMoving = false;
    this.nextXY = null;
    this.way = null;
    this.nextGridIndex = null;

    this.setFreeTimeout = null;
    this.setFreeRecInterval = null;
    this.freeRecover();
    this.auraRF(this.getAura());
    this.systemRF();
    this.avbSkill();
}

character.prototype.getInfo = function() {
    return {
        cID : this.cID
        ,name : this.name
        ,hp : this.hp
        ,maxHP : this.maxHP
        ,nv : this.nv
        ,maxNV : this.maxNV
        ,gCD : this.gCD
        ,position : this.position
        ,hitRate : this.hitRate
        ,dodgeRate : this.dodgeRate
        ,recovery : this.recovery
        ,skill : this.skill
        ,baseNein : this.baseNein
        ,x : this.x
        ,y : this.y
        ,timestamp : fc.getTimestamp()
    };
}
character.prototype.getSystem = function(systemName) {
    // reserved for fetching character's system data info ...
    return 100;
}
character.prototype.getAura = function() {
    // reserved for fetching character's aura skill data info...
    return {
        5000 : 1
        ,5001 : 1
        ,5002 : 1
        ,5003 : 1
    };
}
// Init Gon's Skill list
character.prototype.avbSkill = function() {
    var charSkill = {
        10000 : 1
        ,10001 : 1
        ,10002 : 1
        ,10003 : 1
    };
    for (var x in charSkill) {
        this.intSkill[x] = new this.skill[x].name.create(this);
    }
}
character.prototype.auraRF = function(auraz) {   // auraz : array of all aura Reinforcement skillID
    this.defRF = this.skill[5000].auraRFVal + auraz[5000] * this.skill[5000].lvUpMod.auraRFVal;
    this.atkRF = this.skill[5001].auraRFVal + auraz[5001] * this.skill[5001].lvUpMod.auraRFVal;
    this.recRF = this.skill[5002].auraRFVal + auraz[5002] * this.skill[5002].lvUpMod.auraRFVal;
    this.skillRF = this.skill[5003].auraRFVal + auraz[5003] * this.skill[5003].lvUpMod.auraRFVal;
}
character.prototype.systemRF = function() {
    // reinforce skill power by NIEN system , judge by skill attribution & system reinforce type
    for (var x in this.skill) {
        if (this.skill[x].triggerType === 'aura') continue;
        if (this.system.sysRFType === this.skill[x].attribution) {
            this.skill[x].damage = ( this.skill[x].damage * ( 1 + this.system.sysRFVal ) ) * ( 1 + this.skillRF );
        }
    }
}
character.prototype.getCID = function() {
    return this.cID;
}
character.prototype.getLocation = function() {
    return this.position;
}
character.prototype.setLocation = function(index) {
    this.position = index;
    var xy = fc.getCoordinateXY(index);
    this.x = xy.x;
    this.y = xy.y;
}
character.prototype.setDoAction = function(action) {
    this.doAction = action;
}
character.prototype.setWay = function(way) {
    this.way = way;
}
character.prototype.getWay = function(getWay) {
    return this.way;
}
character.prototype.startWay = function() {
    this.wayIndex = 0;
    this.moveWay();
}
character.prototype.moveWay = function() {
	if (this.doAction === 2 || this.doAction === 3) return;  // doAction pause the moving action for attacking
	
    var cID = this.getCID();
    var stream = io.create();
    stream.setSelfCID(cID);
    
    if (this.wayIndex >= this.way.length) {
        this.characterMoving = false;
        this.nextXY = null;
        this.way = null;
        this.nextGridIndex = null;
        this.setDoAction('toStand');    // trigger for move / attack switch
        stream.addOutputData(cID, 'characterStand', 'logged', {cID : cID, timestamp : fc.getTimestamp(), nowLocation : this.position });
        stream.response();
        return;
    }
    var _this = this;
    this.characterMoving = true;

    //get move one grid start coordinate and end coordinate
    this.nextGridIndex = this.way[this.wayIndex];
    this.nextXY = fc.getCoordinateXY(this.nextGridIndex);

    var time = fc.fix(GI_CHARACTER_MOVING_SPEED / this.speedFactor); 
    this.directionID = this.getTowardNewGridDirection(this.nextXY.x, this.nextXY.y);
    if (this.directionID % 2 === 1) {
        time *= 1.4;
    }

    //moveCharacter -> Other
    stream.addOutputData(cID, 'moveCharacter', 'logged', {cID : cID, nowLocation : this.position, nextLocation : this.nextGridIndex, duration : time, timestamp : fc.getTimestamp() });
    stream.response();

    this.moveTimeout = setTimeout(function(){
        
        _this.setLocation(_this.nextGridIndex);

        if (_this.setNewDestinationTrigger) {
            _this.setNewDestinationTrigger = false;
            _this.startWay();
            return;
        }

        ++_this.wayIndex;
        _this.moveWay();
    }, time);
}
character.prototype.getTowardNewGridDirection = function(x, y) {
    var deltaX = x - this.x;
    var deltaY = y - this.y;
    var deltaIndex = fc.getCoordinateIndex(deltaX, deltaY);
    return this.DIRECTIONS[deltaIndex];
}
character.prototype.getSkillPower = function(skill) {
    return skill.damage;
}
//attribute
character.prototype.getHP = function() {
    return this.hp;
}
character.prototype.setHP = function(hp) {
    this.hp = (hp > this.maxHP) ? this.maxHP : hp;
    return this.hp;
}
character.prototype.addHP = function(hp) {
    var newHP = this.hp + hp;
    this.hp = (newHP > this.maxHP) ? this.maxHP : newHP;
    return this.hp;
}
character.prototype.subHP = function(damage, tangoAtkRF) {

    var hp = damage * (1 + tangoAtkRF)  - damage * this.defRF;   // Damage reduction formulation
    hp = fc.fix(hp);

    this.hp = (hp < this.hp) ? this.hp - hp : 0;
    if (this.hp === 0) {
        clearTimeout(this.setFreeTimeout);
        this.setStatus(0);
    }
    return this.hp;
}
character.prototype.setStatus = function(status) {
    this.status = status;
}
character.prototype.getNV = function() {
    return this.nv;
}
character.prototype.setNV = function(nv) {
    this.nv = (nv > this.maxNV) ? this.maxNV : nv;
    return this.nv;
}
character.prototype.addNV = function(nv) {
    var newNV = this.nv + nv;
    this.nv = (newNV > this.maxNV) ? this.maxNV : newNV;
    return this.nv;
}
character.prototype.subNV = function(nv) {
    this.nv = (nv < this.nv) ? this.nv - nv : 0;
    return this.nv;
}
character.prototype.getStatus = function() {
    return this.status;
}
//skill cast
character.prototype.getSkill = function(skillID) {
    return this.skill[skillID];
}
character.prototype.commonCD = function() {
    var _this = this;
    this.commonCDTimeout = setTimeout(function(){ 
        _this.cCD = 1;
    }, this.cDuration);
}
character.prototype.getcCD = function() {
    return this.cCD;
}
character.prototype.setFree = function() {
    var _this = this;
    clearTimeout(this.setFreeTimeout);
    this.setFreeTimeout = setTimeout(function(){ 
        if (_this.status === 0) return;
        _this.setStatus(1);
        var stream = io.create();
        var cID = _this.getCID();
        stream.setSelfCID(cID);
        stream.addOutputData(cID, 'statusChange', 'logged', {cID : cID, status : _this.getStatus(), timestamp : fc.getTimestamp()});
        stream.response();
    }, this.freeDuration);
}
character.prototype.setCombat = function() {
    this.setStatus(2);
    var stream = io.create();
    var cID = this.getCID();
    stream.setSelfCID(cID);
    stream.addOutputData(cID, 'statusChange', 'logged', {cID : cID, status : this.getStatus(), timestamp : fc.getTimestamp()});
    stream.response();
}
character.prototype.freeRecover = function() {
    var _this = this;
    this.setFreeRecInterval = setInterval(function(){
        if (_this.status != 1) return;
        var hpInc = fc.fix(_this.hpRecVal * ( 1 + _this.recRF ));
        var nvInc = fc.fix(_this.nvRecVal * ( 1 + _this.recRF ));
        _this.hp = (_this.hp + hpInc) < _this.maxHP ? fc.fix(_this.hp + hpInc) : _this.maxHP;
        _this.nv = (_this.nv + nvInc) < _this.maxNV ? fc.fix(_this.nv + nvInc) : _this.maxNV;
        var stream = io.create();
        var cID = _this.getCID();
        stream.setSelfCID(cID);
        stream.addOutputData(cID, 'freeRecover', 'logged', {cID : cID, hp : _this.hp , hpRec : hpInc , nv : _this.nv , nvRec : nvInc });
        stream.response();
    }, this.recDuration);
}
character.prototype.getDodgeRate = function() {
    return this.dodgeRateAdd;
}
character.prototype.hitProc = function(tangoDodgeRate) {
    var chance = this.basicHit + this.hitRateAdd - tangoDodgeRate;
    var rand = fc.random(100);
    var hit = (rand <= chance) ? 1 : 0;
    return hit;
}
character.prototype.doSkillAdtEffect = function(scID, skill, tPos) {
    this.pushDebuffList(scID, skill);
    if (skill.adtEffect === 'repel') {
        this.doRepel(scID, skill, tPos);
    } else if (skill.adtEffect === 'bleed') {
        this.startBleed(scID, skill, tPos);
    } else if (skill.adtEffect === 'slow') {
        this.doSlow(scID, skill, tPos);
    }
}
character.prototype.getDebuffID = function(scID, skill) {
    return scID + "_" + skill.skillID;
}
character.prototype.pushDebuffList = function(scID, skill) {
    var dID = this.getDebuffID(scID, skill);
    if (!this.debuffList[dID]) {
        var debuff = { skillName : skill.name, debuff : skill.adtEffect, stack : 0 };
        this.debuffList[dID] = debuff;
    }
}
character.prototype.getDebuffList = function() {
    return this.debuffList;
}
character.prototype.doRepel = function(scID, skill, tPos) {
    var _this = this;
    var lastStatus = this.getStatus();
    this.setStatus(5);
    this.setDoAction('toRepel');
    var direction = giMap.getDirection(this.position, tPos);
    var validLine = giMap.getLineCoordinateWithoutObstacle(this.position, direction, skill.adtEffectVal);
    var len = validLine.length;
    var endGridIndex = (len === 0) ? this.position : validLine[len - 1] ;

    var stream = io.create();
    var cID = this.getCID();
    var repelDuration = skill.adtEffectTime;

    stream.setSelfCID(cID);
    stream.addOutputData(cID, 'moveRepel', 'logged', {cID : cID, nowLocation : this.position, endLocation : endGridIndex, duration : repelDuration, timestamp : fc.getTimestamp() });
    stream.response();

    var dID = this.getDebuffID(skill.skillID);

    this.doRepelTimeout = setTimeout(function(){
        delete _this.debuffList[dID];
        _this.setStatus(lastStatus);
        _this.setLocation(endGridIndex);
        _this.setDoAction(0);
    }, repelDuration);

}
character.prototype.startBleed = function(scID, skill, tPos) {
    var _this = this;

    var stream = io.create();
    var cID = this.getCID();
    stream.setSelfCID(cID);

    var dID = this.getDebuffID();

    if (this.debuffList[dID].stack < 5) {
        ++this.debuffList[dID].stack;
    }

    var doTimes = skill.adtEffectTime / this.dotTimer;

    stream.addOutputData(cID, 'debuff', 'logged', { cID : cID, sourceCID : scID, skillID : skill.skillID, last : skill.adtEffectTime ,effect : skill.adtEffect, stack : this.debuffList[dID].stack , isOn : 1 });
    stream.response();

    this.dotCounts = 0;
    
    if (this.debuffList[dID].stack > 1) return;

    this.doBleed(scID, skill, doTimes);
}
character.prototype.doBleed = function(scID, skill, doTimes) {
    var _this =this;
    
    var stream = io.create();
    var cID = this.getCID();
    stream.setSelfCID(cID);
    var dID = this.getDebuffID();

    this.doBleedTimeout = setTimeout(function(){
        _this.doDotDamage(scID, skill);
        _this.dotCounts++;
        if (_this.dotCounts === doTimes) {
            stream.addOutputData(cID, 'debuff', 'logged', { cID : cID, sourceCID : scID, skillID : skill.skillID, last : skill.adtEffectTime ,effect : skill.adtEffect, stack : _this.debuffList[dID].stack , isOn : 0 });
            stream.response();
            _this.dotCounts = 0;
            delete _this.debuffList[dID];
            return;
        }
        _this.doBleed(scID, skill, doTimes);
    },this.dotTimer);
}
character.prototype.doDotDamage = function(scID, skill) {
    var dID = this.getDebuffID();
    var hp = skill.adtEffectVal * this.debuffList[dID].stack;   // No Damage reduction formulation for Dot
    hp = fc.fix(hp);
    var preHP = this.getHP();
    this.hp = (hp < this.hp) ? this.hp - hp : 0;
    if (this.hp === 0) {
        this.setStatus(0);
    }
    var stream = io.create();
    var cID = this.getCID();
    stream.setSelfCID(cID);
    // Dot Damage Data Stream
    stream.addOutputData(cID, 'hpChange', 'logged', {cID : cID, preHP : preHP, nowHP : this.hp, hpDelta : this.hp - preHP});
    stream.response();
}
character.prototype.doSlow = function(scID, skill, tPos) {
    var _this = this;
    var stream = io.create();
    var cID = this.getCID();
    stream.setSelfCID(cID);
    this.speedFactor = 1 - skill.adtEffectVal;
    stream.addOutputData(cID, 'debuff', 'logged', { cID : cID, sourceCID : scID, skillID : skill.skillID, last : skill.adtEffectTime ,effect : skill.adtEffect, stack : 1, isOn : 1 });
    stream.response();

    var dID = this.getDebuffID();

    this.doSlowTimeout = setTimeout(function(){
        _this.speedFactor = 1;
        delete _this.debuffList[dID];
        stream.addOutputData(cID, 'debuff', 'logged', { cID : cID, sourceCID : scID, skillID : skill.skillID, last : skill.adtEffectTime ,effect : skill.adtEffect, stack : 1, isOn : 0 });
        stream.response();
    }, skill.adtEffectTime);
}
character.prototype.setSkillCD = function(skill) {
    if (skill.skillCD === null) return;
    if (!this.skillCDList[skill.skillID]) {
        this.skillCDList[skill.skillID] = { cdStatus : 1, cdTime : skill.skillCD };  // cdStatus : 1 = CDing, Skill Unavailable 0 = CDed , Skill available
    }
    this.startSkillCDProc(skill);
}
character.prototype.startSkillCDProc = function(skill) {
    var _this = this;
    this.skillCDTimeout[skill.skillID] = setTimeout(function(){  // For later Version : Some New skill reset the skillCD...
        delete _this.skillCDList[skill.skillID];
    }, skill.skillCD);
}
character.prototype.getSkillCDList = function(skillID) {
    return this.skillCDList[skillID];
}
character.prototype.chargeStart = function(skillID) {
    this.skillCharge[skillID] = fc.getTimestamp();
}
character.prototype.getChargeLevel = function(skillID) {
    var chargeTimeDelta = fc.getTimestamp() - this.skillCharge[skillID];
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
    this.skillCharge = {};
    return skillChargeLevel;
}
character.prototype.getSkillChargeDamage = function(skillID, skillChargeLevel) {
    if (this.skill[skillID].chargeLevel) {
        return this.skill[skillID].chargeLevel[skillChargeLevel]; // Fetch Charge Level Factor Mapping By skillID From Skill Setting
    }
}
// CHECK IF CHARACTER IS AVAILABLE TO CAST SKILL START
character.prototype.castSelfCheck = function(io, skillID) {
	var checked = this.checkAlive() && this.checkCommonCD(io) && this.checkSkillCD(io, skillID);
	return checked;
}
character.prototype.checkAlive = function() {
	return this.getStatus();
}
character.prototype.checkCommonCD = function(io) {
	if (this.getcCD() === 0) {
		io.addOutputData(this.cID, 'commonCD', 'self', {cID : this.cID, timestamp : fc.getTimestamp()});
        io.response();
	}
	return this.getcCD();
}
character.prototype.checkSkillCD = function(io, skillID) {
	if (this.skill.getSkillCDList(skillID)) {
		io.addOutputData(this.cID, 'skillCDing', 'self', {cID : this.cID, skillID : skillID, timestamp : fc.getTimestamp()});
        io.response();
        return 0;
	} else {
		return 1;
	}
}
// CHECK IF CHARACTER IS AVAILABLE TO CAST SKILL END

// CHECK IF CHARACTER CAN CAST SKILL ON TARGET START
character.prototype.castTargetCheck = function(io, target, skill) {
	var checked = this.checkTargetAlive(target) && this.checkRange(io, target, skill) && this.checkNV(io, target, skill);
	return checked;
}
character.prototype.checkTargetAlive = function(target) {
	return target.getStatus();
}
character.prototype.checkRange = function(io, target, skill) {
	var targetLocation = target.getLocation();
	var range = giMap.getRange(this.position, targetLocation);
	
	if (range > skill.range + GI_SKILL_CAST_BLUR_RANGE) {
		io.addOutputData(this.cID, 'castSkillOutOfRange', 'self', {cID : this.cID, target : target.cID, skillID : skill.skillID});
        io.response();
        return 0;
	} else {
		return 1;
	}
}
character.prototype.checkNV = function(io, target, skill) {
	var nv = this.getNV();
	if (skill.costNV > nv) {
		io.addOutputData(this.cID, 'castSkillOutOfNV', 'self', {cID : this.cID, target : target.cID, skillID : skill.skillID});
        io.response();
        return 0;
	} else {
		return 1;
	}
}
// CHECK IF CHARACTER CAN CAST SKILL ON TARGET END

exports.create = function(cID, name) {
    return new character(cID, name);
}
