var core = {
    rand : function(low,high){ return low + Math.floor(Math.random() * (high - low)); } //[low,high)
    ,randColor : function(){
        var t,r,g,b;

        t = this.rand(0,256).toString(16);
        t = t.length === 1 ? "0" + t : t;
        r = t;

        t = this.rand(0,256).toString(16);
        t = t.length === 1 ? "0" + t : t;
        g = t;
        
        t = this.rand(0,256).toString(16);
        t = t.length === 1 ? "0" + t : t;
        b = t;
        return ("#"+r+g+b).toUpperCase();
    }
};

(function($){
$.extend({
    css3d : function(el){
        el.css3 = {};
        el.css3.running = false;
        el.css3.nowFrame = null;
        el.css3.iteration = 1;
        el.css3.frame = {};
        // Transform
        el.css3.cssBuffer = {
            translateX : 0
            ,translateY : 0
            ,translateZ : 0
            ,rotateX : 0
            ,rotateY : 0
            ,rotateZ : 0
            ,scale3d : "1.0,1.0,1.0"
        };
        el.translateX = function(v){ this.css3.cssBuffer.translateX = v; return this; }
        el.translateY = function(v){ this.css3.cssBuffer.translateY = v; return this; }
        el.translateZ = function(v){ this.css3.cssBuffer.translateZ = v; return this; }
        el.rotateX = function(v){ this.css3.cssBuffer.rotateX = v; return this; }
        el.rotateY = function(v){ this.css3.cssBuffer.rotateY = v; return this; }
        el.rotateZ = function(v){ this.css3.cssBuffer.rotateZ = v; return this; }
        el.scale3d = function(v){ this.css3.cssBuffer.scale3d = v; return this; }
        el.render = function(){
            var v = "";
            v += "translateX(" + this.css3.cssBuffer.translateX + "px) ";
            v += "translateY(" + this.css3.cssBuffer.translateY + "px) ";
            v += "rotateX(" + this.css3.cssBuffer.rotateX + "deg) ";
            v += "rotateY(" + this.css3.cssBuffer.rotateY + "deg) ";
            v += "rotateZ(" + this.css3.cssBuffer.rotateZ + "deg) ";
            v += "translateZ(" + this.css3.cssBuffer.translateZ + "px) ";
            v += "scale3d(" + this.css3.cssBuffer.scale3d + ") ";
            this.css("-webkit-transform",v);
            return this;
        }
        // Animation
        el.initFrame = function(){
            if(this.css3.running) return false;
            this.css3.frame = [];
            this.css3.nowFrame = null;
            return this;
        }
        el.addFrame = function(prop,v,ms,pause,startFn,endFn){
            var p = pause || 0;
            var s = startFn || function(){};
            var e = endFn || function(){};
            this.css3.frame.push([prop,v,ms,p,s,e]);
            return this;
        }
        el.startFrame = function(){
            if(this.css3.running) return this;
            this.css3.running = true;
            this.loopFrame();
            return this;
        }
        el.loopFrame = function(){
            if(!this.css3.running) return; //not running

            if(this.css3.nowFrame === null){
                this.css3.nowFrame = 0;
            }else{
                ++this.css3.nowFrame;
            }
            
            var now = this.css3.nowFrame;
            var frame = this.css3.frame[now];
            if(now >= this.css3.frame.length){ //reach the last frame
                if (this.css3.iteration > 1){
                    this.css3.nowFrame = null;
                    --this.css3.iteration;
                    this.loopFrame();
                    return;
                }
                this.stopFrame();
                return;
            }

            var prop = frame[0];
            var v = frame[1];
            var ms = frame[2];
            var pause = frame[3];
            var startFn = frame[4];
            var endFn = frame[5];

            startFn();

            if(prop==="-webkit-transform"){
                var a = v.split(" ");
                var str;
                for(var i in a){
                    str = a[i];
                    if(/(\w+)(\()([-]?\d+|[0-1]?.\d+,[0-1]?.\d+,[0-1]?.\d+)(\w*)(\))/.test(str)){
                        this[RegExp.$1](RegExp.$3);
                    }
                }
                this.render();
            }else{
                this.css(prop,v);
            }

            this.css("-webkit-transition", prop +" "+ms+"ms ease-in-out");

            var _this = this;

            setTimeout(function(){ endFn(); },ms);

            setTimeout(function(){
                _this.loopFrame();
            },ms + pause);
        }
        el.stopFrame = function(){
            this.css3.running = false;
            this.css3.nowFrame = null;
            return this;
        }
        el.pauseFrame = function(){
            this.css3.running = false;
            return this;
        }
        el.iteration = function(v){
            this.css3.iteration = v;
            return this;
        }

        el.initFrame();
        return el;
    }
});
})(jQuery);

var _Model_Closeup_ = Class.extend({
    shape : function(img){
        this.lines = [];
        this.closeup = $.css3d($("<div></div>"));
        this.closeup.css({
            width : "100%"
            ,height : "50%"
            ,position : "absolute"
            ,background : "-webkit-gradient(linear, left top, left bottom, from(#EEEEEE), to("+core.randColor()+"))"
        });

        var n = core.rand(9,15);
        var lr;
        for(var i = 0; i < n; ++i ){
            this.lines[i] = $.css3d($("<div></div>"));
            this.lines[i].css({
                width : core.rand(1,101) + "%"
                ,height : core.rand(1,8)
                ,position : "absolute"
                ,top : core.rand(1,95) + "%"
                ,"background-color" : core.randColor()
                ,"border-radius" : core.rand(1,9) + "px"
            });
            lr = core.rand(0,2) === 0 ? "left" : "right";
            this.lines[i].addFrame(
                lr
                ,core.rand(-100,1) + "%"
                ,core.rand(300,1200)
            ).addFrame(
                lr
                ,"100%"
                ,core.rand(300,1200)
                ,null
            ).addFrame(
                lr
                ,core.rand(-100,1) + "%"
                ,core.rand(300,1200)
                ,null
            ).iteration(core.rand(7,12));
            
            this.closeup.append(this.lines[i]);
        }

        return this;
    }
    ,appendTo : function(el){
        $(el).append(this.closeup);
        return this;
    }
});

var _Closeup_Orc_ = _Model_Closeup_.extend({
    init : function(src){
        this.shape();
        //img
        this.img = $.css3d($("<img>"));
        this.img.attr("src",src || "");
        this.img.css({ 
            position : "absolute"
            ,top : "10%"
            ,opacity : .7
        });
        this.img.addFrame("left","-200%",100).addFrame("left","10%",700);
        //closeup
        this.closeup.addFrame("right","-100%",100).addFrame("right","0%",700);

        this.closeup.append(this.img);
    }
    ,trigger : function(){
        var l = this.lines;
        for(var i = 0, n = l.length; i < n; ++i ){
            l[i].startFrame();
        }
        this.img.startFrame();
        this.closeup.startFrame();
        return this;
    }
});

$(function(){
    a = new _Closeup_Orc_("orc.png").appendTo($("#per")).trigger();
});
