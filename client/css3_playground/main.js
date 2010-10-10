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


});
