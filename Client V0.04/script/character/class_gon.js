var Gon = Character.extend({
    init : function() {
        this._super();
        this.name = 'gon';
        this.type = 'char';        
        this.animateList = {
            'stand' : {
                'frames' : 2
                ,'duration' : 500
            }
            /*,'attack' : {
                'frames' : 12
                ,'duration' : 500
            }*/
            ,'run' : {
                'frames' : 8
                ,'duration' : 100
            }
        };
    }
    ,make : function(data) {
        this.cID = data.cID;
        this.faceTo = data.faceTo;
        this.initPos = this.getCoordinateXY(data.position);

        this.caculateRunOffset();
        this.caculateStandOffset();

        this.offset = {
            run : {
                x : this.runOffsetX
                ,y : this.runOffsetY
            }
            ,stand : {
                x : this.standOffsetX
                ,y : this.standOffsetY
                
            }
        };
        
        this.timeDifference = this.getTimeDifference(data); // C/S Timestamp Difference

        this.setPosition(this.initPos.x,this.initPos.y);

        this.animation = new Animation(this);
        
        //this.ui = new UserInterface(this.cID);
    }
    ,caculateRunOffset : function() {
        var runWidth = 65;
        var runHeight = 100;
        this.runOffsetX = (this.TILEWIDTH - runWidth) / 2;
        this.runOffsetY = runHeight - this.HALFTILEHEIGHT - 15; //origin = 5
    }
    ,caculateStandOffset : function() {
        var standWidth = 40;
        var standHeight = 89;
        this.standOffsetX = (this.TILEWIDTH - standWidth) / 2 + 5;
        this.standOffsetY = standHeight - this.HALFTILEHEIGHT - 15; //origin = 5
    }
});
