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
    this.status = 1; // 0 = dead , 1 = free , 2 = combat , 3 = criminal
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

    this.baseNein = {
        wrap : 1
        ,obstruct : 1
        ,charge : 1
        ,launch : 1
    }
    this.skill = {};
    //stoneScissorsCloth
    this.skill[10000] = skill.get(10000);
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
    return {
        5000 : 1
        ,5001 : 1
        ,5002 : 1
        ,5003 : 1
    };
}
character.prototype.auraRF = function(auraz) {   // auraz : array of all aura Reinforcement skillID
    var x;
    for(x in auraz) {
        this.skill[x] = skill.get(x);
    }
    this.defRF = this.skill[5000].auraRFVal + auraz[5000] * this.skill[5000].lvUpMod;
    this.atkRF = this.skill[5001].auraRFVal + auraz[5001] * this.skill[5001].lvUpMod;
    this.recRF = this.skill[5002].auraRFVal + auraz[5002] * this.skill[5002].lvUpMod;
    this.skillRF = this.skill[5003].auraRFVal + auraz[5003] * this.skill[5003].lvUpMod;
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
    if (this.wayIndex >= this.way.length) {
        this.characterMoving = false;
        this.nextXY = null;
        this.moveTimeout = null;
        this.way = null;
        this.nextGridIndex = null;
        stream.addOutputData(cID, 'characterStand', 'logged', {cID : cID, timestamp : fc.getTimestamp(), nowLocation : this.position });
        stream.response();
        
        return;
    }
    var _this = this;
    this.characterMoving = true;

    //get move one grid start coordinate and end coordinate
    this.nextGridIndex = this.way[this.wayIndex];
    this.nextXY = fc.getCoordinateXY(this.nextGridIndex);

    var time = GI_CHARACTER_MOVING_SPEED;
    this.directionID = this.getTowardNewGridDirection(this.nextXY.x, this.nextXY.y);
    if (this.directionID % 2 === 1) {
time *= 1.4;
    }

    //moveCharacter -> Other
    stream.addOutputData(cID, 'moveCharacter', 'logged', {cID : cID, nowLocation : this.position, nextLocation : this.nextGridIndex, duration : time, timestamp : fc.getTimestamp() });
    stream.response();

    this.moveTimeout = setTimeout(function(){
        if (_this.setNewDestinationTrigger) {
            _this.setNewDestinationTrigger = false;
            _this.startWay();
            return;
        }

        _this.setLocation(_this.nextGridIndex);

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
    if (this.hp == 0) {
        this.status = 0;
    }
    return this.hp;
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
        _this.status = 1;
        _this.freeRecover();
    }, this.freeDuration);
}
character.prototype.setCombat = function() {
    clearInterval(this.setFreeRecInterval);
    this.status = 2;
}
character.prototype.freeRecover = function() {
    var _this = this;
    if (this.status != 1) return;
    this.setFreeRecInterval = setInterval(function(){
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
exports.create = function(cID, name) {
    return new character(cID, name);
}
