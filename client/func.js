var ws1;

var _GI_ = {
    core : {
        globalProcess : function(msg){
            var json = JSON.parse(msg.data);
            var string = msg.data;
            output(string);
            var func = ["_GI_", json.type, json.data.cmd].join(".") + "("+string+")";
            $.globalEval(func);
        }
    },

    talk : {
        talk : function(json){
            output(json.data.name + ": "+json.data.msg);
        } 
    },

    pre : {        
        enter_bf : function(json){
            for(x in json.data.char){
                charname = $("#status_own > p:eq(1)").text();
                if(json.data.char[x] == charname){
                    $("#status_own > p:eq(1)").html("<p>" + json.data.char[x] + "</p>");
                    $("#status_own > p:eq(2)").html("<p>" + x + "</p>");
                }else{
                    $("#status_oppo > p:eq(0)").html("<p>" + json.data.char[x] + "</p>");
                    $("#status_oppo > p:eq(1)").html("<p>" + x + "</p>");
                }
            }
        },
        create_bf : function(json){
            //创建战场
        }
    },

    con : {
        get_id : function(json){
            $("#status_own > p:eq(0)").html("<p>" + json.data.username + "<span class='id'>" + json.data.id + "</span></p>");
        },

        set_user_list : function(json){
            var x;
            $("#user_online_list").empty();
            $("#user_online_list").append("<p>Online User List<span style='float:right;cursor:pointer;' onclick='list_online_player(2);'>X</span></p>");
            for(x in json.data.userlist){
                $("#user_online_list").append("<p>" + json.data.userlist[x].username + "</p>");
            }
        },

        set_battlefieldlist : function(json){
            var x;
            $("#battle_field_online_list").empty();
            $("#battle_field_online_list").append("<p>Online BF List<span style='float:right;cursor:pointer;' onclick='list_online_battle_field(2)'>X</span></p>");
            for(x in json.data.battlefieldlist){
                $("#battle_field_online_list").append("<p>Room No." + json.data.battlefieldlist[x].no + " " + json.data.battlefieldlist[x].bf_name + "<span style='float:right;cursor:pointer;' onclick='enter_bf("+ json.data.battlefieldlist[x].no +");'>Enter</span></p>");
            }            
        },

    },

    batt : {
        set_action_point : function(json){
            var x;
            var ownid = $("#status_own > p:eq(2)").text();
            var oppid = $("#status_oppo > p:eq(1)").text();
            for(x in json.data.char){
                if(x == ownid){
                    var own_value = json.data.char[x] * 10;
                    $("#own_ap").val(own_value);
                }else if(x == oppid){
                    var opp_value = json.data.char[x] * 10;
                    $("#opp_ap").val(opp_value);
                }
            }
        },

        deal_cardo : function(json){
            var x;
            var ownid = $("#status_own > p:eq(2)").text();
            var oppid = $("#status_oppo > p:eq(1)").text();
            for(x in json.data.cardo){
                var y;
                if(x == ownid){
                    for(y in json.data.cardo[x]){
                        $("#cardo_own").append("<div style='border:1px solid #CCC;height:100px;width:75px;float:left;margin-left:5px;' onclick='use_actionpoint();'>" + json.data.cardo[x][y] + "</div>");
                    }
                }else if(x == oppid){
                    for(y in json.data.cardo[x]){
                        $("#cardo_oppo").append("<div style='border:1px solid #CCC;height:100px;width:75px;float:left;margin-left:5px;' onclick='use_actionpoint();'>" + json.data.cardo[x][y] + "</div>");
                    }
                }
            }
        }

    }
}

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

            /*
            talk: function(json){
                output(json.data.name + ": "+json.data.msg);
            },
            pre: function(json){
                output(JSON.stringify(json));
                if(json.data.cmd == "set_user_list"){
                    output(json.data.userlist[0].username);
                }
                //myChar = new char(json.data);
                Pro
            },
            con: function(json){
                output(JSON.stringify(json));
                //setTimeout(status("Success!"),1000);
            }
                */
        }
    });    
    ws1.onopen = function(){
        output("Connected"); 
        set_user_name();
        setInterval(
            function(){
                if(ws1.bufferedAmount == 0){
                    ws1._send(1);
                }
            }
        , 100);
    }
    ws1.onclose = function(){ output("Disconnected"); }
    ws1.onmessage = function(msg){
        _GI_.core.globalProcess(msg);
    }
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
    set_user_name();
    var username = $("#user_name").val();
	var char = $("#char_name").val();
    var bf_name = $("#bf_name").val();
    ws1.send("pre",{cmd:"create_bf",bf_name:bf_name,char_name:char});
    $("#status_own > p:eq(1)").html("<p>" + char + "</p>");
	$("#battle_field").css({display:"none"});
	$("#battle_room").css({display:"block"});
}

function list_online_player(state){
    if(state==1){
		if($("#user_online_list").css("display")=="none"){
			$("#user_online_list").slideDown("normal");
		}else{
			$("#user_online_list").hide("fast",function(){
				$("#user_online_list").slideDown("normal");
			});			
		}		
	}else if(state==2){
		$("#user_online_list").slideUp("normal");
	}
}

function list_online_battle_field(state){
    if(state==1){
		if($("#battle_field_online_list").css("display")=="none"){
			$("#battle_field_online_list").slideDown("normal");
		}else{
			$("#battle_field_online_list").hide("fast",function(){
				$("#battle_field_online_list").slideDown("normal");
			});			
		}		
	}else if(state==2){
		$("#battle_field_online_list").slideUp("normal");
	}
}

function enter_bf(num){
	set_user_name();
	var username = $("#user_name").val();
	var char = $("#char_name").val();
	var bf_no = num;
	ws1.send("pre",{cmd:"enter_bf",bf_no:bf_no,char_name:char});
    $("#status_own > p:eq(1)").html("<p>" + char + "</p>");
	$("#battle_field").css({display:"none"});
	$("#battle_room").css({display:"block"});
}

function bf_start(){
    char = $("#status_own > p:eq(1)").text();
    ws1.send("pre",{cmd:"start_bf"});
}

function chat(){
    var el = $("#chat_input");
    var char = $("#status_own > p:eq(1)").val();
    var msg = el.val()
    var json = {name:char,msg:msg}
    ws1.send("talk",json);
    el.val("");
}

function use_actionpoint(){
    ws1.send("sys",{cmd:"use_actionpoint"});
}

$(function(){
    connect();
});

