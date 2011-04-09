// don't var things here. put them to main.js
var TERRAIN = [];

var InteractionEntrance = Class.extend({
    init : function(e){
        this.sd = e.data;
        console.log(this.sd);
        if(e.type == "initMyCharacter"){
            this.generateMyChar();
        }else if(e.type == "map"){
            this.generateTerrainData();
        }else if(e.type == "initCharacter"){
            this.generateOtherChar();
        }
    }
    ,generateMyChar : function(InitPos,InitFac){
        // ila : use this
        //InitPos = InitPos.split(',');
        //InitPosition.x = InitPos[0];
        //InitPosition.y = InitPos[1];
        //InitfaceTo = InitFac;
        GI.createChar(this.sd);
        //GI = new Init;
        /*
        var dotPos = InitPos.lastIndexOf(",");
        var PosStringLen = InitPos.length;
        InitPostion.x = Number(InitPos.substr(0,dotPos));
        InitPostion.y = Number(InitPos.substr(dotPos+1,PosStringLen));
        InitfaceTo = InitFac;
        GI = new Init;
        */
    }
    ,generateOtherChar : function() {
        GI.createOtherChar(this.sd);
    }
    ,generateTerrainData : function(){
        //var ObsCoord;
        $("#login").fadeOut(100,function(){
            $("#login").remove();
            $("#main").fadeIn(100);
        });
        console.log(this.sd);
        //ila this x should var first
        var x;
        for(x in this.sd){
            //ila : use this
            TERRAIN.push(JSON.stringify(
                { Obs : GI_TERRAIN_DEFINE[this.sd[x].objID], Coord : x }
            ));
            /*
            if(this.sd[x].objID == 2000){
                ObsCoord = { Obs : "plain", Coord : x };
                TERRAIN.push(JSON.stringify(ObsCoord));
            }else if(this.sd[x].objID == 2001){
                ObsCoord = { Obs : "BrokenWall" , Coord : x };
                TERRAIN.push(JSON.stringify(ObsCoord));
            }else if(this.sd[x].objID == 2002){
                ObsCoord = { Obs : "Tree", Coord : x };
                TERRAIN.push(JSON.stringify(ObsCoord));
            }else if(this.sd[x].objID == 2003){
                ObsCoord = { Obs : "Door", Coord : x };
                TERRAIN.push(JSON.stringify(ObsCoord));
            }
            else if(this.sd[x].objID == 2004){
                ObsCoord = { Obs : "River", Coord : x };
                TERRAIN.push(JSON.stringify(ObsCoord));
            }
            else if(this.sd[x].objID == 2005){
                ObsCoord = { Obs : "Ruins", Coord : x };
                TERRAIN.push(JSON.stringify(ObsCoord));
            }
            else if(this.sd[x].objID == 2006){
                ObsCoord = { Obs : "Bridge", Coord : x };
                TERRAIN.push(JSON.stringify(ObsCoord));
            }
            */
        }
        GI.initMap();
    }
});
