var Character = Coordinate.extend({
    init : function() {
        this._super();
        this.self = false;
        this.targeted = false;
    }
    ,make : function(data) {
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
    }
    ,getTimeDifference : function(data) {
        var cNowTimestamp = Date.now();
        return cNowTimestamp - data.timestamp;;
    }
    ,setHP : function(hp) {
        this.hp = hp;
        if (this.self) {
            GI.ui.myStatus.setHP(hp);
        } else if (this.targeted){
            GI.ui.targetStatus.setHP(hp);
        }
    }
    ,setNV : function(nv) {
        this.nv = nv;
        if (this.self) {
            GI.ui.myStatus.setNV(nv);
        } else if (this.targeted){
            GI.ui.targetStatus.setNV(nv);
        }
    }
    ,setMaxHP : function(maxHP) {
        this.maxHP = maxHP;
    }
    ,setMaxNV : function(maxNV) {
        this.maxNV = maxNV;
    }
    ,setGCD : function(gCD) {
        this.gCD = gCD;
    }
    ,setName : function(name) {
        this.name = name;
    }
    ,setSkill : function(skill) {
        this.skill = skill;
    }
    ,setBuff : function(buff) {
        var index = this.makeBuffIndex(buff.getSourceCID(), buff.getSkillID());
        this.buff[index] = buff;
        if (this.self) GI.ui.myStatus.setBuff(buff);
        if (this.targeted) GI.ui.targetStatus.setBuff(buff);
    }
    ,delBuff : function(sourceCID, skillID) {
        var index = this.makeBuffIndex(sourceCID, skillID);
        delete this.buff[index];
        if (this.self) GI.ui.myStatus.delBuff(sourceCID, skillID);
        if (this.targeted) GI.ui.targetStatus.delBuff(sourceCID, skillID);
    }
    ,makeBuffIndex : function(sourceCID, skillID) {
        return sourceCID + '-' + skillID;
    }
    ,getHP : function() {
        return this.hp;
    }
    ,getNV : function() {
        return this.nv;
    }
    ,getMaxHP : function() {
        return this.maxHP;
    }
    ,getMaxNV : function() {
        return this.maxNV;
    }
    ,getGCD : function() {
        return this.gCD;
    }
    ,getName : function() {
        return this.name;
    }
    ,getPosition : function() {
        return { x : this.x, y : this.y };
    }
    ,getPositionIndex : function() {
        return this.location;
    }
    ,setPosition : function(x, y) {
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
    }
    ,setSelf : function() { //tag that this character is my character
        this.self = true;
    }
    ,setTarget : function() {
        if (this.self) return;
        this.targeted = true;
    }
    ,cancelTarget : function() {
        this.targeted = false;
    }
    //Actions
    ,moveCharacter : function() {
        this.animation.nowLocation = this.nowAction.nowLocation;
        this.animation.nextLocation = this.nowAction.nextLocation;
        this.animation.moveDuration = this.nowAction.duration;
        this.animation.switch('run');
    }
    ,characterStand : function() {
        this.animation.switch('stand');
        this.actionQueue.clearNow();
        this.actionQueue.execute();
    }
    ,castSkill : function(data) {
        var skillID = data.skillID;
        this.skill[skillID].cast(data);
    }
    ,moveRepel : function() {
        this.animation.nowLocation = this.nowAction.nowLocation;
        this.animation.nextLocation = this.nowAction.endLocation;
        this.animation.moveDuration = this.nowAction.duration;
        this.animation.switch('repel');
    }
    ,teleport : function() {
        this.setPosition(this.nowAction.endLocation);
        this.animation.switch('stand');
        this.actionQueue.clearNow();
        this.actionQueue.execute();
    }
});
