var Input = Class.extend({
    init : function(){
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
            ,addActionQueue : this.addActionQueue
            ,skillCDing : this.skillCDing
        }
    }
    ,execute : function(stream) {
        //console.log(stream.type);
        this.PROCESS[stream.type](stream.data, stream);
    }
    /* Process Start */
    ,initMyCharacter : function(data, stream) {
        console.log(data);
        var cID = data.cID;
        var myStatus = new UI_MyStatus(cID);
        var targetStatus = new UI_TargetStatus(cID);
        var communication = new UI_Communication(cID);
        var skillbar = new UI_SkillBar(cID);
        GI.ui = {
            myStatus : myStatus
            ,targetStatus : targetStatus
            ,communication : communication
            ,skillbar : skillbar
        }
        // init my character
        GI.player = eval('new '+ data.name);
        GI.player.cID = cID;
        GI.player.setSelf();
        GI.player.make(data);
        // for GI.isSelf
        GI.cID = cID;
        // init skill
        GI.skill = {};
        for (var skillID in data.skill) {
            if (skillID < 10000) continue;
            GI.skill[skillID] = new Skill(data.skill[skillID]);
        }
        GI.ui.skillbar.makeBar();
        // init map
        $("#login").fadeOut(100, function(){
            $("#login").remove();
            $("#main").fadeIn(100, function(){
                $(".hiddenChar").show();
            });
        });
        GI.initMap();
        GI.initLog();
    }
    ,newCharacterLogin : function(data, stream) {
        var cID = data.cID;
        if (GI.otherChar[cID]) return;
        console.log('newCharacterLogin new ', cID);
        GI.otherChar[cID] = eval('new ' + data.name);
        GI.otherChar[cID].make(data);
    }
    ,getOnlineCharacter : function(data, stream) {
        for (var cID in data) {
            if (GI.otherChar[cID] || GI.isSelf(cID)) continue;
            console.log('getOnlineCharacter new ', cID);
            GI.otherChar[cID] = eval('new ' + data[cID].name);
            GI.otherChar[cID].make(data[cID]);
        }
    }
    ,hpChange : function(data, stream) {
        log.hpChange(data);
        var cID = data.cID;
        if (GI.isSelf(cID)) {
            GI.ui.myStatus.setHP(data.nowHP);
            return;
        }
        GI.otherChar[cID].setHP(data.nowHP);
    }
    ,nvChange : function(data, stream) {
        log.nvChange(data);
        var cID = data.cID;
        if (GI.isSelf(cID)) {
            GI.ui.myStatus.setNV(data.nowNV);
            return;
        }
        GI.otherChar[cID].setNV(data.nowNV);
    }
    ,castSkillOutOfRange : function(data, stream) {
    }
    ,commonCD : function(data, stream) {
        log.commonCD(data);
    }
    ,skillMiss : function(data, stream) {
    }
    ,statusChange : function(data, stream) {
        log.statusChange(data);
    }
    ,freeRecover : function(data, stream) {
        var cID = data.cID;
        if (GI.isSelf(cID)) {
            GI.player.setHP(data.hp);
            GI.player.setNV(data.nv);
            return;
        }
        GI.otherChar[cID].setHP(data.hp);
        GI.otherChar[cID].setNV(data.nv);
    }
    ,logout : function(data, stream) {
        var cID = data.cID;
        if (!GI.otherChar[cID]) return;
        cancelRequestAnimationFrame(GI.otherChar[cID].animation.canvasAnimationID);
        cancelRequestAnimationFrame(GI.otherChar[cID].animation.moveAnimationID);
        delete GI.otherChar[cID];
        $("#" + cID).remove();
    }
    ,keepSession : function(data, stream) {
        var lag = Date.now() - data.timestamp;
        GI.lag = lag;
        $("#lag").html(lag + 'ms');
    }
    ,addActionQueue : function(data, stream){
        var cID = data.cID;
        if(GI.isSelf(cID)) {
        	GI.player.animation.addShift(stream);
            GI.player.animation.getQueueAction();
            return;
        }
        //if(!(GI.otherChar && GI.otherChar[cID])) return;
        GI.otherChar[cID].animation.addShift(stream);
        GI.otherChar[cID].animation.getQueueAction();
    }
    ,debuff : function(data, stream) {
        log.debuff(data);
    }
    ,castSkill : function(data, stream) {
        log.castSkill(data);
        this.addActionQueue(data, stream);
    }
    ,skillCDing : function(data, stream) {
        log.skillCDing(data);
    }
});
