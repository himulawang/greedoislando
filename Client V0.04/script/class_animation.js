var Animation = Coordinate.extend({
    /* animation offset formula
     * this.runOffsetX = (this.TILEWIDTH - runWidth) / 2;
     * this.runOffsetY = runHeight - this.HALFTILEHEIGHT - 15;
     * */        
    init : function(owner){
    	this._super();
        this.owner = owner;
        this.action = 'stand';

        this.animateList = ANIMATION_MATERIAL.character[this.owner.name].animateList;
        //Canvas Attribute
        this.moving = false; //canvas is moving
        this.actionSwitched = true; // character has change its action
        this.runOnce = false;

        //Canvas Moving Attribute
        this.moveStartStamp = 0;
        this.lastRunStamp = 0;
        this.getFrameDuration();
        this.moveDuration = 0;

        this.directionID = 0;

        this.initImages();
        this.initCanvas();
        this.runCanvas();
        this.put();
    }
    ,initImages : function(){
        this.images = GI.material.images[this.owner.name];
    }
    ,initCanvas : function() {
        var canvas = $("<canvas id='" + this.owner.cID + "' style='position: absolute;'></canvas>");
        $('body').append(canvas);
        this.el = $("#" + this.owner.cID);
        Event.onSelectTarget(this.el);
        this.canvas = this.el[0].getContext('2d');
    }
    ,switch : function(action) {
        /* run Canvas init start */
        if (this.action != action) {
            this.actionSwitched = true;
            this.runOnce = this.animateList[action].runOnce;
        }
        this.action = action;
        this.getFrameDuration();
        /* run Canvas init end */

        /* move Canvas init start */
        if (this.animateList[this.action].moveCanvas) {
            this.moveCanvas();
        } else {
            this.put();
        }
        /* move Canvas init end */
    }
    ,getFrameDuration : function() {
        this.runDuration = this.animateList[this.action].duration;
        this.frameDuration = fc.fix(this.runDuration / this.animateList[this.action].frames);
    }
    // move Canvas
    ,moveCanvas : function(){
        //1. get canvas ->>> new position displacement
        this.getMoveDisplacement();
        //2. move a little every frame
        this.drawMove();
    }
    ,getMoveDisplacement : function() {
        if (this.moving) return;
        this.moving = true;

        this.moveStartStamp = fc.getNowTimestamp();
        
        this.directionID = this.getDirection(this.nowLocation, this.nextLocation);

        // calculate displacement
        var serverNowXY = this.getCoordinateXY(this.nowLocation);
        this.serverNextXY = this.getCoordinateXY(this.nextLocation);

        var offsetX = this.animateList[this.action].offsetX;
        var offsetY = this.animateList[this.action].offsetY;

        this.nowScreenX = this.transferLogicToScreenX(serverNowXY.x, serverNowXY.y) - this.HALFTILEWIDTH + offsetX;
        this.nowScreenY = this.transferLogicToScreenY(serverNowXY.x, serverNowXY.y) - offsetY;

        var nextScreenX = this.transferLogicToScreenX(this.serverNextXY.x, this.serverNextXY.y) - this.HALFTILEWIDTH + offsetX;
        var nextScreenY = this.transferLogicToScreenY(this.serverNextXY.x, this.serverNextXY.y) - offsetY;

        this.displacementX = nextScreenX - this.nowScreenX;
        this.displacementY = nextScreenY - this.nowScreenY;
    }
    ,drawMove : function() {
        var deltaTime = fc.getNowTimestamp() - this.moveStartStamp;
        if (deltaTime > this.moveDuration) {
            this.stopMove();
            return;
        }

        var nowDisplacementX = fc.fix(this.nowScreenX + deltaTime / this.moveDuration * this.displacementX);
        var nowDisplacementY = fc.fix(this.nowScreenY + deltaTime / this.moveDuration * this.displacementY);
        this.el.css({ left : nowDisplacementX + 'px' , top : nowDisplacementY + 'px' });

        var _this = this;
        this.moveAnimationID = requestAnimationFrame(function() { _this.drawMove(); });
    }
    ,stopMove : function() {
        this.moveStartStamp = 0;
        this.owner.setPosition(this.serverNextXY.x, this.serverNextXY.y);
        this.moving = false;

        this.owner.actionQueue.clearNow();
        this.owner.actionQueue.execute();
    }
    // run Canvas inside animation
    ,runCanvas : function(){
        this.lastRunStamp = 0;
        this.drawRun();
    }
    ,getRunImages : function() {
        this.nowImages = this.images[this.action][this.directionID];
        if (!this.actionSwitched) return;
        this.animateWidth = this.nowImages[0].width;
        this.animateHeight = this.nowImages[0].height;
        this.el[0].width = this.animateWidth;
        this.el[0].height = this.animateHeight;

        this.nowImagesIndex = -1;
        
        this.actionSwitched = false;
    }
    ,drawRun : function() {
        var _this = this;

        //check if run once
        if (this.nowImages && this.nowImagesIndex === this.nowImages.length - 1 && this.checkRunOnce()) {
            this.runAnimationID = requestAnimationFrame(function() { _this.drawRun(); });
            return;
        }

        var now = fc.getNowTimestamp();
        var timeDelta = now - this.lastRunStamp;
        if (timeDelta < this.frameDuration) {
            this.runAnimationID = requestAnimationFrame(function() { _this.drawRun(); });
            return;
        }

        this.getRunImages();

        if (this.nowImagesIndex === this.nowImages.length - 1) {
            this.nowImagesIndex = 0;
        } else {
            ++this.nowImagesIndex;
        }
        this.canvas.clearRect(0, 0, this.animateWidth, this.animateHeight);
        this.addTargeted();
        this.canvas.drawImage(this.nowImages[this.nowImagesIndex], 0, 0);

        this.lastRunStamp = now;

        this.runAnimationID = requestAnimationFrame(function() { _this.drawRun(); });
    }
    ,checkRunOnce : function() {
        if (!this.runOnce) return false;
        this.switch('stand');
        this.put();

        this.owner.actionQueue.clearNow();
        this.owner.actionQueue.execute();
        return true;
    }
    ,addTargeted : function() {
        if (!this.owner.targeted) return;
        this.canvas.shadowOffsetX = 5;
        this.canvas.shadowOffsetY = 5;
        this.canvas.shadowBlur = 25;
        this.canvas.shadowColor = "white";
        /*
        var x = fc.fix(this.animateWidth / 2);
        var y = fc.fix(this.animateHeight * 0.85);
        var radius = 20;
        var startAngle = 0;
        var endAngle = Math.PI * 2;
        var clockwise = true;
        this.canvas.strokeStyle = "orange";
        this.canvas.lineWidth = 4;
        this.canvas.beginPath();
        this.canvas.arc(x, y, radius, startAngle, endAngle, clockwise);
        this.canvas.stroke();
        */
    }
    ,put : function() {
        var offsetX = this.animateList[this.action].offsetX;
        var offsetY = this.animateList[this.action].offsetY;

        var xy = this.owner;
        var screenX = this.transferLogicToScreenX(xy.x, xy.y) - this.HALFTILEWIDTH + offsetX;
        var screenY = this.transferLogicToScreenY(xy.x, xy.y) - offsetY;

        this.el.css({left : screenX + 'px', top : screenY + 'px'});
    }
});
