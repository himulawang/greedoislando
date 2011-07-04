//Enemy cardo position
/* CSS
#enemy {
    -webkit-transform: rotateX(-15deg) translateZ(-1000px);
    -webkit-transform-style: preserve-3d;
    height: 1px;
    width: 100%;
    margin-left:auto;
    margin-right:auto;
    position: absolute;

    -webkit-animation: enemy-float 12000ms infinite ease-in-out;
}

@-webkit-keyframes enemy-float{
    0% { top: 1%; }
    40% { top: 11%; }
    100% { top: 1%; }
}

 */
(function(w){
w._Cardo_Enemy_ = _Model_Cardo_.extend({
    init : function(idx,xxx){
        this._super();
        this.shape(120,194,8);
        this.defaultPosition = [
        //translateX translateY rotateX rotateY rotateZ translateZ scale3d
            [0,0,0,230,0,-400,[1,1,1]]
            ,[0,0,0,210,0,-400,[1,1,1]]
            ,[0,0,0,190,0,-400,[1,1,1]]
            ,[0,0,0,170,0,-400,[1,1,1]]
            ,[0,0,0,150,0,-400,[1,1,1]]
            ,[0,0,0,130,0,-400,[1,1,1]]
        ];

        if(arguments.length===2) this.display(xxx);

        this.front.css({
            "background" : "-webkit-gradient(linear, left top, left bottom, from(#EEEEEE), to(#CCCCCC))"
            ,"border" : "1px solid #CCCCCC"
            ,"background-size" : "100% 100%"
        });
        this.back.css({"background" : "-webkit-gradient(linear, left top, left bottom, from(#EEEEEE), to(#CCCCCC))"});
        this.setDefaultPosition(idx);

        var _this = this;

this.cube.dblclick(function(){});
this.cube.click(function(){_this.select()});
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
