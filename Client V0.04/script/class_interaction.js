var TERRAIN = [];
var InitPostion = [];
var InitfaceTo;

var InteractionEntrance = Class.extend({
    init : function(e){
        this.sd = e.data;
        if(e.type == "initMyCharacter"){
            this.generateChar(e.data.position,e.data.faceTo);
        }else if(e.type == "map"){
            this.generateTerrainData();
        }
    }
    ,generateChar : function(InitPos,InitFac){
        //if you want to use GI as a global variable, var this at the top of script
        var dotPos = InitPos.lastIndexOf(",");
        var PosStringLen = InitPos.length;
        InitPostion.x = Number(InitPos.substr(0,dotPos));
        InitPostion.y = Number(InitPos.substr(dotPos+1,PosStringLen));
        InitfaceTo = InitFac;
        GI = new Init;
    }
    ,generateTerrainData : function(){
        var ObsCoord;
        $("#login").fadeOut(100,function(){
            $("#login").remove();
            $("#main").fadeIn(100);
        });
        for(x in this.sd){
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
        }
    }
});
