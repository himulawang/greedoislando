var Animation = Class.extend({
    init : function(canvasID,animateName){
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
                ,'duration' : 500
            }
        };        
        this.lastStamp = 0;
        this.canvasID = canvasID;
        this.animateName = animateName;
        this.initCanvas();
    }
    ,initCanvas : function(){    
        this.el = $("<canvas id='" + this.canvasID + "' style='position: absolute;'></canvas>");
        $('body').append(this.el);
        this.el = $("#" + this.canvasID)[0];
    }
    ,initAnimation : function(action){
        this.animateImages = [];
        var animateFrames = this.animateCategory[action].frames;
        for(var i = 0; i < animateFrames; ++i){
            this.animateImages.push(new Image);
            this.animateImages[i].src = 'images/character/' + this.animateName.toLowerCase() + '/' + action + '/'+ this.animateName.toLowerCase() + '_' + action + '_' + i + '_s.png';
        }
        this.duration = this.animateCategory[action].duration;
        this.progress = this.duration;
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
});
