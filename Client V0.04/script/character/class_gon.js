var Gon = Character.extend({
    init : function() {
        this._super();
        this.name = 'Gon';
        this.type = 'char';        
    }
    ,make : function(data) {
        this.cID = data.cID;
        this.faceTo = data.faceTo;
        this.initPos = this.getCoordinateXY(data.position);

        this.caculateRunOffset();
        this.caculateStandOffset();

        var offset = {
            runOffsetX : this.runOffsetX
            ,runOffsetY : this.runOffsetY
            ,standOffsetX : this.standOffsetX
            ,standOffsetY : this.standOffsetY
        };
        
        this.timeDesprite = this.caculateTimeDesprite(data); // C/S Timestamp Difference

        //this.setNewDestinationTigger = false;
        //this.characterMoving = false;
        
        this.getCanvas();
        this.setPosition(this.initPos['x'],this.initPos['y']);
        this.put();

        this.animation = new Animation(this.cID,this.name,this.initPos['x'],this.initPos['y'],offset);
        this.animation.animationSwitch('stand');
        this.animation.runAnimation(0);
        
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
