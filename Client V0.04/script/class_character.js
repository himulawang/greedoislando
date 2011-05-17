var Character = Coordinate.extend({
    init : function() {
        this._super();
        this.self = false;
        this.targeted = false;
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

        if (this.self) {
            $("#hp-my-character").html(data.hp);
            $("#nv-my-character").html(data.nv);
            $("#avartar-my-character").html(data.name);
        }
        this.animation = new Animation(this);
        
        //this.ui = new UserInterface(this.cID);
    }
    ,getTimeDifference : function(data) {
        var cNowTimestamp = Date.now();
        return cNowTimestamp - data.timestamp;;
    }
    ,setPosition : function(x, y) {
        this.x = x;
        this.y = y;
    }
    ,setSelf : function() { //tag that this character is my character
        this.self = true;
    }
    ,setTarget : function() {
        if (this.self) return;
        this.targeted = true;
    }
    ,cancelTarget : function() {
        this.targeted = false;
    }
});
