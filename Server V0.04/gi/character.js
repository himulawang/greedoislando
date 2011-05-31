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

    this.doActionList = {
        toStand : 0
        ,toMove : 1
        ,toAttack : 2
        ,toRepel : 3
    }

    this.baseNein = {
        wrap : 1
        ,obstruct : 1
        ,charge : 1
        ,launch : 1
    }
    this.skill = {};
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
    var x;
    for (x in charSkill) {
        this.skill[x] = skill.get(x);
    }
}
character.prototype.auraRF = function(auraz) {   // auraz : array of all aura Reinforcement skillID
    var x;
    for (x in auraz) {
        this.skill[x] = skill.get(x);
    }
    this.defRF = this.skill[5000].auraRFVal + auraz[5000] * this.skill[5000].lvUpMod.auraRFVal;
    this.atkRF = this.skill[5001].auraRFVal + auraz[5001] * this.skill[5001].lvUpMod.auraRFVal;
    this.recRF = this.skill[5002].auraRFVal + auraz[5002] * this.skill[5002].lvUpMod.auraRFVal;
    this.skillRF = this.skill[5003].auraRFVal + auraz[5003] * this.skill[5003].lvUpMod.auraRFVal;
}
character.prototype.systemRF = function() {
    // reinforce skill power by NIEN system , judge by skill attribution & system reinforce type
    var x;
    for (x in this.skill) {
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
    this.doAction = this.doActionList[action];
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
    var cID = this.getCID();
    var stream = io.create();
    stream.setSelfCID(cID);
    if (this.wayIndex >= this.way.length || this.doAction === 2 || this.doAction === 3) {   // doAction pause the moving action for attacking
        this.characterMoving = false;
        this.nextXY = null;
        this.moveTimeout = null;
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
        this.setDead();
    }
    return this.hp;
}
character.prototype.setDead = function() {
    //clearInterval(this.setFreeRecInterval);
    clearTimeout(this.setFreeTimeout);
    this.status = 0;
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
    setTimeout(function(){ _this.cCD = 1; }, this.cDuration);
}
character.prototype.getcCD = function() {
    return this.cCD;
}
character.prototype.setFree = function() {
    var _this = this;
    clearTimeout(this.setFreeTimeout);
    this.setFreeTimeout = setTimeout(function(){ 
        if (this.status === 0) return;
        _this.status = 1;
        var stream = io.create();
        var cID = _this.getCID();
        stream.setSelfCID(cID);
        stream.addOutputData(cID, 'statusChange', 'logged', {cID : cID, status : _this.getStatus(), timestamp : fc.getTimestamp()});
        stream.response();
    }, this.freeDuration);
}
character.prototype.setCombat = function() {
    //clearInterval(this.setFreeRecInterval);
    this.status = 2;
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
    this.pushDebuffList(scID, skill, tPos);
    if (skill.adtEffect === 'repel') {
        this.doRepel(scID, skill, tPos);
    } else if (skill.adtEffect === 'bleed') {
        this.startBleed(scID, skill, tPos);
    } else if (skill.adtEffect === 'slow') {
        this.doSlow(scID, skill, tPos);
    }
}
character.prototype.pushDebuffList = function(scID, skill, tPos) {
    var dID = scID + "_" + skill.skillID;
    if (!this.debuffList[dID]) {
        var debuff = { skillName : skill.name, debuff : skill.adtEffect, stack : 0 };
        this.debuffList[dID] = debuff;
    }
    this.getDebuffList();
}
character.prototype.getDebuffList = function() {
    return this.debuffList;
}
character.prototype.doRepel = function(scID, skill, tPos) {
    var _this = this;
    //var lastStatus = this.getStatus();
    //if (lastStatus === 0) return;
    //this.status = 5;
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

    var dID = scID + "_" + skill.skillID;

    setTimeout(function(){
        delete _this.debuffList[dID];
        //_this.status = lastStatus;
        _this.setLocation(endGridIndex);
        _this.setDoAction('toStand');
    }, repelDuration);

}
character.prototype.startBleed = function(scID, skill, tPos) {
    var _this = this;

    var stream = io.create();
    var cID = this.getCID();
    stream.setSelfCID(cID);

    var dID = scID + "_" + skill.skillID;

    if (this.debuffList[dID].stack < 5) {
        ++this.debuffList[dID].stack;
    }

    var doTimes = skill.adtEffectTime / this.dotTimer;

    stream.addOutputData(cID, 'debuff', 'logged', { cID : cID, sourcecID : scID, skillID : skill.skillID, last : skill.adtEffectTime ,effect : skill.adtEffect, stack : this.debuffList[dID].stack , isOn : 1 });
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

    var dID = scID + "_" + skill.skillID;

    setTimeout(function(){
        _this.doDotDamage(scID, skill);
        _this.dotCounts++;
        if (_this.dotCounts === doTimes) {
            stream.addOutputData(cID, 'debuff', 'logged', { cID : cID, sourcecID : scID, skillID : skill.skillID, last : skill.adtEffectTime ,effect : skill.adtEffect, stack : _this.debuffList[dID].stack , isOn : 0 });
            stream.response();
            _this.dotCounts = 0;
            delete _this.debuffList[dID];
            return;
        }
        _this.doBleed(scID, skill, doTimes);
    },this.dotTimer);
}
character.prototype.doDotDamage = function(scID, skill) {
    var dID = scID + "_" + skill.skillID;
    var hp = skill.adtEffectVal * this.debuffList[dID].stack;   // No Damage reduction formulation for Dot
    hp = fc.fix(hp);
    var preHP = this.getHP();
    this.hp = (hp < this.hp) ? this.hp - hp : 0;
    if (this.hp === 0) {
        this.setDead();
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
    stream.addOutputData(cID, 'debuff', 'logged', { cID : cID, sourcecID : scID, skillID : skill.skillID, last : skill.adtEffectTime ,effect : skill.adtEffect, stack : 1, isOn : 1 });
    stream.response();

    var dID = scID + "_" + skill.skillID;

    setTimeout(function(){
        _this.speedFactor = 1;
        delete _this.debuffList[dID];
        stream.addOutputData(cID, 'debuff', 'logged', { cID : cID, sourcecID : scID, skillID : skill.skillID, last : skill.adtEffectTime ,effect : skill.adtEffect, stack : 1, isOn : 0 });
        stream.response();
    }, skill.adtEffectTime);
}
exports.create = function(cID, name) {
    return new character(cID, name);
}
