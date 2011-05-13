var Animation = Character.extend({
    init : function(canvasID,animateName,x,y){
    	this._super();
        this.animateCategory = {
            'stand' : {
                'frames' : 2
                ,'duration' : 500
            }
            ,'attack' : {
                'frames' : 12
                ,'duration' : 500
            }
            ,'run' : {
                'frames' : 8
                ,'duration' : 100
            }
        };
        this.x = x;
        this.y = y;
        this.isMoving = false;
        this.canvasID = canvasID;
        this.animateName = animateName;
        this.lastStamp1 = 0;
        this.lastStamp2 = 0;
        this.initCanvas();
        this.transOrbit = [];
    }
    ,initCanvas : function(){    
        this.el = $("<canvas id='" + this.canvasID + "' style='position: absolute;'></canvas>");
        $('body').append(this.el);
        this.el = $("#" + this.canvasID)[0];
    }
    ,initAnimation : function(action){
        this.animateImages = [];
        this.lastStamp = 0;
        var animateFrames = this.animateCategory[action].frames;
        this.duration = this.animateCategory[action].duration;
        this.progress = this.duration;
        this.progress1 = this.duration;
        this.progress2 = this.duration;
        for(var i = 0; i < animateFrames; ++i){
            this.animateImages.push(new Image);
            if(action == 'run'){
            	this.animateImages[i].src = 'images/character/' + this.animateName.toLowerCase() + '/' + action + '-s-' + this.directionID + '/'+ this.animateName.toLowerCase() + '-' + action + '-' + i + '-s.png';
            }else{
            	this.animateImages[i].src = 'images/character/' + this.animateName.toLowerCase() + '/' + action + '/'+ this.animateName.toLowerCase() + '-' + action + '-' + i + '-s.png';
            }
        }
    }
    ,runAnimation : function(timestamp){
        var _this = this;
        var timeDelta = this.lastStamp ? (timestamp - this.lastStamp) : 0;
        this.progress += timeDelta;
        this.lastStamp = timestamp;
        if(this.progress >= this.duration){
            this.progress = 0;
            var c = this.el.getContext('2d');
            this.animateWidth = this.animateImages[0].width;
            this.animateHeight = this.animateImages[0].height;
            this.el.width = this.animateWidth;
            this.el.height = this.animateHeight;
            c.clearRect(0, 0, this.animateWidth, this.animateHeight);
            this.animateIndex = (this.animateIndex < this.animateImages.length - 1) ? this.animateIndex + 1 : 0;
            c.drawImage(this.animateImages[this.animateIndex], 0, 0);
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
    	
    	var nowShift = this.transOrbit.shift();
    	if(!nowShift){
    		this.movingTimeout = setTimeout(function(){
    			_this.transferAnimationSet();
    		},50);
    		return;
    	}
    	
        if(nowShift.type == 'characterStand')
        {
           	this.initAnimation('stand');
           	return;
        }
        
        this.isMoving = true;
        
        this.serverNowXY = this.getCoordinateXY(nowShift.data.nowLocation);
        this.serverNextXY = this.getCoordinateXY(nowShift.data.nextLocation);
        
        var directionRe = this.getTowardNewGridDirection(this.serverNextXY.x,this.serverNextXY.y);
        this.directionID = (directionRe != undefined) ? directionRe : this.directionID;
        
        var nowScreenX = this.transferLogicToScreenX(this.serverNowXY.x,this.serverNowXY.y) - this.HALFTILEWIDTH;
        var nowScreenY = this.transferLogicToScreenY(this.serverNowXY.x,this.serverNowXY.y);
        
        var nextScreenX = this.transferLogicToScreenX(this.serverNextXY.x,this.serverNextXY.y) - this.HALFTILEWIDTH;
        var nextScreenY = this.transferLogicToScreenY(this.serverNextXY.x,this.serverNextXY.y);
          
        var displacementX = nextScreenX - nowScreenX;
        var displacementY = nextScreenY - nowScreenY;
            
        this.time = nowShift.data.duration;
        this.renderTime = 20;
        this.cycle = Math.floor(this.time / this.renderTime);
            
        this.stepX = displacementX / this.time * this.renderTime;
        this.stepY = displacementY / this.time * this.renderTime;
            
        this.screenX = nowScreenX;
        this.screenY = nowScreenY;
            
        this.i = 0;
        
        this.initAnimation('run');
        this.transferAnimationGo(0);
    }
    ,transferAnimationGo : function(timestamp){
    	var _this = this;
    	var timeDelta = (this.lastStamp2 != 0) ? (timestamp - this.lastStamp2) : 0;
        this.progress2 += timeDelta;
        this.lastStamp2 = timestamp;
        if(this.progress2 >= this.renderTime){
        	this.progress2 = 0;
        	this.screenX += this.stepX;
        	this.screenY += this.stepY;
        	$(this.el).css({ left : this.screenX + 'px' , top : this.screenY + 'px' });
        	++this.i;
        	if(this.i === this.cycle) {
        		this.x = this.serverNextXY.x;
        		this.y = this.serverNextXY.y;
        		this.isMoving = false;
        		return;
        	}
        }
        requestAnimationFrame(function(){ _this.transferAnimationGo(Date.now()) });
    }
});
