//Action Bar
/* CSS
@-webkit-keyframes progress {
    0% { background-position: 0 0; }
    100% { background-position: 44px 0; }
}
 */
(function(w){
w._Bar_Action_ = _Model_Bar_.extend({
    init : function(name){ //json: ["my","enemy"]
        this._super();
        if(!$.isArray(name)) return;

        this.bar = {};
        this.progress = {};
        this.avatar = {};
        this.img = {};
        this.tag = {};
        for(var i = 0, l = name.length; i < l; ++i ){
            this.container.append( this.create(name[i]) );
        }
        return this;
    },
    create : function(name){
    /*
        <div>container
            <div>bar
                <div>progress</div>
            </div>
            <div>avatar
                <div>img</div>
                <div>tag</div>
            </div>
        </div>
    */
        this.bar[name] = $.css3d($("<div></div>"));
        this.progress[name] = $.css3d($("<div></div>"));
        this.avatar[name] = $.css3d($("<div></div>"));
        this.img[name] = $.css3d($("<div></div>"));
        this.tag[name] = $.css3d($("<div>0</div>"));

        this.tag[name].css({
            color: "#666666"
            ,"margin-left" : "15px"
        });

        this.bar[name].css({
            width : "500px"
            ,height : "5px"
        });
        this.avatar[name].css({
            position : "absolute"
            ,"-webkit-box-shadow" : "1px 2px 3px #AAAAAA"
            ,"border-radius" : "3px"
        });

        this.img[name].css({
            height : "50px"
            ,width : "50px"
            ,"-webkit-background-size" : "50px 50px"
            ,border : "1px solid #000000"
        });
        if(name==="my"){
            this.img[name].css({ "background-image" : "url('bar_avatar_hisoka.jpg')" });
        }else if(name==="enemy"){
            this.img[name].css({ "background-image" : "url('bar_avatar_killua.jpg')" });
        }

        this.container.append(this.bar[name]);
        this.container.append(this.avatar[name]);
        this.bar[name].append(this.progress[name]);
        this.avatar[name].append(this.img[name]);
        this.avatar[name].append(this.tag[name]);

        this.progress[name].css({
            background : "-webkit-gradient(linear, 0 0, 10 10,"
                +"color-stop(0.00, rgba(255,255,255,0.17)),"
                +"color-stop(0.25, rgba(255,255,255,0.17)),"
                +"color-stop(0.26, rgba(255,255,255,0)),"
                +"color-stop(0.50, rgba(255,255,255,0)),"
                +"color-stop(0.51, rgba(255,255,255,0.17)),"
                +"color-stop(0.75, rgba(255,255,255,0.17)),"
                +"color-stop(0.76, rgba(255,255,255,0)),"
                +"color-stop(1.00, rgba(255,255,255,0))"
                +"), -webkit-gradient(linear, left bottom, left top, color-stop(0, #FF0000), color-stop(1, "+core.randColor()+"))"
            ,height : "3px"
            ,width : "0%"
            ,border : "1px solid #000000"
            ,"-webkit-background-size" : "10px 10px"
            ,"-webkit-animation" : "progress 2s linear infinite"
            ,"border-radius" : "3px"
        });
        return this;
    }
    ,change : function(idx,per,cb){
        var _this = this;
        var duration;
        var progress = this.progress[idx];

        var orgWidth = core.num(this.progress[idx].css("width"));

        if(orgWidth >= per){
            duration = 500;
        }else{
            duration = 900;
        }

        var avatar = this.avatar[idx];
        var callback = cb || function(){};
        progress.animate({width:per+"%"},{
            duration : duration
            ,easing : "swing"
            ,step : function(){
                _this._avatarPosition(idx);
                _this._tagUpdate(idx);
            }
            ,complete : function(){
                _this._avatarPosition(idx);
                _this._tagUpdate(idx);
            }
        });
        return this;
    }
    ,_avatarPosition : function(idx){
        var orgWidth = this.progress[idx].width();
        var orgPosition = this.bar[idx].position();
        var left = -25 + orgPosition.left + orgWidth + "px";
        this.avatar[idx].css({left : left});
        return this;
    }
    ,_tagUpdate : function(idx){
        var orgWidth = core.num(this.progress[idx].css("width"));
        this.tag[idx].html(orgWidth);
    }
    ,avatar : function(idx,img){ // set avatar image
        this.img[idx].css({"background-image" : "url('"+img+"')"});
        return this;
    }
    ,appendTo : function(el){
        $(el).append(this.container);

        var left,top,orgWidth,orgPosition,orgTop,orgLeft;

        //my avatar position
        orgWidth = this.progress["my"].width();
        orgPosition = this.bar["my"].position();
        orgTop = orgPosition.top;
        orgLeft = orgPosition.left;
        left = -25 + orgLeft + orgWidth + "px";
        top = orgTop + 10 + "px";

        this.avatar["my"].css({left:left,top:top});

        //enemy avatar position
        orgWidth = this.progress["enemy"].width();
        orgPosition = this.bar["enemy"].position();
        orgTop = orgPosition.top;
        orgLeft = orgPosition.left;
        left = -25 + orgLeft + orgWidth + "px";
        top = orgTop - 80 + "px";

        this.avatar["enemy"].css({left:left,top:top});

        return this;
    }
    ,avatarShake : function(idx){
        var img = this.img[idx];
        img.addFrame("-webkit-transform","translateX(-15px)",30
        ).addFrame("-webkit-transform","translateX(15px)",30
        ).addFrame("-webkit-transform","translateX(-15px)",30
        ).addFrame("-webkit-transform","translateX(15px)",30
        ).addFrame("-webkit-transform","translateX(0px)",30);
        img.startFrame();
    }
    ,avatarShine : function(idx,color){
        this.avatar[idx].css({
            border : "3px solid " + color
        });
    }
    ,avatarGloom : function(idx){
        this.avatar[idx].css({
            border : ""
        });
    }
});
})(window);
