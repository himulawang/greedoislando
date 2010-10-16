var my_cardo_slot = [];

var el;
function select(a){
    el = a;
}

function change_translateX(t){ el.setTranslateX(t.value).render(); }
function change_translateY(t){ el.setTranslateY(t.value).render(); }
function change_translateZ(t){ el.setTranslateZ(t.value).render(); }
function change_rotateX(t){ el.setRotateX(t.value).render(); }
function change_rotateY(t){ el.setRotateY(t.value).render(); }
function change_rotateZ(t){ el.setRotateZ(t.value).render(); }
function change_scale3d(t){ el.setScale3d(t.value+","+t.value+","+t.value).render(); }
function default_pos(){
    el.setDefaultPosition(el.idx).render();
}

function use_all(){
    for(var i in my_cardo_slot){
        if(my_cardo_slot[i]!==null){
            my_cardo_slot[i].anUse();
            my_cardo_slot[i] = null;
        }
    }
}

function deliver(){
    var idx = null;
    for(var i in my_cardo_slot){
        if(my_cardo_slot[i]===null){
            idx = i;
            break;
        }
    }

    if(idx===null) return;

    var new_cardo = new _Cardo_My_(idx);
    my_cardo_slot[idx] = new_cardo;

    var cardo = new _Cardo_Public_(10).appendTo($("#deliver"));
    cardo.addFrame("-webkit-transform","",10,10);
    cardo.addFrame("-webkit-transform","translateY(-300px) translateZ(300px) rotateX(-60deg)",500,200);
    cardo.addFrame("-webkit-transform","translateX(250px) rotateY(2deg) translateZ(400px) scale3d(1.5,1.5,1.5)",500,100);
    cardo.execFrame();

    cardo.endFrameCB(function(){
        cardo.initFrame();
        cardo.addFrame("-webkit-transform","",10,10);
        cardo.addFrame("opacity","0",700,200);
        cardo.execFrame();
        cardo.endFrameCB(function(){
            cardo.remove();
            new_cardo.appendTo($("#me"));
            new_cardo.addFrame("opacity","0",1,0);
            new_cardo.addFrame("opacity","1",700,0);
            new_cardo.execFrame();
        });
    });

}

$(function(){

    var cardo0 = new _Cardo_My_(0).appendTo($("#me"));
    var cardo1 = new _Cardo_My_(1).appendTo($("#me"));
    var cardo2 = new _Cardo_My_(2).appendTo($("#me"));
    var cardo3 = new _Cardo_My_(3).appendTo($("#me"));
    var cardo4 = new _Cardo_My_(4).appendTo($("#me"));
    var cardo5 = new _Cardo_My_(5).appendTo($("#me"));

    my_cardo_slot = [cardo0,cardo1,cardo2,cardo3,cardo4,cardo5];

    p0 = new _Cardo_Public_(0).appendTo($("#deliver"));
    p1 = new _Cardo_Public_(1).appendTo($("#deliver"));
    p2 = new _Cardo_Public_(2).appendTo($("#deliver"));
    p3 = new _Cardo_Public_(3).appendTo($("#deliver"));
    p4 = new _Cardo_Public_(4).appendTo($("#deliver"));
    p5 = new _Cardo_Public_(5).appendTo($("#deliver"));
    p6 = new _Cardo_Public_(6).appendTo($("#deliver"));
    p7 = new _Cardo_Public_(7).appendTo($("#deliver"));
    p8 = new _Cardo_Public_(8).appendTo($("#deliver"));
    p9 = new _Cardo_Public_(9).appendTo($("#deliver"));
    p10 = new _Cardo_Public_(10).appendTo($("#deliver"));

    p10.click(function(){
    
    });
});

//Create A 6 side cube by using CSS3 3D Transform
var _Model_Cube_ = Class.extend({
    map : {
        translateX : function(x,el){ el.setTranslateX(x); }
        ,translateY : function(y,el){ el.setTranslateY(y); }
        ,translateZ : function(z,el){ el.setTranslateZ(z); }
        ,rotateX : function(x,el){ el.setRotateX(x); }
        ,rotateY : function(y,el){ el.setRotateY(y); }
        ,rotateZ : function(z,el){ el.setRotateZ(z); }
        ,scale3d : function(str,el){ el.setScale3d(str); }
    }
    ,shape : function(x,y,z){
        this.xyz = {};
        this.xyz["x"] = x;
        this.xyz["y"] = y;
        this.xyz["z"] = z;
        this.cube = $(document.createElement("div"));
        this.top = $(document.createElement("div"));
        this.bottom = $(document.createElement("div"));
        this.left = $(document.createElement("div"));
        this.right = $(document.createElement("div"));
        this.front = $(document.createElement("div"));
        this.back = $(document.createElement("div"));

        this.cube.append(this.top);
        this.cube.append(this.bottom);
        this.cube.append(this.left);
        this.cube.append(this.right);
        this.cube.append(this.front);
        this.cube.append(this.back);

        var a = [this.top,this.bottom,this.left,this.right,this.front,this.back];

        $.each(a,function(i,n){
            n.css("position","absolute");
            n.css("background-color","rgba(0,255,0,0.7)");
        });

        this.cube.css("position","absolute");
        this.cube.css("-webkit-transform-style","preserve-3d");
        this.cube.css("-webkit-transition","-webkit-transform 200ms ease-in-out");

        this.top.css("height",z+"px").css("width",x+"px");
        this.bottom.css("height",z+"px").css("width",x+"px");
        this.left.css("height",y+"px").css("width",z+"px");
        this.right.css("height",y+"px").css("width",z+"px");
        this.front.css("height",y+"px").css("width",x+"px");
        this.back.css("height",y+"px").css("width",x+"px");

        var j = Math.floor(x / 2);
        var k = Math.floor(y / 2);
        var l = Math.floor(z / 2);
        this.xyz["j"] = j;
        this.xyz["k"] = k;
        this.xyz["l"] = l;

        this.top.css("-webkit-transform","translate(-"+j+"px,-"+k+"px) rotateX(90deg) translateZ("+l+"px)");
        this.bottom.css("-webkit-transform","translate(-"+j+"px,-"+k+"px) rotateX(-90deg) translateZ("+(y-l)+"px) rotate(180deg)");
        this.left.css("-webkit-transform","translate(-"+j+"px,-"+k+"px) rotateY(-90deg) translateZ("+l+"px)");
        this.right.css("-webkit-transform","translate(-"+j+"px,-"+k+"px) rotateY(90deg) translateZ("+(x-l)+"px)");
        this.front.css("-webkit-transform","translate(-"+j+"px,-"+k+"px) translateZ("+l+"px)");
        this.back.css("-webkit-transform","translate(-"+j+"px,-"+k+"px) rotateY(180deg) translateZ("+l+"px)");

    this.cube.css("left","50%");
    this.cube.css("cursor","pointer");

        return this;
    }
    ,setTranslateX : function(x){ this.translateX = x; return this;}
    ,setTranslateY : function(y){ this.translateY = y; return this;}
    ,setRotateX : function(x){ this.rotateX = x; return this;}
    ,setRotateY : function(y){ this.rotateY = y; return this;}
    ,setRotateZ : function(z){ this.rotateZ = z; return this;}
    ,setTranslateZ : function(z){ this.translateZ = z; return this;}
    ,setScale3d : function(str){ this.scale3d = str; return this;}
    ,render : function(){
        var css = "";
        css += "translateX(" + this.translateX + "px) ";
        css += "translateY(" + this.translateY + "px) ";
        css += "rotateX(" + this.rotateX + "deg) ";
        css += "rotateY(" + this.rotateY + "deg) ";
        css += "rotateZ(" + this.rotateZ + "deg) ";
        css += "translateZ(" + this.translateZ + "px) ";
        css += "scale3d(" + this.scale3d + ") ";
        $("#console").html(css);
        this.cube.css("-webkit-transform",css);
        return this;
    }

    ,appendTo : function(el){ $(el).append(this.cube); return this; }
    ,remove : function(){ this.cube.remove(); return this; }
    ,setID : function(id){ this.cube.attr("id",id); return this; }
    ,addClass : function(class){ this.cube.addClass(class); return this; }
    ,removeClass : function(class){ this.cube.removeClass(class); return this; }
    ,getCssTransform : function(){
        var cssText = this.cube[0].style.cssText;
        if(/(\w*)(-webkit-transform: )([^;]*)(;)(\w*)/.test(cssText)){
            var v = RegExp.$3;
        }else{
            var v = "error";
        }
        $("#console").html(v);
        return this;
    }
    ,dblclick : function(fn){
        this.cube.dblclick(fn);
        return this;
    }
    ,click : function(fn){
        this.cube.click(fn);
        return this;
    }
});

var _Model_Cardo_ = _Model_Cube_.extend({
    init : function(){
        this.running = false;
        this.startFrameFn = function(){};
        this.endFrameFn = function(){};
        this.initFrame();
        return this;
    }
    ,setDefaultPosition : function(idx){
        this.setIndex(idx);
        this.setTranslateX(this.defaultPosition[idx][0]);
        this.setTranslateY(this.defaultPosition[idx][1]);
        this.setRotateX(this.defaultPosition[idx][2]);
        this.setRotateY(this.defaultPosition[idx][3]);
        this.setRotateZ(this.defaultPosition[idx][4]);
        this.setTranslateZ(this.defaultPosition[idx][5]);
        this.setScale3d(this.defaultPosition[idx][6].join(","));
        this.render();
        return this;
    }
    ,setIndex : function(idx){ this.idx = idx; return this; }
    ,addFrame : function(prop,v,ms,pause_ms){
        this.keyframe.push([prop,v,ms,pause_ms]);
        return this;
    }
    ,initFrame : function(){
        if(this.running) return false;
        this.keyframe = [];
        this.nowFrame = null;
        return this;
    }
    ,execFrame : function(){
        if(this.running) return this;
        this.startFrameFn();
        this.running = true;
        this.loopFrame();
        return this;
    }
    ,loopFrame : function(){
        if(!this.running) return; //not running

        if(this.nowFrame === null){
            this.nowFrame = 0;
        }else{
            ++this.nowFrame;
        }
        
        if(this.nowFrame >= this.keyframe.length){ //reach the last frame
            this.stopFrame();
            return;
        }

        var prop = this.keyframe[this.nowFrame][0];
        var v = this.keyframe[this.nowFrame][1];
        var ms = this.keyframe[this.nowFrame][2];
        var pause_ms = this.keyframe[this.nowFrame][3];

        if(prop==="-webkit-transform"){
            var a = v.split(" ");
            for(var i in a){
                var str = a[i];
                if(/(\w+)(\()([-]?\d+|[0-1]?.\d+,[0-1]?.\d+,[0-1]?.\d+)(\w*)(\))/.test(str)){
                    this.map[RegExp.$1](RegExp.$3,this);
                }
            }
            this.render();
        }else{
            this.cube.css(prop,v);
        }

        this.cube.css("-webkit-transition", prop +" "+ms+"ms ease-in-out");

        var _this = this;

        setTimeout(function(){_this.loopFrame()},ms + pause_ms);
    }
    ,stopFrame : function(){
        this.running = false;
        this.nowFrame = null;
        this.endFrameFn();
        return this;
    }
    ,pauseFrame : function(){ this.running = false; return this; }
    ,startFrameCB : function(fn){ this.startFrameFn = fn; return this; }
    ,endFrameCB : function(fn){ this.endFrameFn = fn; return this; }
});

var _Cardo_My_ = _Model_Cardo_.extend({
    init : function(idx){
        this._super();
        this.shape(120,194,4);
        this.defaultPosition = [
        //translateX translateY rotateX rotateY rotateZ translateZ scale3d
            [0,0,0,50,0,-400,[1,1,1]]
            ,[0,0,0,30,0,-400,[1,1,1]]
            ,[0,0,0,10,0,-400,[1,1,1]]
            ,[0,0,0,-10,0,-400,[1,1,1]]
            ,[0,0,0,-30,0,-400,[1,1,1]]
            ,[0,0,0,-50,0,-400,[1,1,1]]
        ];
        this.front.css("background-image","url('cardo_reverse.png')");
        this.back.css("background-image","url('glass.gif')");
        this.setDefaultPosition(idx);

        var _this = this;
this.dblclick(function(){_this.anUse();});
this.click(function(){
    _this.getCssTransform();
    select(_this);
});
        return this;
    }
    ,anUse : function(){
        if(!this.initFrame()) return;
        this.addFrame("-webkit-transform","rotateY(0deg) translateZ(-100px)",500,500);
        this.addFrame("-webkit-transform","rotateY(0deg) translateY(-400px) translateZ(-800px)",500,500);

        this.endFrameCB(function(){
            this.cube.remove();
            my_cardo_slot[this.idx] = null;
        });
        this.execFrame();
        return this;
    }

});

var _Cardo_Public_ = _Model_Cardo_.extend({
    init : function(idx){
        this._super();
        this.shape(120,194,4);
        this.defaultPosition = [
        //translateX translateY rotateX rotateY rotateZ translateZ scale3d
            [0,this.xyz["k"],0,0,0,0,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,4,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,8,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,12,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,16,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,20,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,24,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,28,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,32,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,36,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,40,[1,1,1]]
        ]
        this.front.css("background-image","url('cardo_reverse.png')");
        this.back.css("background-image","url('glass.gif')");
        this.setDefaultPosition(idx);
var _this = this;
this.click(function(){
    _this.getCssTransform();
    select(_this);
});
        return this;
    }
    ,anDeliver : function(){
        
    }
    
});
