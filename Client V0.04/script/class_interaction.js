var InteractionEntrance = Class.extend({
    init : function(e){
        this.sd = e.data;
        console.log(this.sd);
        if(e.type == "initMyCharacter"){
            this.generateMyChar();
        }else if(e.type == "map"){
            this.generateMapData();
        }else if(e.type == "newCharacterLogin" || e.type == "getOnlineCharacter"){
            this.generateOtherChar();
        }else if(e.type == "logout"){
            this.logOut(e);
        }else if(e.type == "moveCharacter"){
            this.moveOtherChar();
        }
    }
    ,generateMyChar : function(InitPos,InitFac){
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
        GI.initFindWay();
    }
    ,logOut : function(d){
        if(d.cID == GI.char.player.cID){
            alert("U R Logging Out!!!");
        }else{
            $("#" + d.data.cID).remove();
            $("#" + d.data.cID + "-hpslot").remove();
            $("#" + d.data.cID + "-manaslot").remove();
        }
    }
    ,moveOtherChar : function(){
        GI.otherChar[this.sd.cID].charMove(this.sd.startPoint,this.sd.endPoint);
    }
});
