//Create a 6 sides cube by using CSS3 3D Transform
var _Model_Cube_ = Class.extend({
    shape : function(x,y,z){
        this.xyz = {};
        this.xyz["x"] = x;
        this.xyz["y"] = y;
        this.xyz["z"] = z;
        this.cube = $.css3d($("<div></div>"));
        this.top = $.css3d($("<div></div>"));
        this.bottom = $.css3d($("<div></div>"));
        this.left = $.css3d($("<div></div>"));
        this.right = $.css3d($("<div></div>"));
        this.front = $.css3d($("<div></div>"));
        this.back = $.css3d($("<div></div>"));

        this.cube.append(this.top);
        this.cube.append(this.bottom);
        this.cube.append(this.left);
        this.cube.append(this.right);
        this.cube.append(this.front);
        this.cube.append(this.back);

        var a = [this.top,this.bottom,this.left,this.right,this.front,this.back];

        $.each(a,function(i,n){
            n.css({
                position : "absolute"
                ,"background-color" : "rgba(0,255,0,0.7)"
            });
        });

        this.cube.css({
            position : "absolute"
            ,"-webkit-transform-style" : "preserve-3d"
,"-webkit-transition" : "-webkit-transform 200ms ease-in-out"
        });

        var j = Math.floor(x / 2);
        var k = Math.floor(y / 2);
        var l = Math.floor(z / 2);
        this.xyz["j"] = j;
        this.xyz["k"] = k;
        this.xyz["l"] = l;

        this.top.css({ height : z+"px", width : x+"px" });
        this.bottom.css({ height : z+"px", width : x+"px" });
        this.left.css({ height : y+"px", width : z+"px" });
        this.right.css({ height : y+"px", width : z+"px" });
        this.front.css({ height : y+"px", width : x+"px" });
        this.back.css({ height : y+"px", width : x+"px" });

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
    ,appendTo : function(el){
        $(el).append(this.cube);
        return this;
    }
});