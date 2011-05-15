var Animation = Character.extend({
    init : function(canvasID, animateName, x, y, offset){
    	this._super();
        this.animateCategory = {
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
        this.offset = offset;
        this.x = x;
        this.y = y;
        this.isMoving = false;
        this.canvasID = canvasID;
        this.animateName = animateName;
        this.lastStamp = 0;
        this.lastStamp1 = 0;
        this.directionID = 0;
        this.initCanvas();
        this.initAnimation();
        this.transOrbit = [];
        this.animateMaterials = [];
        this.nowAnimateImages = [];
    }
    ,initCanvas : function(){    
        this.el = $("<canvas id='" + this.canvasID + "' style='position: absolute;'></canvas>");
        $('body').append(this.el);
        this.el = $("#" + this.canvasID)[0];
    }
    ,initAnimation : function(){
        this.animateImages = [];
        this.initMaterial();
    }
    ,initMaterial : function(){
        for(action in this.animateCategory){
            var frames = this.animateCategory[action].frames;
            var tmp = [];
            for(var i = 0; i < 8; ++i){
                tmp[i] = [];
                for(var j = 0; j < frames; ++j){
                    tmp[i].push(new Image);
                    tmp[i][j].src = 'images/character/' + this.animateName.toLowerCase() + '/' + action + '-s-' + i + '/' + this.animateName.toLowerCase() + '-' + action + '-' + j + '-s.png';
                }
            }
            this.animateImages[action] = tmp;
        }
    }
    ,animationSwitch : function(action){
        this.duration = this.animateCategory[action].duration;
        this.progress = this.duration;
        this.progress1 = this.duration;
        this.nowAnimateImages = this.animateImages[action][this.directionID];
    }
    ,runAnimation : function(timestamp){
        var _this = this;
        var timeDelta = this.lastStamp ? (timestamp - this.lastStamp) : 0;
        this.progress += timeDelta;
        this.lastStamp = timestamp;
        if(this.progress >= this.duration){
            this.progress = 0;
            var c = this.el.getContext('2d');
            this.animateWidth = this.nowAnimateImages[0].width;
            this.animateHeight = this.nowAnimateImages[0].height;
            this.el.width = this.animateWidth;
            this.el.height = this.animateHeight;
            c.clearRect(0, 0, this.animateWidth, this.animateHeight);
            this.animateIndex = (this.animateIndex < this.nowAnimateImages.length - 1) ? this.animateIndex + 1 : 0;
            c.drawImage(this.nowAnimateImages[this.animateIndex], 0, 0);
        }
        requestAnimationFrame(function(){ _this.runAnimation(Date.now()) });
    }
    ,initTransfer : function(data){
    	this.transOrbit.push(data);
    }
    ,transferAnimationSet : function(){
    	clearTimeout(this.movingTimeout);
    	var _this = this;
    	
    	if(this.isMoving) return;
    	
        if(this.transOrbit) var nowShift = this.transOrbit.shift();
        
        if(!nowShift){
    		this.movingTimeout = setTimeout(function(){
    			_this.transferAnimationSet();
    		},10);
    		return;
    	}

        if(nowShift.type == 'characterStand') {
            this.animationSwitch('stand');
            this.put();
            return;
        }
        
        this.isMoving = true;
        
        this.serverNowXY = this.getCoordinateXY(nowShift.data.nowLocation);
        this.serverNextXY = this.getCoordinateXY(nowShift.data.nextLocation);

        var directionRe = this.getTowardNewGridDirection(this.serverNextXY.x,this.serverNextXY.y);
        this.directionID = (directionRe != undefined) ? directionRe : this.directionID;

        var nowScreenX = this.transferLogicToScreenX(this.serverNowXY.x,this.serverNowXY.y) - this.HALFTILEWIDTH + this.offset.runOffsetX;
        var nowScreenY = this.transferLogicToScreenY(this.serverNowXY.x,this.serverNowXY.y) - this.offset.runOffsetY;

        var nextScreenX = this.transferLogicToScreenX(this.serverNextXY.x,this.serverNextXY.y) - this.HALFTILEWIDTH + this.offset.runOffsetX;
        var nextScreenY = this.transferLogicToScreenY(this.serverNextXY.x,this.serverNextXY.y) - this.offset.runOffsetY;

        var displacementX = nextScreenX - nowScreenX;
        var displacementY = nextScreenY - nowScreenY;
            
        var time = nowShift.data.duration;
        this.renderTime = 25;
        this.cycle = Math.floor(time / this.renderTime);
            
        this.stepX = displacementX / time * this.renderTime;
        this.stepY = displacementY / time * this.renderTime;
        
        this.screenX = nowScreenX;
        this.screenY = nowScreenY;
            
        this.i = 0;
        
        this.animationSwitch('run');
        this.transferAnimationGo(0);
    }
    ,transferAnimationGo : function(timestamp){
    	var _this = this;
    	var timeDelta = (this.lastStamp1 != 0) ? (timestamp - this.lastStamp1) : 0;
        this.progress1 += timeDelta;
        this.lastStamp1 = timestamp;
        if(this.progress1 >= this.renderTime){
        	this.progress1 = 0;
            this.lastStamp1 = 0;
            this.screenX += this.stepX;
        	this.screenY += this.stepY;

        	$(this.el).css({ left : this.screenX + 'px' , top : this.screenY + 'px' });

        	++this.i;
        	if(this.i === this.cycle) {
        		this.x = this.serverNextXY.x;
        		this.y = this.serverNextXY.y;
        		this.isMoving = false;
                this.transferAnimationSet();
        		return;
        	}
        }
        requestAnimationFrame(function(){ _this.transferAnimationGo(Date.now()) });
    }
    ,put : function() {

        var originalScreenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH;

        var screenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH + this.offset.standOffsetX;
        var screenY = this.transferLogicToScreenY(this.x, this.y) - this.offset.standOffsetY;

        $(this.el).css({left : screenX + 'px', top : screenY + 'px'});

        //this.ui.slotput(originalScreenX, screenY);
    }
});
