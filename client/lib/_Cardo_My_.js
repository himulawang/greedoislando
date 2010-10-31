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
    init : function(idx,xxx){
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
        var frontside = "";
        frontside += "<div>XXX:"+xxx+"</div>";
        frontside += "<div>Name:"+this.XXX[xxx].name+"</div>";
        frontside += "<div>Description:"+this.XXX[xxx].description+"</div>";

        this.front.css({
            "background" : "-webkit-gradient(linear, left top, left bottom, from(#EEEEEE), to(#CCCCCC))"
            ,"border" : "1px solid #CCCCCC"
            ,"background-size" : "100% 100%"
        }).html(frontside);
        this.back.css({"background" : "-webkit-gradient(linear, left top, left bottom, from(#EEEEEE), to(#CCCCCC))"});
        this.setDefaultPosition(idx);

        var _this = this;

this.cube.dblclick(function(){_this.use();});
this.cube.click(function(){_this.select();});
        return this;
    }
    ,use : function(){
        ws.send("batt",{cmd:"use_cardo",pos:this.idx});
        return this;
    }
});
})(window);
