var Killua = Character.extend({
    init : function() {
        this._super();
        this.name = 'killua';
        this.type = 'char';        
        this.animateList = {
            'stand' : {
                'frames' : 2
                ,'duration' : 500
            }
            ,'attack' : {
                'frames' : 6
                ,'duration' : 100
            }
            ,'run' : {
                'frames' : 4
                ,'duration' : 150
            }
        };
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
    ,caculateAttackOffset : function() {
        var attackWidth = 65;
        var attackHeight = 100;
        this.attackOffsetX = (this.TILEWIDTH - attackWidth) / 2;
        this.attackOffsetY = attackHeight - this.HALFTILEHEIGHT - 15; //origin = 5
    }
});
