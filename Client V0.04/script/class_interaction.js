var InteractionEntrance = Class.extend({
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
            this.charMoveQueue();
        }else if(e.type == "characterStand"){
            this.charMoveQueue();
        }else if(e.type == "keepSession"){
            this.getLag();
        }
    }
    ,getLag : function(){
        var lag = Date.now() - this.sd.timestamp;
        GI.lag = lag;
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
        $("#login").fadeOut(100,function(){
            $("#login").remove();
            $("#main").fadeIn(100,function(){
                $(".hiddenChar").show();
            });
        });
        
        GI.initMap();
        GI.map.initObstacle();
    }
    ,logOut : function(d){
        if(!GI.char) return;
        if(d.cID == GI.char.player.cID){
            alert("U R Logging Out!!!");
        }else{
            $("#" + d.data.cID).remove();
            $("#" + d.data.cID + "-hpslot").remove();
            $("#" + d.data.cID + "-manaslot").remove();
        }
    }
    ,charMoveQueue : function(){
        if(!GI.char) return;
        
        if(GI.char.player.cID == this.sd.cID)
        {
            //GI.char.player.charMove(this.e);
        	GI.char.player.animation.initTransfer(this.e);
        	GI.char.player.animation.transferAnimationSet(0);
        }
        else
        {
            if(!GI.otherChar) return;
            //GI.otherChar[this.sd.cID].charMove(this.e);
            GI.otherChar[this.sd.cID].animation.initTransfer(this.e);
        	GI.otherChar[this.sd.cID].animation.transferAnimationSet(0);
        }
    }
    
});
