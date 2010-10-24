//my cardo position
var _Cardo_My_ = _Model_Cardo_.extend({
    init : function(idx){
        this.shape(120,194,8);
        this.defaultPosition = [
        //translateX translateY rotateX rotateY rotateZ translateZ scale3d
            [0,0,0,50,0,-400,[1,1,1]]
            ,[0,0,0,30,0,-400,[1,1,1]]
            ,[0,0,0,10,0,-400,[1,1,1]]
            ,[0,0,0,-10,0,-400,[1,1,1]]
            ,[0,0,0,-30,0,-400,[1,1,1]]
            ,[0,0,0,-50,0,-400,[1,1,1]]
        ];
        this.front.css({
            "background" : "-webkit-gradient(linear, left top, left bottom, from(#EEEEEE), to(#CCCCCC))"
            ,"border" : "1px solid #CCCCCC"
            ,"background-size" : "100% 100%"
        });
        this.back.css({"background" : "-webkit-gradient(linear, left top, left bottom, from(#EEEEEE), to(#CCCCCC))"});
        this.setDefaultPosition(idx);

        var _this = this;

this.cube.dblclick(function(){_this.anUse();});
this.cube.hover(function(){
    _this.anMouseOn();
},function(){
    _this.anMouseOut();
});
        return this;
    }
    ,anUse : function(){
        this.cube.addFrame("-webkit-transform","rotateY(0deg) translateZ(-100px)",500,500);
        this.cube.addFrame("-webkit-transform","rotateY(0deg) translateY(-400px) translateZ(-800px)",500,500);
        this.cube.addFrame("opacity","0",500,0,null,function(){
            $(this.cube).remove();
            my_cardo_slot[this.idx] = null;
        });

        this.cube.startFrame();
        return this;
    }
    ,anMouseOn : function(){
        if(!this.cube.initFrame()) {
            this.cube.addFrame("-webkit-transform","scale3d(1.2,1.2,1.2)",100,0);
            return;
        }else{
            this.cube.addFrame("","",1,0);
            this.cube.addFrame("-webkit-transform","scale3d(1.2,1.2,1.2)",100,0);
        }
        this.cube.startFrame();
        return this;
    }
    ,anMouseOut : function(){
        if(!this.cube.initFrame()) {
            this.cube.addFrame("-webkit-transform","scale3d(1.0,1.0,1.0)",10,0);
            return;
        }else{
            this.cube.addFrame("","",1,0);
            this.cube.addFrame("-webkit-transform","scale3d(1.0,1.0,1.0)",10,0);
        }
        this.cube.startFrame();
        return this;
    }

});
