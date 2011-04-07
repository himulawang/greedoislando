/* jQuery CSS3 3D Transform & Animation Plugins
 * By ila 2010-10
 * MIT Licensed.
 */
(function($){
$.extend({
    css3d : function(el){
        el.css3 = {};
        el.css3.running = false;
        el.css3.nowFrame = null;
        el.css3.firstFrame = null;
        el.css3.lastFrame = null;
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
            this.css3.firstFrame = null;
            this.css3.lastFrame = null;
            this.css3.iteration = 1;
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
                //set firstframe
                var f = this.css3.firstFrame;
                if(f){
                    this.css("-webkit-transition","");
                    this.css(f);
                }
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

                    //set lastframe
                    var l = this.css3.lastFrame;
                    if(l){
                        this.css("-webkit-transition","");
                        this.css(l);
                    }

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

            this.css("-webkit-transition", prop +" "+ms+"ms ease-in-out");

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
        el.firstFrame = function(o){
            this.css3.firstFrame = o;
            return this;
        }
        el.lastFrame = function(o){
            this.css3.lastFrame = o;
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