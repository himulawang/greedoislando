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
    console.log(stream.type);
    this.PROCESS[stream.type](stream.data, stream);
};
/* Process Start */
Input.prototype.initMyCharacter = function(data, stream) {
    var cID = data.cID;

    var character = GI.characterList.setMyPlayer(data);
    
    //TODO For hacking character position
    //character.setPosition(12, 6);

    GI.initMapList();
    GI.initLog();
    GI.initTimer();
    GI.initUI();

    $.remove($('#login'));
    $.show($('#main'));
};
Input.prototype.newCharacterLogin = function(data, stream) {
    GI.characterList.setPlayer(data);
};
Input.prototype.getOnlineCharacter = function(data, stream) {
    for (var cID in data) {
        if (GI.characterList.getPlayer(cID)) continue;
        GI.characterList.setPlayer(data);
    }
};
Input.prototype.hpChange = function(data, stream) {
    GI.log.hpChange(data);
    GI.characterList.getPlayer(data.cID).setHP(data.nowHP);
};
Input.prototype.nvChange = function(data, stream) {
    GI.log.nvChange(data);
    GI.characterList.getPlayer(data.cID).setNV(data.nowNV);
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
    var character = GI.characterList.getPlayer(data.cID);
    character.setHP(data.hp);
    character.setNV(data.nv);
};
Input.prototype.logout = function(data, stream) {
    var cID = data.cID;
    GI.characterList.delPlayer(cID);
    $.remove($("#" + cID));
};
Input.prototype.keepSession = function(data, stream) {
    var lag = Date.now() - data.timestamp;
    GI.lag = lag;
    $("#lag").innerHTML = lag + 'ms';
};
Input.prototype.addActionQueue = function(data, stream){
    console.log(data);
    GI.characterList.getPlayer(data.cID).actionQueue.add(stream);
};
Input.prototype.debuff = function(data, stream) {
    var cID = data.cID;
    var buff = new Buff(data);
    if (data.isOn === 1) {
        GI.characterList.getPlayer(cID).setBuff(buff);
    } else if (data.isOn === 0) {
        GI.characterList.getPlayer(cID).delBuff(buff.getSourceCID(), buff.getSkillID());
    }
    GI.log.debuff(data);
};
Input.prototype.buff = function(data, stream) {
    var cID = data.cID;
    var buff = new Buff(data);
    if (data.isOn === 1) {
        GI.characterList.getPlayer(cID).setBuff(buff);
    } else if (data.isOn === 0) {
        GI.characterList.getPlayer(cID).delBuff(buff.getSourceCID(), buff.getSkillID());
    }
    GI.log.buff(data);
};
Input.prototype.castSkill = function(data, stream) {
    GI.characterList.getPlayer(data.cID).castSkill(data);
};
Input.prototype.skillCDing = function(data, stream) {
    GI.log.skillCDing(data);
};
Input.prototype.teleport = function(data, stream) {
    this.addActionQueue(data, stream);
    GI.log.teleport(data);
};
