//Closeup
(function(w){
w._Model_Closeup_ = Class.extend({
    shape : function(img){
        this.lines = [];
        this.closeup = $.css3d($("<div></div>"));
        this.closeup.css({
            width : "100%"
            ,height : "50%"
            ,position : "absolute"
            ,background : "-webkit-gradient(linear, left top, left bottom, from(#EEEEEE), to("+core.randColor()+"))"
        });

        var n = core.rand(20,30);
        for(var i = 0; i < n; ++i ){
            this.lines[i] = $.css3d($("<div></div>"));
            this.lines[i].css({
                width : core.rand(30,101) + "%"
                ,height : core.rand(8,15)
                ,position : "absolute"
                ,top : core.rand(1,95) + "%"
                ,"background-color" : core.randColor()
                ,"border-radius" : core.rand(1,9) + "px"
            });
            this.lines[i].addFrame(
                "left"
                ,core.rand(-200,-100) + "%"
                ,core.rand(1800,3200)
            ).firstFrame({left:"150%"}).lastFrame({left:"-200%"}).iteration(core.rand(70,300));
            
            this.closeup.append(this.lines[i]);
        }

        return this;
    }
    ,appendTo : function(el){
        $(el).append(this.closeup);
        return this;
    }
});
})(window);
