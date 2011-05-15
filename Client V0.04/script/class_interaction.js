var Interaction= Class.extend({
    init : function(e){
        this.sd = e.data;
        this.e = e;
        if(e.type == "initMyCharacter"){
            this.generateMyChar();
            this.generateMapData();
        }else if(e.type == "newCharacterLogin" || e.type == "getOnlineCharacter"){
            this.generateOtherChar();
        }else if(e.type == "logout"){
            this.logOut(e);
        }else if(e.type == "moveCharacter"){
            this.charActionQueue();
        }else if(e.type == "characterStand"){
            this.charActionQueue();
        }else if(e.type == "keepSession"){
            this.getLag();
        }
    }
    ,getLag : function(){
        var lag = Date.now() - this.sd.timestamp;
        GI.lag = lag;
        $("#lag").html(lag + 'ms');
    }
    ,generateMyChar : function(){
        GI.createChar(this.sd);
    }
    ,generateOtherChar : function() {
        if($("#login").html()){
            for(x in this.sd){
                GI.createOtherChar(this.sd);
                $("#" + this.sd[x].cID).hide();
                $("#" + this.sd[x].cID).addClass("hiddenChar");
            }
        }else{
            GI.createOtherChar(this.sd);
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
        var cID = this.sd.cID;
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
