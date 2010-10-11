var a;
var i=0;
$(function(){
    var cardo = function(id){
        this._id = id;
        this.rotateX = 0;
        this.rotateY = 0;
        this.translateZ = 0;

        this._tempDoc = document.createDocumentFragment();

        var cube = $(document.createElement("div"));
        cube.addClass("cube");
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
        cube.css("top","20%");
        cube.css("left","20%");
        cube.css("-webkit-translation","-webkit-transform 2s linear");
        cube.css("-webkit-transform-style","preserve-3d");

        top.css("height","4px").css("width","120px");
        bottom.css("height","4px").css("width","120px");
        left.css("height","194px").css("width","4px");
        right.css("height","194px").css("width","4px");
        front.css("height","194px").css("width","120px");
        back.css("height","194px").css("width","120px");

        top.css("-webkit-transform","rotateX(90deg) translateZ(2px)");
        bottom.css("-webkit-transform","rotateX(-90deg) translateZ(192px) rotate(180deg)");
        left.css("-webkit-transform","rotateY(-90deg) translateZ(2px)");
        right.css("-webkit-transform","rotateY(90deg) translateZ(118px)");
        front.css("-webkit-transform","translateZ(2px)");
        back.css("-webkit-transform"," rotateY(180deg) translateZ(2px)");

        this._tempDoc.appendChild(cube[0]);
        $("#per").append(this._tempDoc);

    }
    cardo.prototype = {
        setRotateX : function(x){
            this.rotateX = x;
            this.render();
        },
        setRotateY : function(y){
            this.rotateY = y;
            this.render();
        },
        render : function(){
            $("#"+this._id).css("-webkit-transform","rotateX("+this.rotateX+"deg) rotateY("+this.rotateY+"deg)");
        }
    }

    a = new cardo("cardo0");
/*
    setInterval(function(){
        ++i;
        $(".cube").css("-webkit-transform","rotateX("+i+"deg)");
    },50);
    */
});

function activex(value){
    a.setRotateX(value);
}
function activey(value){
    a.setRotateY(value);
}

/*
<div id="cardo-mine-1">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
*/
