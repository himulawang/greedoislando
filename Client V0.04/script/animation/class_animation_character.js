var Animation_Character = Animation.extend({
    init : function(owner){
    	this._super();
        this.owner = owner;
        this.defaultAction = 'stand';
        this.action = this.defaultAction;

        this.animateList = ANIMATION_MATERIAL.character[this.owner.name];

        this.directionID = 0;

        this.getFrameDuration();
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
        $('#character-animation').append(canvas);
        this.el = $("#" + this.owner.cID);
        Event.onSelectTarget(this.el);
        this.canvas = this.el[0].getContext('2d');
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
});
