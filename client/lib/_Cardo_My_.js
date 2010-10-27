//My cardo position
/* CSS
#me {
    -webkit-transform: translateZ(400px);
    -webkit-transform-style: preserve-3d;
    height: 1px;
    width: 100%;
    margin-left:auto;
    margin-right:auto;
    position: absolute;

    -webkit-animation: my-float 6000ms infinite ease-in-out;
}

@-webkit-keyframes my-float{
    0% { top: 70%; }
    40% { top: 58%; }
    100% { top: 70%; }
}
 */
(function(w){
w._Cardo_My_ = _Model_Cardo_.extend({
    init : function(idx){
        this._super();
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
this.cube.click(function(){_this.select();});
        return this;
    }
    ,anUse : function(){
        this.cube.addFrame("-webkit-transform","rotateY(0deg) translateZ(-100px)",500,500);
        this.cube.addFrame("-webkit-transform","translateY(-400px) translateZ(-800px)",500,500);
        this.cube.addFrame("opacity","0",500,0,null,function(){
            $(this.cube).remove();
            my_cardo_slot[this.idx] = null;
        });

        use_cardo(this.idx);

        this.cube.startFrame();
        return this;
    }
});
})(window);
