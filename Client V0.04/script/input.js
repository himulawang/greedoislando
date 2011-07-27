var Input = function() {
    this.PROCESS = {
        initMyCharacter : this.initMyCharacter
        ,newCharacterLogin : this.newCharacterLogin
        ,getOnlineCharacter : this.getOnlineCharacter
        ,logout : this.logout
        ,moveCharacter : this.addActionQueue
        ,characterStand : this.addActionQueue
        ,keepSession : this.keepSession
        ,hpChange : this.hpChange
        ,nvChange : this.nvChange
        ,castSkill : this.castSkill
        ,castSkillOutOfRange : this.castSkillOutOfRange
        ,commonCD : this.commonCD
        ,statusChange : this.statusChange
        ,freeRecover : this.freeRecover
        ,skillMiss : this.skillMiss
        ,moveRepel : this.addActionQueue
        ,debuff : this.debuff
        ,buff : this.buff
        ,addActionQueue : this.addActionQueue
        ,skillCDing : this.skillCDing
        ,teleport : this.teleport
    };
};

Input.prototype.execute = function(stream) {
    //console.log(stream.type);
    this.PROCESS[stream.type](stream.data, stream);
};
/* Process Start */
Input.prototype.initMyCharacter = function(data, stream) {
    var cID = data.cID;
    // init UI
    var myStatus = new UI_MyStatus(cID);
    var targetStatus = new UI_TargetStatus(cID);
    var communication = new UI_Communication(cID);
    var skillbar = new UI_SkillBar(cID);
    var chargebar = new UI_ChargeBar(cID);
    GI.ui = {
        myStatus : myStatus
        ,targetStatus : targetStatus
        ,communication : communication
        ,skillbar : skillbar
        ,chargebar : chargebar
    };

    // init my character
    GI.cID = cID;
    GI.character[cID] = eval('new '+ data.name); //TODO CHANGE TO ARRAY => CLASS
    var character = GI.character[cID];
    character.setSelf();
    character.make(data);
    
    //TODO For hacking character position
    character.setPosition(479, 479);

    // init map
    $("#login").fadeOut(100, function(){
        $("#login").remove();
        $("#main").fadeIn(100, function(){
            $(".hiddenChar").show();
        });
    });
    GI.initMap();
    // init log
    GI.initLog();
    // init timers
    GI.initTimer();
};
Input.prototype.newCharacterLogin = function(data, stream) {
    var cID = data.cID;
    var character = GI.character[cID];
    if (character) return;

    GI.character[cID] = eval('new ' + data.name); //TODO CHANGE TO ARRAY => CLASS
    GI.character[cID].make(data);
};
Input.prototype.getOnlineCharacter = function(data, stream) {
    for (var cID in data) {
        if (GI.character[cID]) continue;
        GI.character[cID] = eval('new ' + data[cID].name); //TODO CHANGE TO ARRAY => CLASS
        GI.character[cID].make(data[cID]);
    }
};
Input.prototype.hpChange = function(data, stream) {
    GI.log.hpChange(data);
    var cID = data.cID;
    GI.character[cID].setHP(data.nowHP);
};
Input.prototype.nvChange = function(data, stream) {
    GI.log.nvChange(data);
    var cID = data.cID;
    GI.character[cID].setNV(data.nowNV);
};
Input.prototype.castSkillOutOfRange = function(data, stream) {
};
Input.prototype.commonCD = function(data, stream) {
    GI.log.commonCD(data);
};
Input.prototype.skillMiss = function(data, stream) {
    GI.log.skillMiss(data);
};
Input.prototype.statusChange = function(data, stream) {
    GI.log.statusChange(data);
};
Input.prototype.freeRecover = function(data, stream) {
    var cID = data.cID;
    var character = GI.character[cID];
    character.setHP(data.hp);
    character.setNV(data.nv);
};
Input.prototype.logout = function(data, stream) {
    var cID = data.cID;
    var character = GI.character[cID];
    if (!character) return;
    cancelRequestAnimationFrame(character.animation.canvasAnimationID);
    cancelRequestAnimationFrame(character.animation.moveAnimationID);
    delete GI.character[cID];
    $("#" + cID).remove();
};
Input.prototype.keepSession = function(data, stream) {
    var lag = Date.now() - data.timestamp;
    GI.lag = lag;
    $("#lag").html(lag + 'ms');
};
Input.prototype.addActionQueue = function(data, stream){
    var cID = data.cID;
    GI.character[cID].actionQueue.add(stream);
};
Input.prototype.debuff = function(data, stream) {
    var cID = data.cID;
    var buff = new Buff(data);
    if (data.isOn === 1) {
        GI.character[cID].setBuff(buff);
    } else if (data.isOn === 0) {
        GI.character[cID].delBuff(buff.getSourceCID(), buff.getSkillID());
    }
    GI.log.debuff(data);
};
Input.prototype.buff = function(data, stream) {
    var cID = data.cID;
    var buff = new Buff(data);
    if (data.isOn === 1) {
        GI.character[cID].setBuff(buff);
    } else if (data.isOn === 0) {
        GI.character[cID].delBuff(buff.getSourceCID(), buff.getSkillID());
    }
    GI.log.buff(data);
};
Input.prototype.castSkill = function(data, stream) {
    GI.character[data.cID].castSkill(data);
};
Input.prototype.skillCDing = function(data, stream) {
    GI.log.skillCDing(data);
};
Input.prototype.teleport = function(data, stream) {
    this.addActionQueue(data, stream);
    GI.log.teleport(data);
};
