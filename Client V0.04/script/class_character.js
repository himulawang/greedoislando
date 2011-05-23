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
        this.faceTo = data.faceTo;
        this.initPos = this.getCoordinateXY(data.position);

        this.caculateRunOffset();
        this.caculateStandOffset();
        this.caculateAttackOffset();
        this.offset = {
            run : {
                x : this.runOffsetX
                ,y : this.runOffsetY
            }
            ,stand : {
                x : this.standOffsetX
                ,y : this.standOffsetY
            }
            ,attack : {
                x : this.attackOffsetX
                ,y : this.attackOffsetY
            }
        };
        
        this.timeDifference = this.getTimeDifference(data); // C/S Timestamp Difference

        this.setPosition(this.initPos.x,this.initPos.y);

        if (this.self) {
            GI.ui.myStatus.setName(data.name);
        }
        this.animation = new Animation(this);
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
    ,setPosition : function(x, y) {
        this.x = x;
        this.y = y;
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
});
