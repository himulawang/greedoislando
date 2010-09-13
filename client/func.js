$(function(){
    connect();
});

function status(state){
    $("#state").html("State:" + state);
}

function output(info){
    $("#console").append("<div>" + info + "</div>");
}

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

function create_battlefield(state){
	if(state==1){
		if($("#create_ch").css("display")=="none"){
			$("#create_ch").slideDown("normal");
		}else{
			$("#create_ch").hide("fast",function(){
				$("#create_ch").slideDown("normal");
			});			
		}		
	}else if(state==2){
		$("#create_ch").slideUp("normal");
	}
}

function create_char(){
	var char = $("#char_name").val();
	ws1.send("pre",{cmd:"prepareChar",name:char,no:0});
	$("#battle_field").css({display:"none"});
	$("#battle_room").css({display:"block"});
	$("#status_own > p:eq(2)").html(char);
}
