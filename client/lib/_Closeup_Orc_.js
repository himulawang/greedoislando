//Closeup Orc
(function(w){
w._Closeup_Orc_ = _Model_Closeup_.extend({
    init : function(src){
        this.shape();
        //img
        this.img = $.css3d($("<img>"));
        this.img.attr("src",src || "");
        this.img.css({ 
            position : "absolute"
            ,top : "10%"
            ,opacity : .8
        });
        this.img.firstFrame({left:"-100%"}).addFrame("left","10%",1400);
        //closeup
        this.closeup.firstFrame({opacity:"0"}).addFrame("opacity","1",700);

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
})(window);
