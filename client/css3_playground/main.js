var i = 0;
var j = 200;

function active(){
    ++i;
    ++i;
    $("#battlefield").css("-webkit-transform","rotateX("+i+"deg) translateZ( -140px)");
    $("#console").html(i);
}

function getCardoMargin(){
    var width = $("#me").innerWidth();
    var margin = ( width - 6 * 128 ) / 12;
    margin = Math.floor(margin);
    $(".cardo").css("margin-left",margin).css("margin-right",margin);

    $("#console").html(margin);
}

function cardo_deliver(){
    var target = $("#deliver-cardo9");
    target.addClass("cardo-deliver");
    setTimeout(
        function(){
            target.removeClass("cardo-deliver");

            var c = target.clone();
            c.addClass("cardo").attr("id","cardo1");
            $("#cardo0").after(c)

        }
        ,1000
    );
}

$(function(){
    //setInterval(active,50);
    //getCardoMargin();
    $("#cardo1-range").change(function(){
        $("#cardo1").css("-webkit-transform","rotateY("+this.value+"deg) translateZ( -500px)");
        $("#cardo1-range-value").html(this.value);
    });

    $(".cardo").click(function(){
        /*
        var r = /^(cardo)(\d)$/.test(this.id);
        if (!r) return;
        var a = RegExp.$2;

        var css = $(this).css("-webkit-transform");
        $("#console").html(css);
        */

        var target = $(this);
        target.addClass("cardo-used");
        setTimeout(function(){target.remove()},2000);
    });

    cardo0 = new cardo("cardo0");
    cardo1 = new cardo("cardo1");
    cardo2 = new cardo("cardo2");
    cardo3 = new cardo("cardo3");
    cardo4 = new cardo("cardo4");
    cardo5 = new cardo("cardo5");
    cardo0.append($("#me"));
    cardo1.append($("#me"));
    cardo2.append($("#me"));
    cardo3.append($("#me"));
    cardo4.append($("#me"));
    cardo5.append($("#me"));

});

var cardo = function(id){
    var _this = this;
    this._id = id;
    this.rotateX = 0;
    this.rotateY = 0;
    this.rotateZ = 0;
    this.translateZ = 0;
    this.scale3d = [1,1,1];

    var r = /^(cardo)(\d)$/.test(id);
    if (!r) return;
    this._idx = RegExp.$2;

    this.setRotateX = function(x){
        _this.rotateX = x;
        _this.render();
    }
    this.setRotateY = function(y){
        _this.rotateY = y;
        _this.render();
    }
    this.setDefaultPosition = function(){
        var idx = _this._idx;
        var a = [ //[x,y,z]
            [0,50,-500]
            ,[0,30,-500]
            ,[0,10,-500]
            ,[0,-10,-500]
            ,[0,-30,-500]
            ,[0,-50,-500]
        ];
        _this.rotateX = a[idx][0];
        _this.rotateY = a[idx][1];
        _this.translateZ = a[idx][2];
    }
    this.mouseover = function(){
        _this.scale3d = [1.3,1.3,1.3];
        _this.render();
    }
    this.mouseout = function(){
        _this.scale3d = [1,1,1];
        _this.render();
    }
    this.bindEvent = function(){
        $(_this._tempDoc.firstChild).mouseover(function(){
            _this.mouseover();
        }).mouseout(function(){
            _this.mouseout();
        });
    }
    this.append = function(el){
        el.append(_this._tempDoc);
        _this.render();
    }
    this.render = function(){
        var css = "rotateX(" + _this.rotateX + "deg) ";
        css += "rotateY(" + _this.rotateY + "deg) ";
        css += "translateZ(" + _this.translateZ + "px) ";
        css += "scale3d("+_this.scale3d.join(",")+") ";
        $("#console").html(_this._id + css);
        $("#"+_this._id).css("-webkit-transform",css);
    }

    this.setDefaultPosition();

    //init
    this._tempDoc = document.createDocumentFragment();

    var cube = $(document.createElement("div"));
    cube.addClass("cardo");
    cube[0].id = this._id;

    var top = $(document.createElement("div"));
    var bottom = $(document.createElement("div"));
    var left = $(document.createElement("div"));
    var right = $(document.createElement("div"));
    var front = $(document.createElement("div"));
    var back = $(document.createElement("div"));

    cube.append(top);
    cube.append(bottom);
    cube.append(left);
    cube.append(right);
    cube.append(front);
    cube.append(back);

    var a = [top,bottom,left,right,front,back];

    $.each(a,function(i,n){
        n.css("position","absolute");
        n.css("background-color","rgba(50,50,50,0.7)");
    });

    cube.css("position","absolute");
    cube.css("left","45%");
    cube.css("cursor","pointer");
    cube.css("-webkit-transform-style","preserve-3d");
    cube.css("-webkit-transform-property","-webkit-transform");
    cube.css("-webkit-transform-duration",".3s");
    cube.css("-webkit-transform-timing-function","ease-in-out");
    cube.css("-webkit-transition","-webkit-transform .2s ease-in-out");

    top.css("height","4px").css("width","120px");
    bottom.css("height","4px").css("width","120px");
    left.css("height","194px").css("width","4px");
    right.css("height","194px").css("width","4px");
    front.css("height","194px").css("width","120px");
    front.css("background-image","url('cardo_reverse.png')");
    back.css("height","194px").css("width","120px");

    top.css("-webkit-transform","rotateX(90deg) translateZ(2px)");
    bottom.css("-webkit-transform","rotateX(-90deg) translateZ(192px) rotate(180deg)");
    left.css("-webkit-transform","rotateY(-90deg) translateZ(2px)");
    right.css("-webkit-transform","rotateY(90deg) translateZ(118px)");
    front.css("-webkit-transform","translateZ(2px)");
    back.css("-webkit-transform"," rotateY(180deg) translateZ(2px)");

    this._tempDoc.appendChild(cube[0]);
    this.bindEvent();

}

