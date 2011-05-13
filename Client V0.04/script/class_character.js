var Character = Coordinate.extend({
    init : function() {
        this._super();
        this.moveOrbit = [];
        this.isMoving = false;
        this.progress = 0;
        this.lastStamp = 0;
    }
    ,caculateTimeDesprite : function(data)
    {
        var date = new   Date();
        var milliseconds = date.getMilliseconds();
        var cNowTimestamp = Date.parse(date) + milliseconds;

        var timeDesprite = cNowTimestamp - data.timestamp;

        return timeDesprite;
    }
    ,setPosition : function(x, y) {
        this.x = x;
        this.y = y;
    }
    ,getCanvas : function(){
        this.el = $("<canvas id='" + this.cID + "' style='position: absolute;'></canvas>");
        $('body').append(this.el);
        this.el = $("#" + this.cID)[0];
    }
    ,put : function() {
        var originalScreenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH;

        var screenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH + this.standOffsetX;
        var screenY = this.transferLogicToScreenY(this.x, this.y) - this.standOffsetY;
        
        $(this.el).css({left : screenX + 'px', top : screenY + 'px'});

        //this.ui.slotput(originalScreenX, screenY);
    }
    ,charMove : function(data)
    {        
        this.moveOrbit = [];
        var _this = this;
        this.moveOrbit.push(data);

        if(!this.isMoving)
        {
            this.isMoving = true;
            this.moveWay();
        }

    }
    ,moveWay : function()
    {
        clearTimeout(this.movingTimeout);
        var _this = this;

        var date = new Date();
        var milliseconds = date.getMilliseconds();
        var cNowTimestamp = Date.parse(date) + milliseconds;

        var nowOrbit = this.moveOrbit.shift();

        if(!nowOrbit)
        {
            this.movingTimeout = setTimeout(function(){_this.moveWay()},50);
            return;
        }

        if(nowOrbit.type == 'characterStand')
        {
            this.isMoving = false;
            this.startStand();
            this.put();
            return;
        }

        var sNowXY = this.getCoordinateXY(nowOrbit.data.nowLocation);
        var nextXY = this.getCoordinateXY(nowOrbit.data.nextLocation);
        
        console.log(this.x,this.y);
        
        var getDirectionFuncRe = this.getTowardNewGridDirection(nextXY.x,nextXY.y);
        this.directionID = (getDirectionFuncRe != undefined) ? getDirectionFuncRe : this.directionID;

        var nowScreenX = this.transferLogicToScreenX(sNowXY.x, sNowXY.y) - this.HALFTILEWIDTH + this.runOffsetX;
        var nowScreenY = this.transferLogicToScreenY(sNowXY.x, sNowXY.y) - this.runOffsetY;

        var nextScreenX = this.transferLogicToScreenX(nextXY.x, nextXY.y) - this.HALFTILEWIDTH + this.runOffsetX;
        var nextScreenY = this.transferLogicToScreenY(nextXY.x, nextXY.y) - this.runOffsetY;

        var uiScreenX = this.transferLogicToScreenX(sNowXY.x, sNowXY.y)- this.HALFTILEWIDTH;
        var uiScreenY = nowScreenY;

        var displacementX = nextScreenX - nowScreenX;
        var displacementY = nextScreenY - nowScreenY;

        var time = nowOrbit.data.duration;
        var renderTime = 20; // ms
        var cycle = Math.floor(time / renderTime);

        var stepX = displacementX / time * renderTime;
        var stepY = displacementY / time * renderTime;

        var screenX = nowScreenX;
        var screenY = nowScreenY;
        var i = 0;

        this.startRun();

        this.moveInterval = setInterval(function() {
            screenX += stepX;
            screenY += stepY;
            uiScreenX += stepX;
            uiScreenY += stepY;

            $(_this.el).css({left : screenX + 'px', top : screenY + 'px'});
            //_this.ui.slotput(uiScreenX, uiScreenY);

            ++i;

            if(i === cycle) {
                clearInterval(_this.moveInterval);
                _this.x = nextXY.x;
                _this.y = nextXY.y;
                _this.moveWay();
            }

        }, renderTime);
    }
});
