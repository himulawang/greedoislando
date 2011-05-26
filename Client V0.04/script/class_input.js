var Input = Class.extend({
    init : function(e){
        this.data = e.data;
        this.e = e;
        if(e.type === "initMyCharacter"){
            var cID = e.data.cID;
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
            this.generateMyChar();
            this.generateMapData();
        } else if (e.type === "newCharacterLogin" || e.type === "getOnlineCharacter"){
            this.generateOtherChar();
        } else if (e.type === "logout"){
            this.logOut(e);
        } else if (e.type === "moveCharacter"){
            this.charActionQueue();
        } else if (e.type === "characterStand"){
            this.charActionQueue();
        } else if (e.type === "keepSession"){
            this.getLag();
        } else if (e.type === "hpChange") {
            var cID = e.data.cID;
            if (cID === GI.char.player.cID) {
                GI.ui.myStatus.setHP(e.data.nowHP);
                return;
            }
            GI.otherChar[cID].setHP(e.data.nowHP);
        } else if (e.type === "nvChange") {
            var cID = e.data.cID;
            if (cID === GI.char.player.cID) {
                GI.ui.myStatus.setNV(e.data.nowNV);
                return;
            }
            GI.otherChar[cID].setNV(e.data.nowNV);
        } else if (e.type === "castSkill") {
            this.charActionQueue();
        } else if (e.type === "castSkillOutOfRange") {
            console.log(e);
        } else if (e.type === "commonCD") {
            console.log(e);
            console.log('CD:', e.cID);
        } else if (e.type === "statusChange") {
            console.log(e.type);
        } else if (e.type === "freeRecover") {
            var cID = e.data.cID;
            if (GI.char && GI.char.player && cID === GI.char.player.cID) {
                GI.ui.myStatus.setHP(e.data.hp);
                GI.ui.myStatus.setNV(e.data.nv);
                return;
            }
            GI.otherChar[cID].setHP(e.data.hp);
            GI.otherChar[cID].setNV(e.data.nv);
        } else if (e.type === "skillMiss") {
            console.log(e.type);
            console.log(e.data.skillID);
        }
    }
    ,getLag : function(){
        var lag = Date.now() - this.data.timestamp;
        GI.lag = lag;
        $("#lag").html(lag + 'ms');
    }
    ,generateMyChar : function(){
        GI.createChar(this.data);
    }
    ,generateOtherChar : function() {
        if($("#login").html()){
            for(x in this.data){
                GI.createOtherChar(this.data);
                $("#" + this.data[x].cID).hide();
                $("#" + this.data[x].cID).addClass("hiddenChar");
            }
        }else{
            GI.createOtherChar(this.data);
        }
    }
    ,generateMapData : function(){
        $("#login").fadeOut(100, function(){
            $("#login").remove();
            $("#main").fadeIn(100, function(){
                $(".hiddenChar").show();
            });
        });
        
        GI.initMap();
        GI.map.initObstacle();
    }
    ,logOut : function(d){
        if(!GI.char) return;
        var cID = d.data.cID;
        if(cID === GI.char.player.cID){
            alert("U R Logging Out!!!");
        }else{
            cancelRequestAnimationFrame(GI.otherChar[cID].animation.canvasAnimationID);
            cancelRequestAnimationFrame(GI.otherChar[cID].animation.moveAnimationID);
            delete GI.otherChar[cID];
            $("#" + cID).remove();
            $("#" + cID + "-hpslot").remove();
            $("#" + cID + "-manaslot").remove();
        }
    }
    ,charActionQueue : function(){
        if(!GI.char) return;
        var cID = this.data.cID;
        if(GI.char.player.cID === cID) {
        	GI.char.player.animation.addShift(this.e);
            GI.char.player.animation.getQueueAction();
        } else {
            if(!(GI.otherChar && GI.otherChar[cID])) return;
            GI.otherChar[cID].animation.addShift(this.e);
            GI.otherChar[cID].animation.getQueueAction();
        }
    }
});
