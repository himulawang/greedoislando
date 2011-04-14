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
        }
    }
    ,generateMyChar : function(InitPos,InitFac){
        GI.createChar(this.sd);
    }
    ,generateOtherChar : function() {
        if($("#login").html()){
            GI.createOtherChar(this.sd);
            $("#" + this.sd.cID).hide();
            $("#" + this.sd.cID).addClass("hiddenChar");
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

        GI.initMap(this.sd);
        GI.initFindWay();
    }
    ,logOut : function(e){
        if(e.cID == GI.char.player.cID){
            alert("U R Logging Out!!!");
        }else{
            $("#" + e.cID).remove();
            $("#" + e.cID + "-hpslot").remove();
            $("#" + e.cID + "-manaslot").remove();
        }
    }
});
