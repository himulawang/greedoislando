//Battle Information Window
(function(w){
w._Info_Battle_Console_ = _Model_Info_.extend({
    init : function(x,y){
        this.shape(x,y);
        this.container.css({
            overflow : "hidden"
            ,position : "relative"
            ,top : "170px"
        });
    }
    ,push : function(text){
        var info = $.css3d($("<div>"+text+"</div>"));
        info.css({
            left : "200%"
            ,color : "#444444"
            ,position : "relative"
        });

        this.container.append(info);

        info.addFrame("left","150%",500
        ).addFrame("left","0%",700
        ).startFrame();

        setTimeout(function(){ info.slideUp(1000,function(){ $(this).remove() }); },5000);

        return this;
    }
});
})(window);
