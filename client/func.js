$(function(){
    connect();
});

function hide_show_toggle(tohide,tochange){
    if($(tochange).html() == "Hide"){
        $("#" + tohide).animate({height:"12px"},500,function(){
            $(tochange).html("Show");
        });
    }else if($(tochange).html() == "Show"){
        $("#" + tohide).animate({height:"400px"},500,function(){
            $(tochange).html("Hide");
        });
    }
}

function create_battlefield(){
    
}
