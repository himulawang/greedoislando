var Animation = Coordinate.extend({
    init : function(object){
    	this._super();
        this.object = object;
        this.cID = object.cID;
        this.name = object.name;
        this.action = 'stand';
        this.offset = object.offset;
        this.initPosition = object.initPos;
        this.x = this.initPosition.x;
        this.y = this.initPosition.y;
        this.canvasMoving = false;
        this.lastCanvasTimestamp = 0;
        this.directionID = 0;
        this.actionQueue = [];
        this.nowShift = null;
        this.getQueueTimeout = null;
        this.animateMaterials = [];
        this.nowAnimateImages = [];

        this.initCanvas();
        this.initAnimation();
        this.animationSwitch('stand');
        this.runCanvas();
        console.log('runCanvas');
        this.getQueueAction();
        this.put();
    }
    ,initCanvas : function(){
        this.el = $("<canvas id='" + this.cID + "' style='position: absolute;'></canvas>");
        $('body').append(this.el);
        this.el = $("#" + this.cID)[0];
        Event.onSelectTarget(this.el);
        this.canvas = this.el.getContext('2d');
    }
    ,initAnimation : function(){
        this.animateImages = GI.material.images[this.name];
    }
    ,addShift : function(data){
    	this.actionQueue.push(data);
    }
    ,getQueueAction : function() {
    	if (this.canvasMoving //last moving hasn't over
            || this.actionQueue.length === 0 //queue is empty
            || this.nowShift != null) { //now shift hasn't done
            var _this = this;
            this.getQueueTimeout = setTimeout(function() { _this.getQueueAction(); }, 10);
            return;
        };
    	
        this.nowShift = this.actionQueue.shift();
        
        if (this.nowShift.type === 'characterStand') {
            this.animationSwitch('stand');
            this.nowShift = null;
            this.put();
        } else if (this.nowShift.type === 'moveCharacter') {
            this.moveCanvasDuration = this.nowShift.data.duration;
            this.animationSwitch('run');
            this.moveCanvas();
        }
    }
    ,animationSwitch : function(action){
        this.action = action;
        this.canvasDuration = this.object.animateList[action].duration;
        this.canvasProgress = this.canvasDuration;
        this.moveProgress = 0;
    }
    //Inside Canvas
    ,runCanvas : function(){
        var timestamp = fc.getNowTimestamp();
        var _this = this;
        var timeDelta = this.lastCanvasTimestamp ? (timestamp - this.lastCanvasTimestamp) : 0;
        this.canvasProgress += timeDelta;
        this.lastCanvasTimestamp = timestamp;
        if(this.canvasProgress >= this.canvasDuration){
            this.canvasProgress = 0;
            var nowImageSuit = this.animateImages[this.action][this.directionID];
            this.animateWidth = nowImageSuit[0].width;
            this.animateHeight = nowImageSuit[0].height;
            this.el.width = this.animateWidth;
            this.el.height = this.animateHeight;
            this.animateIndex = (this.animateIndex < nowImageSuit.length - 1) ? this.animateIndex + 1 : 0;
            this.canvas.clearRect(0, 0, this.animateWidth, this.animateHeight);
            this.canvas.drawImage(nowImageSuit[this.animateIndex], 0, 0);
        }
        this.canvasAnimationID = requestAnimationFrame(function() { _this.runCanvas(); });
    }
    ,moveCanvas : function(){
        var timestamp = fc.getNowTimestamp();

        if (!this.canvasMoving) {
            this.canvasMoving = true;

            this.moveProgress = fc.getNowTimestamp();
            
            this.serverNowXY = this.getCoordinateXY(this.nowShift.data.nowLocation);
            this.serverNextXY = this.getCoordinateXY(this.nowShift.data.nextLocation);

            var directionRe = this.getTowardNewGridDirection(this.serverNextXY.x, this.serverNextXY.y);
            this.directionID = (directionRe != undefined) ? directionRe : this.directionID;

            this.nowScreenX = this.transferLogicToScreenX(this.serverNowXY.x,this.serverNowXY.y) - this.HALFTILEWIDTH + this.offset[this.action].x;
            this.nowScreenY = this.transferLogicToScreenY(this.serverNowXY.x,this.serverNowXY.y) - this.offset[this.action].y;

            var nextScreenX = this.transferLogicToScreenX(this.serverNextXY.x,this.serverNextXY.y) - this.HALFTILEWIDTH + this.offset[this.action].x;
            var nextScreenY = this.transferLogicToScreenY(this.serverNextXY.x,this.serverNextXY.y) - this.offset[this.action].y;

            this.displacementX = nextScreenX - this.nowScreenX;
            this.displacementY = nextScreenY - this.nowScreenY;
        }

        var deltaTime = timestamp - this.moveProgress;
        if (deltaTime <= this.moveCanvasDuration) {
            var _this = this;
            var nowDisplacementX = fc.fix(this.nowScreenX + deltaTime / this.moveCanvasDuration * this.displacementX);
            var nowDisplacementY = fc.fix(this.nowScreenY + deltaTime / this.moveCanvasDuration * this.displacementY);
        	$(this.el).css({ left : nowDisplacementX + 'px' , top : nowDisplacementY + 'px' });
            this.moveAnimationID = requestAnimationFrame(function() { _this.moveCanvas(); });
            return;
        }
            
        this.moveProgress = 0;
        this.x = this.serverNextXY.x;
        this.y = this.serverNextXY.y;
        this.canvasMoving = false;
        this.nowShift = null;
        return;
    }
    ,put : function() {
        var originalScreenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH;

        var screenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH + this.offset[this.action].x;
        var screenY = this.transferLogicToScreenY(this.x, this.y) - this.offset[this.action].y;

        $(this.el).css({left : screenX + 'px', top : screenY + 'px'});

        //this.ui.slotput(originalScreenX, screenY);
    }
});
