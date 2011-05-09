var Character = Coordinate.extend({
    init : function() {
        this._super();
        this.moveOrbit = [];
        this.isMoving = false;
    }
    ,initCanvas : function() {
        this.el = $("<canvas id='" + this.cID + "' style='position: absolute;'></canvas>");
        $('body').append(this.el);
        this.el = $("#" + this.cID)[0];
    }
    ,initStand : function(frames) {
        this.standImages = [];
        for (var i = 0; i < frames; ++i) {
            this.standImages.push(new Image);
            this.standImages[i].src = 'images/character/' + this.name.toLowerCase() + '/stand/' + this.type + '_' + this.name.toLowerCase() + '_' + i + '_s.png';
        }

        //Set Draw Frame Index
        this.standIndex = 0;
    }
    ,caculateTimeDesprite : function(data)
    {
        var date = new   Date();
        var milliseconds = date.getMilliseconds();
        var cNowTimestamp = Date.parse(date) + milliseconds;

        var timeDesprite = cNowTimestamp - data.timestamp;

        return timeDesprite;
    }
    ,startStand : function() {
        var _this = this;
        clearInterval(this.runInterval);
        this.drawStand(); //Fix Running Switch to stand's pause
        this.standInterval = setInterval(function(){ _this.drawStand(); }, 500);
    }
    ,setPosition : function(x, y) {
        this.x = x;
        this.y = y;
    }
    ,setWay : function(way) {
        this.way = way;
    }
    ,startWay : function() {
        this.wayIndex = 0;
        
        this.moveWay();
    }
    ,drawStand : function() {
        var c = this.el.getContext('2d');
        this.standWidth = this.standImages[0].width;
        //this.standWidth = 76;
        this.standHeight = this.standImages[0].height;
        //this.standHeight = 48;
        //Set Stand Canvas Width And Height
        this.el.width = this.standWidth;
        this.el.height = this.standHeight;

        c.clearRect(0, 0, this.standWidth, this.standHeight);

        this.standIndex = (this.standIndex < this.standImages.length - 1) ? this.standIndex + 1 : 0;
        c.drawImage(this.standImages[this.standIndex], 0, 0);
    }
    ,put : function() {
        var originalScreenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH;

        var screenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH + this.standOffsetX;
        var screenY = this.transferLogicToScreenY(this.x, this.y) - this.standOffsetY;
        
        $(this.el).css({left : screenX + 'px', top : screenY + 'px'});

        //this.ui.slotput(originalScreenX, screenY);
    }
    ,initRun : function(frames) {
        /* Running Animation Suit
         * leftup=7   up=0   rightup=1
         * left=6            right=2
         * leftdown=5 down=4 rightdown=3
         * */
        this.runImages = [];
        for (var directionID = 0; directionID < 8; ++directionID) {
            this.initRunSuit(frames, directionID);
        }
        //Set Draw Frame Index
        this.runIndex = 0;
    }
    ,initRunSuit : function(frames, directionID) {
        this.runImages[directionID] = [];
        for (var i = 0; i < frames; ++i) {
            this.runImages[directionID].push(new Image);
            this.runImages[directionID][i].src = 'images/character/' + this.name.toLowerCase() + '/run-s-' + directionID + '/' + this.name.toLowerCase() + '-run-' + i + '-s.png';
        }
    }
    ,startRun : function() {
        var _this = this;
        this.clearAnimation();
        this.runInterval = setInterval(function(){
            _this.drawRun();
        }, 100);
    }
    ,drawRun : function(){
        var c = this.el.getContext('2d');
        var suit = this.runImages[this.directionID];
        this.runWidth = suit[0].width;
        this.runHeight = suit[0].height;
        this.el.width = this.runWidth;
        this.el.height = this.runHeight;

        c.clearRect(0, 0, this.runWidth, this.runHeight);

        this.runIndex = (this.runIndex < suit.length - 1) ? this.runIndex + 1 : 0;
        c.drawImage(suit[this.runIndex], 0, 0);
    }
    ,clearAnimation : function() {
        clearInterval(this.standInterval);
        clearInterval(this.runInterval);
    }
    /*
     *  OLD CHARMOVING PATTERN
     * ,charMove : function(startPoint, endPoint){
        var startXY = this.getCoordinateXY(startPoint);
        var endXY = this.getCoordinateXY(endPoint);
        //check character is moving 
        if (this.characterMoving) {
            this.setNewDestinationTigger = true;
            this.nextWayEndX = endXY.x;
            this.nextWayEndY = endXY.y;
            return;
        }
        //start move
        GI.findWay.setStart(startXY.x, startXY.y);
        GI.findWay.setEnd(endXY.x, endXY.y);
        GI.findWay.reset();
        var way = GI.findWay.getWay();
        this.setWay(way);
        this.startWay();
    }
    */
    ,charMove : function(data)
    {
        //var nextLocationXY = this.getCoordinateXY(nextLocation);
        //Reserve For Checking Moving Status
        //console.log(nextLocation);
        
        this.moveOrbit = [];
        var _this = this;
        this.moveOrbit.push(data);

        console.log(this.moveOrbit);

        if(!this.isMoving)
        {
            this.count = 0;
            this.isMoving = true;
            this.startRun();
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

        //var cNowLocation = this.getCoordinateIndex(this.x,this.y);

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
            //var desXY = this.getCoordinateXY(nowOrbit.data.nowLocation);
            //this.x = desXY.x;
            //this.y = desXY.y;
            this.put();
            return;
        }

        this.count++;
        console.log(this.count);

        var sNowXY = this.getCoordinateXY(nowOrbit.data.nowLocation);
        var nextXY = this.getCoordinateXY(nowOrbit.data.nextLocation);

        /*
        var currentTimeDesprite = cNowTimestamp - nowOrbit.sTimestamp;

        if(sNowXY != cNowLocation)
        {
           if(this.timeDesprite < currentTimeDesprite)
           {
               cNowLocation = nowOrbit.sNowLocation;
               cNowLocationXY = this.getCoordinateXY(cNowLocation);
               this.x = cNowLocationXY.x;
               this.y = cNowLocationXY.y;
               this.put();
           }
        }
        */
        
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
                //_this.isMoving = false;
                _this.moveWay();
            }

        }, renderTime);
    }
});
