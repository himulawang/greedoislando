//Closeup Orc
(function(w){
w._Closeup_Orc_ = _Model_Closeup_.extend({
    init : function(src,text){
        this.shape();
        //img
        this.img = $.css3d($("<img>"));
        this.img.attr("src",src || "");
        this.img.css({ 
            position : "absolute"
            ,top : "10%"
            ,opacity : .8
        });
        this.img.firstFrame({left:"-100%"}).addFrame("left","10%",1400).addFrame(
            "-webkit-transform","scale3d(1.2,1.2,1.2)",300).addFrame(
            "-webkit-transform","scale3d(1.0,1.0,1.0)",300).addFrame(
            "-webkit-transform","scale3d(1.2,1.2,1.2)",300).addFrame(
            "-webkit-transform","scale3d(1.0,1.0,1.0)",300
        );

        //text
        this.text = $.css3d($("<div>"+text+"</div>"));
        this.text.css({
            "font-size" : "2400%"
            ,"top" : "60%"
            ,"left" : "5%"
            ,"position" : "absolute"
            ,"color" : "red"
        });
        this.text.firstFrame({left:"-100%"}).addFrame("left","5%",1400,1400).addFrame(
            "-webkit-transform","scale3d(1.2,1.2,1.2)",300).addFrame(
            "-webkit-transform","scale3d(1.0,1.0,1.0)",300).addFrame(
            "-webkit-transform","scale3d(1.2,1.2,1.2)",300).addFrame(
            "-webkit-transform","scale3d(1.0,1.0,1.0)",300
        );
        //closeup
        this.closeup.firstFrame({opacity:"0"}).addFrame("opacity","1",700)
        this.closeup.append(this.img);
        this.closeup.append(this.text);
    }
    ,trigger : function(){
        var l = this.lines;
        for(var i = 0, n = l.length; i < n; ++i ){
            l[i].startFrame();
        }
        this.img.startFrame();
        this.closeup.startFrame();
        this.text.startFrame();
        return this;
    }
});
})(window);
