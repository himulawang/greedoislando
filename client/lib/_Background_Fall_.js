//leaves fall in autumn theme
/* CSS
@-webkit-keyframes fade {
    0%   { opacity: 1; }
    90%  { opacity: 1; }
    100% { opacity: 0; }
}

@-webkit-keyframes drop {
    0%   { -webkit-transform: translate(0px, -50px); }
    100% { -webkit-transform: translate(0px, 650px); }
}

@-webkit-keyframes fall1 {
    0%   { -webkit-transform: rotate(45deg); }
    50%  { -webkit-transform: rotate(-10deg); }
    100% { -webkit-transform: rotate(45deg);}
}

@-webkit-keyframes fall2 {
    0%   { -webkit-transform: rotate(10deg); }
    50%  { -webkit-transform: rotate(-20deg); }
    100% { -webkit-transform: rotate(10deg);}
}

@-webkit-keyframes fall3 {
    0%   { -webkit-transform: rotate(10deg) rotateX(0deg) rotateY(30deg); }
    30%  { -webkit-transform: rotate(-30deg) rotateX(-45deg) rotateY(0deg); }
    60%  { -webkit-transform: rotate(30deg) rotateX(45deg) rotateY(-30deg); }
    100% { -webkit-transform: rotate(10deg) rotateX(0deg) rotateY(30deg); }
}
*/
(function(w){
w._Background_Fall_ = _Model_Background_.extend({
    init : function(count){
        this.background = [];
        var div;
        for(var i = 0; i < count; ++i){
            div = this.shape(50,50,"realLeaf.png",1,4);
            div = this.create(div);
            this.background.push(div);
        }
    }
    ,create : function(div){
        var dropDuration = core.rand(12000,19000) + "ms";
        var dropDelay = core.rand(0, 5000) + "ms";

        div.css("top","-70px");
        div.css("left", core.rand(65,95) + "%");

        div.css("-webkit-animation-name","fade,drop");
        div.css("-webkit-animation-duration",dropDuration + ", "+dropDuration);
        div.css("-webkit-animation-iteration-count","infinite");
        div.css("-webkit-animation-timing-function","ease-in-out");

        div.css("-webkit-animation-delay",dropDelay + ", "+dropDelay);
        div.css("-webkit-animation-direction","normal");
        
        var img = $("div",div);
        var name = "fall" + core.rand(1,4);
        img.css("-webkit-animation-name",name);
        img.css("-webkit-animation-duration",core.rand(5000, 9000)+"ms");
        img.css("-webkit-animation-iteration-count","infinite");
        img.css("-webkit-animation-timing-function","ease-in-out");
        //img.css("-webkit-animation-direction","alternate");
        img.css("-webkit-transform-origin","50% -100%");

        return div;
    }
    ,appendTo : function(el){
        for(var i = 0, len = this.background.length; i < len; ++i){
            $(el).append(this.background[i]);
        }
        return this;
    }
});
})(window);
