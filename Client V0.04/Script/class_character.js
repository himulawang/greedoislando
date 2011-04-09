var Character = Coordinate.extend({
    init : function(type, name, data) {
        this._super();
        this.type = type;
        this.name = name;
        this.cID = data.cID;
        this.faceTo = data.faceTo;
        this.initPos = this.getCoordinateXY(data.position);
        //this.initPos = data.position.split(',');
        this.CharAttribution = eval('new '+ this.name);
        this.setNewDestinationTigger = false;
        this.characterMoving = false;
        this.initCanvas();
        this.initStand(2);
        this.initRun(8);
        this.startStand();
        this.setPosition(this.initPos['x'],this.initPos['y']);
        this.ui = new UserInterface(this.cID);
        this.put();
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
            //this.standImages[i].src = 'xsl.jpg';
        }

        //Set Draw Frame Index
        this.standIndex = 0;
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
    ,moveWay : function() {
        //reach the final point
        if (this.wayIndex >= this.way.length) {
            this.startStand();
            this.put();
            this.characterMoving = false;
            return;
        }

        this.characterMoving = true;

        var _this = this;
        //get move one grid start coordinate and end coordinate
        var nextGridIndex = this.way[this.wayIndex];
        var nextXY = this.getCoordinateXY(nextGridIndex);

        //get toward direction to decide which animation shall use
        this.directionID = this.getTowardNewGridDirection(nextXY.x, nextXY.y);
        console.log(this.directionID);

        //get start grid screen X and Y
        //var nowScreenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH + (this.TILEWIDTH - this.standImages[0].width) / 2 + 5;
        //var nowScreenY = this.transferLogicToScreenY(this.x, this.y) - (this.standImages[0].height - this.HALFTILEHEIGHT) + 5;
        this.CharAttribution.runOffsetX = (this.CharAttribution.runOffsetX) ? (this.CharAttribution.runOffsetX) : (this.CharAttribution.standOffsetX);
        this.CharAttribution.runOffsetY = (this.CharAttribution.runOffsetY) ? (this.CharAttribution.runOffsetY) : (this.CharAttribution.standOffsetY);
        var nowScreenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH + this.CharAttribution.runOffsetX;
        var nowScreenY = this.transferLogicToScreenY(this.x, this.y) - this.CharAttribution.runOffsetY;

        //get next step grid screen X and Y
        var nextScreenX = this.transferLogicToScreenX(nextXY.x, nextXY.y) - this.HALFTILEWIDTH + this.CharAttribution.runOffsetX;
        var nextScreenY = this.transferLogicToScreenY(nextXY.x, nextXY.y) - this.CharAttribution.runOffsetY;

        //get ui Slot start grid screen X and Y
        var uiScreenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH;
        var uiScreenY = nowScreenY;

        //get displacement of this movement
        var displacementX = nextScreenX - nowScreenX;
        var displacementY = nextScreenY - nowScreenY;

        //use how much to do this movement
        var time = 500; //ms connect this value with Character's Speed
        if (this.directionID % 2 === 1) {
            time *= 1.4;
        }
        //render very 20ms
        var renderTime = 20; //ms
        //render how much times
        var cycle = time / renderTime;

        //calculate move how much long every renderTime
        var stepX = displacementX / time * renderTime;
        var stepY = displacementY / time * renderTime;
        
        //var new value for each renderTime
        var screenX = nowScreenX;
        var screenY = nowScreenY;

        //start running animation
        this.startRun();
        var i = 0;        
        this.moveInterval = setInterval(function() {
            screenX += stepX;
            screenY += stepY;
            uiScreenX += stepX;
            uiScreenY += stepY;
            
            $(_this.el).css({left : screenX + 'px', top : screenY + 'px'});
            _this.ui.slotput(uiScreenX, uiScreenY);

            ++i;

            if (i === cycle) {
                clearInterval(_this.moveInterval);
                _this.x = nextXY.x;
                _this.y = nextXY.y;

                //if user made a new way before last way wasn't ended
                if (_this.setNewDestinationTigger) {
                    //make new way
                    var InstanceFindWay = new FindWay;
                    InstanceFindWay.setStart(_this.x, _this.y);
                    InstanceFindWay.setEnd(_this.nextWayEndX, _this.nextWayEndY);
                    var way = InstanceFindWay.getWay();
                    _this.setWay(way);
                    _this.startWay();
                    //reset trigger
                    _this.setNewDestinationTigger = false;
                    return;
                }

                ++_this.wayIndex;
                _this.moveWay();
            }
        }, renderTime);
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

        this.CharAttribution.CalculateGonStandOffset(this.standWidth,this.standHeight);

        c.clearRect(0, 0, this.standWidth, this.standHeight);

        this.standIndex = (this.standIndex < this.standImages.length - 1) ? this.standIndex + 1 : 0;
        c.drawImage(this.standImages[this.standIndex], 0, 0);
    }
    ,put : function() {
        var originalScreenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH;

        //var screenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH + (this.TILEWIDTH - this.standImages[0].width) / 2 + 5;
        //var screenY = this.transferLogicToScreenY(this.x, this.y) - (this.standImages[0].height - this.HALFTILEHEIGHT) + 5;
        var screenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH + this.CharAttribution.standOffsetX;
        var screenY = this.transferLogicToScreenY(this.x, this.y) - this.CharAttribution.standOffsetY;
        
        $(this.el).css({left : screenX + 'px', top : screenY + 'px'});

        this.ui.slotput(originalScreenX, screenY);
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
            console.log('directionID:' + directionID + 'images/character/' + this.name.toLowerCase() + '/run-s-' + directionID + '/' + this.name.toLowerCase() + '-run-' + i + '-s.png');
        }
        
        this.CharAttribution.CalculateGonRunOffset(this.runImages[0][0].width,this.runImages[0][0].height);
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
        console.log(this.directionID);
        var suit = this.runImages[this.directionID];
        this.runWidth = suit[0].width;
        this.runHeight = suit[0].height;
        this.el.width = this.runWidth;
        this.el.height = this.runHeight;

        this.CharAttribution.CalculateGonRunOffset(this.runWidth,this.runHeight);

        c.clearRect(0, 0, this.runWidth, this.runHeight);

        this.runIndex = (this.runIndex < suit.length - 1) ? this.runIndex + 1 : 0;
        c.drawImage(suit[this.runIndex], 0, 0);
    }
    ,clearAnimation : function() {
        clearInterval(this.standInterval);
        clearInterval(this.runInterval);
    }
});
