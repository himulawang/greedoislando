var skill = require('./skill')
    ,system = fc.readFile('../config/system.js')
    ,systemBehv = require('./system')
    ,auraBehv = require('./aura');

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
    this.doAction = 0;  // 0 = stand , 1 = moving , 2 = castSkill , 3 = repel, 4 = paralysis, 5 = charge
    this.speedFactor = 1; // Init Speed  = 100%
    this.debuffList = {};
    this.buffList = {};
    this.skillCDList = {};    
    this.inCharge = 1; // Charge Status , 0 = inCharging , 1 = not inCharge
    this.skillCharge = {};
    this.charSkillID = { 10000 : 1 , 10001 : 1, 10002 : 1, 10003 : 1 };
    this.charAuraID = { 5000 : 1, 5001 : 1, 5002 : 1, 5003 : 1 }
    this.systemID = 100;
    this.charSkill = {};
    this.intSkill = {};
    this.system = system[this.systemID];
    
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

    // Time Counter START
    this.setFreeRecInterval = null;
    this.moveTimeout = null;
    this.commonCDTimeout = null;
    this.setFreeTimeout = null;

    this.skillCDTimeout = {};
    this.doSpeedUpTimeout = {};
    this.doSlowTimeout = {};
    this.doBleedTimeout = {};
    this.doRepelTimeout = {};
    this.doParalysisTimeout = {};
    // Time Counter END

    this.avbSkill();
    this.systemBehv = systemBehv.get(this); // ENHANCE SKILL BY SYSTEM
    this.auraBehv = auraBehv.get(this); // ENHANCE CHAR BY AURA
    this.freeRecover();
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
        ,skill : this.charSkill
        ,baseNein : this.baseNein
        ,x : this.x
        ,y : this.y
        ,timestamp : fc.getTimestamp()
    };
}
// Init Gon's Skill list
character.prototype.avbSkill = function() {
    for (var x in this.charSkillID) {
        this.intSkill[x] = new SKILLMAPPING[SKILL[x].className]();
        this.intSkill[x].initSkill(this);
        this.charSkill[x] = SKILL[x];
    }
    for (var x in this.charAuraID) {
        this.charSkill[x] = SKILL[x];
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
    this.setDoAction(1);
    this.moveWay();
}
character.prototype.moveWay = function() {
	if (this.doAction === 2 || this.doAction === 3 || this.doAction === 4) {
        this.characterMoving = false;
        this.nextXY = null;
        this.way = null;
        this.nextGridIndex = null;
        this.setDoAction(0);    // trigger for move / attack switch
        return;  // doAction pause the moving action for attacking
    }
    
    if (this.wayIndex >= this.way.length) {
        this.characterMoving = false;
        this.nextXY = null;
        this.way = null;
        this.nextGridIndex = null;
        this.setDoAction(0);    // trigger for move / attack switch
        io.addOutputData(this.cID, 'characterStand', 'logged', {cID : this.cID, timestamp : fc.getTimestamp(), nowLocation : this.position });
        io.response();
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
    io.addOutputData(this.cID, 'moveCharacter', 'logged', {cID : this.cID, nowLocation : this.position, nextLocation : this.nextGridIndex, duration : time, timestamp : fc.getTimestamp() });
    io.response();

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
character.prototype.getSkill = function(skillID) {
    return this.charSkill[skillID];
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
        io.addOutputData(_this.cID, 'statusChange', 'logged', {cID : this.cID, status : _this.getStatus(), timestamp : fc.getTimestamp()});
        io.response();
    }, this.freeDuration);
}
character.prototype.setCombat = function() {
    this.setStatus(2);
    io.addOutputData(this.cID, 'statusChange', 'logged', {cID : this.cID, status : this.getStatus(), timestamp : fc.getTimestamp()});
    io.response();
}
character.prototype.freeRecover = function() {
    var _this = this;
    this.setFreeRecInterval = setInterval(function(){
        if (_this.status != 1) return;
        var hpInc = fc.fix(_this.hpRecVal * ( 1 + _this.recRF ));
        var nvInc = fc.fix(_this.nvRecVal * ( 1 + _this.recRF ));
        _this.hp = (_this.hp + hpInc) < _this.maxHP ? fc.fix(_this.hp + hpInc) : _this.maxHP;
        _this.nv = (_this.nv + nvInc) < _this.maxNV ? fc.fix(_this.nv + nvInc) : _this.maxNV;
        io.addOutputData(this.cID, 'freeRecover', 'logged', {cID : this.cID, hp : _this.hp , hpRec : hpInc , nv : _this.nv , nvRec : nvInc });
        io.response();
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
character.prototype.getSkillCDList = function(skillID) {
    return this.skillCDList[skillID];
}
// CHECK IF CHARACTER IS AVAILABLE TO CAST SKILL START
character.prototype.castSelfCheck = function(skillID) {
    var checked = this.checkAlive() && this.checkCommonCD() && this.checkSkillCD(skillID) && this.checkSelfDoActionStatus();
	return checked;
}
character.prototype.checkAlive = function() {
	return this.getStatus();
}
character.prototype.checkCommonCD = function() {
	if (this.getcCD() === 0) {
		io.addOutputData(this.cID, 'commonCD', 'self', {cID : this.cID, timestamp : fc.getTimestamp()});
        io.response();
	}
	return this.getcCD();
}
character.prototype.checkSkillCD = function(skillID) {
	if (this.getSkillCDList(skillID)) {
		io.addOutputData(this.cID, 'skillCDing', 'self', {cID : this.cID, skillID : skillID, timestamp : fc.getTimestamp()});
        io.response();
        return 0;
	} else {
		return 1;
	}
}
character.prototype.checkSelfDoActionStatus = function() {
    if (this.doAction === 2 || this.doAction === 3 || this.doAction === 4) {
        return 0;
    } else {
        return 1;
    }
}
// CHECK IF CHARACTER IS AVAILABLE TO CAST SKILL END

// CHECK IF CHARACTER CAN CAST SKILL ON TARGET START
character.prototype.castTargetCheck = function(target, skill) {
	var checked = this.checkTargetAlive(target) && this.checkRange(io, target, skill) && this.checkNV(io, target, skill);
	return checked;
}
character.prototype.checkTargetAlive = function(target) {
	return target.getStatus();
}
character.prototype.checkRange = function(target, skill) {
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
character.prototype.checkNV = function(target, skill) {
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

// CHECK IF CHARACTER CAN CAST SKILL ON THE LOCATION START
character.prototype.castLocationCheck = function(location, skill) {
    var checkRes = giMap.verifyClientLocationMovePossible(location) && this.verifyCastLocationRange(location, skill);
    return checkRes;
}
character.prototype.verifyCastLocationRange = function(location, skill) {
    var locationXY = fc.getCoordinateXY(location);
    var nowXY = fc.getCoordinateXY(this.getLocation());
    var range = Math.max(Math.abs(nowXY.x - locationXY.x), Math.abs(nowXY.y - locationXY.y));
    var inRange = (range > skill.range) ? false : true;
    return inRange;
}
// CHECK IF CHARACTER CAN CAST SKILL ON THE LOCATION END

character.prototype.selfTimeCounterDestroy = function() {
    fc.destroyTimeInterval(this.setFreeRecInterval);
    fc.destroyTimeout(this.moveTimeout);
    fc.destroyTimeout(this.commonCDTimeout);
    fc.destroyTimeout(this.setFreeTimeout);
    fc.destroyTimeout(this.skillCDTimeout);
    fc.destroyTimeout(this.doSpeedUpTimeout);
    fc.destroyTimeout(this.doSlowTimeout);
    fc.destroyTimeout(this.doBleedTimeout);
    fc.destroyTimeout(this.doRepelTimeout);
    fc.destroyTimeout(this.doParalysisTimeout);
}

exports.create = function(cID, name) {
    return new character(cID, name);
}
