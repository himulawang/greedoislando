var i = 0;
var j = 200;

function active(){
    ++i;
    ++i;
    --j;
    --j;
    $("#cardo4").css("-webkit-transform","rotateY("+i+"deg) translateZ( 100px)");
    $("#me").css("-webkit-transform","translateZ( "+j+"px)");
    $("#console").html(i);
}

function getCardoMargin(){
    var width = $("#me").innerWidth();
    var margin = ( width - 6 * 128 ) / 12;
    margin = Math.floor(margin);
    $(".cardo").css("margin-left",margin).css("margin-right",margin);

    $("#console").html(margin);
}

$(function(){
    //setInterval(active,50);
    //getCardoMargin();
    $("#cardo1-range").change(function(){
        $("#cardo1").css("-webkit-transform","rotateY("+this.value+"deg) translateZ( -500px)");
        $("#cardo1-range-value").html(this.value);
    });
});
