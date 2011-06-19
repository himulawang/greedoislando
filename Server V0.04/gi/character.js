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
    this.dodgeRateAdd = 5; // Additional dodge Rate = 5% , Suppose
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
    this.charSkillID = {};
    this.charAuraID = { 5000 : 1, 5001 : 1, 5002 : 1, 5003 : 1 }
    this.systemID = 100;
    this.charSkill = {};
    this.charAura = {};
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

    this.selectChar();
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
        ,hitRate : this.basicHit + this.hitRateAdd
        ,dodgeRate : this.dodgeRateAdd
        ,hpRecovery : this.hpRecVal
        ,nvRecovery : this.nvRecVal
        ,skill : this.charSkill
        ,aura : this.charAura
        ,x : this.x
        ,y : this.y
        ,timestamp : fc.getTimestamp()
    };
}
character.prototype.selectChar = function() {
    if (this.name === 'Gon') {
        this.charSkillID = { 10000 : 1 , 10001 : 1, 10002 : 1, 10003 : 1 };
    } else if (this.name === 'Killua') {
        this.charSkillID = { 10100 : 1 , 10101 : 1, 10102 : 1, 10103 : 1 };
    }
}
// Init Gon's Skill list
character.prototype.avbSkill = function() {
    for (var x in this.charSkillID) {
        this.intSkill[x] = new SKILLMAPPING[SKILL[x].className]();
        this.intSkill[x].initSkill(this);
        this.charSkill[x] = SKILL[x];
    }
    for (var x in this.charAuraID) {
        this.charAura[x] = SKILL[x];
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
    this.setDoAction(1);

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
        io.addOutputData(_this.cID, 'statusChange', 'logged', {cID : _this.cID, status : _this.getStatus(), timestamp : fc.getTimestamp()});
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
        io.addOutputData(_this.cID, 'freeRecover', 'logged', {cID : _this.cID, hp : _this.hp , hpRec : hpInc , nv : _this.nv , nvRec : nvInc });
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

character.prototype.selfTimeCounterDestroy = function() {
    clearInterval(this.setFreeRecInterval);
    clearTimeout(this.moveTimeout);
    clearTimeout(this.commonCDTimeout);
    clearTimeout(this.setFreeTimeout);
    clearTimeout(this.skillCDTimeout);
    clearTimeout(this.doSpeedUpTimeout);
    clearTimeout(this.doSlowTimeout);
    clearTimeout(this.doBleedTimeout);
    clearTimeout(this.doRepelTimeout);
    clearTimeout(this.doParalysisTimeout);
}

// REQUEST CHAR PROFILE START
character.prototype.getSysteminfo = function(requesterCID) {
    var data = this.system[this.systemID];
    io.addOutputData(requesterCID, 'systemInfo', 'self', data);
    io.response();
}

character.prototype.getCharacterProfile = function(requesterCID) {
    var data = this.getInfo();
    io.addOutputData(requesterCID, 'systemInfo', 'self', data);
    io.response();
}
// REQUEST CHAR PROFILE END

character.prototype.stopMoving = function(value) {
    this.setDoAction(value);  // Trigger Event for Stop Moving 
    clearTimeout(this.moveTimeout);
}

character.prototype.beginStanding = function() {
    this.setDoAction(0);
    this.characterMoving = false;
    this.nextXY = null;
    this.way = null;
    this.nextGridIndex = null;
}

exports.create = function(cID, name) {
    return new character(cID, name);
}

