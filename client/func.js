var ws1;

function connect(){
    if(ws1){
        if(ws1.readyState == 1){return;}
    }
    //status("Connecting...");
    output("Connecting");
    ws1 = $.websocket("ws://localhost:12345/",{
        open: function(){ },
        close: function(){ },
        events: {
            talk: function(json){
                output(json.data.name + ": "+json.data.msg);
            },
            pre: function(json){
                output(JSON.stringify(json));
                if(json.data.cmd == "set_user_list"){
                    output(json.data.userlist[0].username);
                }
                //myChar = new char(json.data);
            },
            con: function(json){
                output(JSON.stringify(json));
                //setTimeout(status("Success!"),1000);
            }
        }
    });    
    ws1.onopen = function(){
        output("Connected"); 
        setInterval(
            function(){
                if(ws1.bufferedAmount == 0){
                    ws1._send(1);
                }
            }
        , 100);
    }
    ws1.onclose = function(){ output("Disconnected"); }
}

function disconnect(){
    ws1.close();
}

function output(info){
    $("#console").append("<div>" + info + "</div>");
}

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
        $("#" + tohide).animate({height:"600px"},500,function(){
            $(tochange).html("Hide");
        });
    }
}

function set_user_name(){
    var username = $("#user_name").val();
    ws1.send("con",{cmd:"set_username",username:username});
}

function create_battlefield_info(state){
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

function change_name(){
    $("#user_name").removeAttr("readonly");
}

function create_battlefield(){
	var char = $("#char_name").val();
    var bf_name = $("#bf_name").val();
    ws1.send("pre",{cmd:"create_bf",bf_name:bf_name,char_name:char});
	$("#battle_field").css({display:"none"});
	$("#battle_room").css({display:"block"});
	$("#status_own").html(char);
}

function list_online_player(){
    
}

$(function(){
    connect();
});

