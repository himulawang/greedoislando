var TERRAIN = [];

var InteractionEntrance = Class.extend({
    init : function(e){
        this.sd = e.data;
        if(e.type == "initMyCharacter"){
            this.generateChar();
        }else if(e.type == "map"){
            this.generateTerrainData();
        }
    }
    ,generateChar : function(){
        //if you want to use GI as a global variable, var this at the top of script
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
