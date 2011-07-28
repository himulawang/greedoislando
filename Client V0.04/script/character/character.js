var Character = function(name) {
    console.dir(this);
    this.super_(arguments);
    this.self = false;
    this.targeted = false;
};

util.inherits(Character, Map);

Character.prototype.make = function(data) {
    this.cID = data.cID;
    this.setHP(data.hp);
    this.setNV(data.nv);
    this.setMaxHP(data.maxHP);
    this.setMaxNV(data.maxNV);
    this.buff = {};
    this.faceTo = data.faceTo;
    this.setPosition(data.position);

    this.timeDifference = this.getTimeDifference(data); // C/S Timestamp Difference

    // init skill
    this.skill = {};
    this.effect = {};
    for (var skillID in data.skill) {
        if (skillID < 10000) continue;
        this.skill[skillID] = eval("new " + SKILL[skillID].className + "(" + skillID + ")");
        this.skill[skillID].make(this);
    }

    this.animation = new Animation_Character(this);
    this.actionQueue = new ActionQueue(this);

    if (this.self) {
        // init ui
        GI.ui.myStatus.setName(data.name);
        GI.ui.skillbar.makeBar();
        // init keyboard event
        var keyCode = 49;
        for (skillID in data.skill) {
            if (skillID < 10000) continue;
            GI.keyboard.list[keyCode] = this.skill[skillID];
            ++keyCode;
        }
    }
};
Character.prototype.getTimeDifference = function(data) {
    var cNowTimestamp = Date.now();
    return cNowTimestamp - data.timestamp;;
};
Character.prototype.setHP = function(hp) {
    this.hp = hp;
    if (this.self) {
        GI.ui.myStatus.setHP(hp);
    } else if (this.targeted){
        GI.ui.targetStatus.setHP(hp);
    }
};
Character.prototype.setNV = function(nv) {
    this.nv = nv;
    if (this.self) {
        GI.ui.myStatus.setNV(nv);
    } else if (this.targeted){
        GI.ui.targetStatus.setNV(nv);
    }
};
Character.prototype.setMaxHP = function(maxHP) {
    this.maxHP = maxHP;
};
Character.prototype.setMaxNV = function(maxNV) {
    this.maxNV = maxNV;
};
Character.prototype.setGCD = function(gCD) {
    this.gCD = gCD;
};
Character.prototype.setName = function(name) {
    this.name = name;
};
Character.prototype.setSkill = function(skill) {
    this.skill = skill;
};
Character.prototype.setBuff = function(buff) {
    var index = this.makeBuffIndex(buff.getSourceCID(), buff.getSkillID());
    this.buff[index] = buff;
    if (this.self) GI.ui.myStatus.setBuff(buff);
    if (this.targeted) GI.ui.targetStatus.setBuff(buff);
};
Character.prototype.delBuff = function(sourceCID, skillID) {
    var index = this.makeBuffIndex(sourceCID, skillID);
    delete this.buff[index];
    if (this.self) GI.ui.myStatus.delBuff(sourceCID, skillID);
    if (this.targeted) GI.ui.targetStatus.delBuff(sourceCID, skillID);
};
Character.prototype.makeBuffIndex = function(sourceCID, skillID) {
    return sourceCID + '-' + skillID;
};
Character.prototype.getHP = function() {
    return this.hp;
};
Character.prototype.getNV = function() {
    return this.nv;
};
Character.prototype.getMaxHP = function() {
    return this.maxHP;
};
Character.prototype.getMaxNV = function() {
    return this.maxNV;
};
Character.prototype.getGCD = function() {
    return this.gCD;
};
Character.prototype.getName = function() {
    return this.name;
};
Character.prototype.getPosition = function() {
    return { x : this.x, y : this.y };
};
Character.prototype.getPositionIndex = function() {
    return this.location;
};
Character.prototype.setPosition = function(x, y) {
    if (typeof(x) === 'number' && typeof(y) === 'number') {
        this.x = x;
        this.y = y;
        this.location = this.getCoordinateIndex(x, y);
        return;
    } else if (typeof(x) === 'string') {
        var xy = this.getCoordinateXY(x);
        this.x = xy.x;
        this.y = xy.y;
        this.location = x;
        return;
    }
    throw "invalid argument for character.setPostiion";
};
Character.prototype.setSelf = function() { //tag that this character is my character
    this.self = true;
};
Character.prototype.setTarget = function() {
    if (this.self) return;
    this.targeted = true;
};
Character.prototype.cancelTarget = function() {
    this.targeted = false;
};
//Actions
Character.prototype.moveCharacter = function() {
    this.animation.nowLocation = this.nowAction.nowLocation;
    this.animation.nextLocation = this.nowAction.nextLocation;
    this.animation.moveDuration = this.nowAction.duration;
    this.animation.switch('run');
};
Character.prototype.characterStand = function() {
    this.animation.switch('stand');
    this.actionQueue.clearNow();
    this.actionQueue.execute();
};
Character.prototype.castSkill = function(data) {
    var skillID = data.skillID;
    this.skill[skillID].cast(data);
};
Character.prototype.moveRepel = function() {
    this.animation.nowLocation = this.nowAction.nowLocation;
    this.animation.nextLocation = this.nowAction.endLocation;
    this.animation.moveDuration = this.nowAction.duration;
    this.animation.switch('repel');
};
Character.prototype.teleport = function() {
    this.setPosition(this.nowAction.endLocation);
    this.animation.switch('stand');
    this.actionQueue.clearNow();
    this.actionQueue.execute();
};
