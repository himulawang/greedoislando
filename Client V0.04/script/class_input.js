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
            ,buff : this.buff
            ,addActionQueue : this.addActionQueue
            ,skillCDing : this.skillCDing
            ,teleport : this.teleport
        }
    }
    ,execute : function(stream) {
        //console.log(stream.type);
        this.PROCESS[stream.type](stream.data, stream);
    }
    /* Process Start */
    ,initMyCharacter : function(data, stream) {
        var cID = data.cID;
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
        }
        // init my character
        GI.player = eval('new '+ data.name); //TODO CHANGE TO ARRAY => CLASS
        GI.player.cID = cID;
        GI.player.setSelf();
        GI.player.make(data);
        // for GI.isSelf
        GI.cID = cID;
        // init skill
        GI.skill = {};
        for (var skillID in data.skill) {
            if (skillID < 10000) continue;
            GI.skill[skillID] = eval("new " + SKILL[skillID].className + "(" + skillID + ")");
        }
        GI.ui.skillbar.makeBar();
        // init keyboard event
        var keyCode = 49;
        for (skillID in data.skill) {
            if (skillID < 10000) continue;
            GI.keyboard.list[keyCode] = GI.skill[skillID];
            ++keyCode;
        }

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
    }
    ,newCharacterLogin : function(data, stream) {
        var cID = data.cID;
        if (GI.otherChar[cID]) return;
        GI.otherChar[cID] = eval('new ' + data.name);
        GI.otherChar[cID].make(data);
    }
    ,getOnlineCharacter : function(data, stream) {
        for (var cID in data) {
            if (GI.otherChar[cID] || GI.isSelf(cID)) continue;
            GI.otherChar[cID] = eval('new ' + data[cID].name);
            GI.otherChar[cID].make(data[cID]);
        }
    }
    ,hpChange : function(data, stream) {
        log.hpChange(data);
        var cID = data.cID;
        if (GI.isSelf(cID)) {
            GI.player.setHP(data.nowHP);
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
        log.skillMiss(data);
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
        	GI.player.actionQueue.add(stream);
            return;
        }
        GI.otherChar[cID].actionQueue.add(stream);
    }
    ,debuff : function(data, stream) {
        var cID = data.cID;
        var buff = new Buff(data);
        if (data.isOn === 1) {
            if (GI.isSelf(cID)) {
                GI.player.setBuff(buff);
            } else {
                GI.otherChar[cID].setBuff(buff);
            }
        } else if (data.isOn === 0) {
            if (GI.isSelf(cID)) {
                GI.player.delBuff(buff.getSourceCID(), buff.getSkillID());
            } else {
                GI.otherChar[cID].delBuff(buff.getSourceCID(), buff.getSkillID());
            }
        }
        log.debuff(data);
    }
    ,buff : function(data, stream) {
        var cID = data.cID;
        var buff = new Buff(data);
        if (data.isOn === 1) {
            if (GI.isSelf(cID)) {
                GI.player.setBuff(buff);
            } else {
                GI.otherChar[cID].setBuff(buff);
            }
        } else if (data.isOn === 0) {
            if (GI.isSelf(cID)) {
                GI.player.delBuff(buff.getSourceCID(), buff.getSkillID());
            } else {
                GI.otherChar[cID].delBuff(buff.getSourceCID(), buff.getSkillID());
            }
        }
        log.buff(data);
    }
    ,castSkill : function(data, stream) {
        var cID = data.cID;
        this.addActionQueue(data, stream);
        var skillID = data.skillID;
        if (GI.isSelf(cID)) {
            GI.skill[skillID].setCD();
        }
    }
    ,skillCDing : function(data, stream) {
        log.skillCDing(data);
    }
    ,teleport: function(data, stream) {
        this.addActionQueue(data, stream);
        log.teleport(data);
    }
});
