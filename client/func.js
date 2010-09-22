var ws1;

//Class char
function char(data) {
    this.id = data.id;
    this.username = data.username;
    this.charname = data.charname;
    this.hp = data.hp;
    this.maxhp = data.maxhp;
    this.speed = data.speed;
    this.speedup = data.speedup;
    this.actionPoint = data.actionPoint;
    this.cardo = [];
}

var mychar;
var opchar;

var _GI_ = {
    core : {
        globalProcess : function(msg){
            var json = JSON.parse(msg.data);
            var string = msg.data;
            //output(string);
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
                if(x == mychar.id){
                    mychar.charname = json.data.char[x];
                    $("#status_own > p:eq(0)").html("<p>" + json.data.char[x] + "</p>");
                    $("#status_own > p:eq(1)").html("<p>" + x + "</p>");
                }else{
                    opchar = new char(json.data.char);
                    opchar.id = x;
                    opchar.charname = json.data.char[x];
                    $("#status_oppo > p:eq(0)").html("<p>" + json.data.char[x] + "</p>");
                    $("#status_oppo > p:eq(1)").html("<p>" + x + "</p>");
                }
            }
        },

        create_bf : function(json){
            
        },
            
        start_bf : function(json){
            var op_num = 0;
            for(x in json.data.char){
                if(x == mychar.id){
                    mychar.hp = json.data.char[x].hp;
                    mychar.maxhp = json.data.char[x].maxhp;
                    mychar.speed = json.data.char[x].speed;
                    mychar.speedup = json.data.char[x].speedup;
                    mychar.actionPoint = json.data.char[x].actionPoint;
                    $("#status_own > p:eq(2)").html("<p>HP:" + mychar.hp + " / " + mychar.maxhp + "</p>");
                    $("#status_own > p:eq(3)").html("<p>Speed:" + mychar.speed + "</p>");
                    $("#status_own > p:eq(4)").html("<p>Speedup:" + mychar.speedup + "</p>");
                    $("#status_own > p:eq(5)").html("<p>ActionPoint:" + mychar.actionPoint + "</p>");
                }else{
                    opchar.hp = json.data.char[x].hp;
                    opchar.maxhp = json.data.char[x].maxhp;
                    opchar.speed = json.data.char[x].speed;
                    opchar.speedup = json.data.char[x].speedup;
                    opchar.actionPoint = json.data.char[x].actionPoint;
                    $("#status_oppo > p:eq(2)").html("<p>HP:" + opchar.hp + " / " + opchar.maxhp + "</p>");
                    $("#status_oppo > p:eq(3)").html("<p>Speed:" + opchar.speed + "</p>");
                    $("#status_oppo > p:eq(4)").html("<p>Speedup:" + opchar.speedup + "</p>");
                    $("#status_oppo > p:eq(5)").html("<p>ActionPoint:" + opchar.actionPoint + "</p>");
                }
            }
        }
    },

    con : {
        get_id : function(json){
            mychar = new char(json.data);
        },

        get_user_list : function(json){
            var x;
            $("#user_online_list").empty();
            $("#user_online_list").append("<p>Online User List<span style='float:right;cursor:pointer;' onclick='list_online_player(2);'>X</span></p>");
            for(x in json.data.userlist){
                $("#user_online_list").append("<p>" + json.data.userlist[x].username + "</p>");
            }
        },

        get_battlefieldlist : function(json){
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
            for(x in json.data.char){
                if(x == mychar.id){
                    var own_value = json.data.char[x] * 10;
                    $("#own_ap").val(own_value);
                    $("#status_own > p:eq(5)").html("<p>ActionPoint:" + json.data.char[x] + "</p>");
                }else{
                    var opp_value = json.data.char[x] * 10;
                    $("#opp_ap").val(opp_value);
                    $("#status_oppo > p:eq(5)").html("<p>ActionPoint:" + json.data.char[x] + "</p>");
                }
            }
        },

        deal_cardo : function(json){
            var x;
            var c_name;
            for(x in json.data){
                var y;
                if(x == mychar.id){
                    $("#own_cardo_in_hand").empty();
                    for(y in json.data[x]){
                        c_name = cardo_name(json.data[x][y]);
                        $("#own_cardo_in_hand").append("<div style='border:1px solid #CCC;height:100px;width:75px;float:left;margin-left:5px;cursor:pointer; border-radius: 5px;' onclick='action_type(" + y + ");'>" + c_name + "</div>");
                    }
                }else if(x == opchar.id){
                    $("#oppo_cardo_in_hand").empty();
                    for(y in json.data[x]){
                        c_name = cardo_name(json.data[x][y]);
                        $("#oppo_cardo_in_hand").append("<div style='border:1px solid #CCC;height:100px;width:75px;float:left;margin-left:5px; border-radius: 5px;'>" + c_name + "</div>");
                    }
                }
            }
        },

        get_hp : function(json){
            var x;
            for(x in json.data){
                if(x == mychar.id){
                    $("#status_own > p:eq(3)").html("<p>" + json.data[x] + "</p>");
                }else if(x == opchar.id){
                    $("#status_oppo > p:eq(2)").html("<p>" + json.data[x] + "</p>");
                }
            }
        }
    },

    sys : {
        get_attackcardo : function(json){
            //
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
	$("#battle_field").css({display:"none"});
	$("#battle_room").css({display:"block"});
}

function bf_start(){
    char = mychar.charname;
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

function get_attackcardo(){
    ws1.send("sys",{cmd:"get_attackcardo"});
}

function action_type(number){
    ws1.send("batt",{cmd:"use_cardo",pos:number});
}

var _CARDO_ = {
    0: { name:"GI Cardo"}
    ,51: { name:"Hammer" }
    ,52: { name:"Gun" }
    ,53: { name:"Bomb" }
    ,61: { name:"Fire" }
    ,62: { name:"Thunder" }
    ,71: { name:"Umbrella" }
    ,72: { name:"Lid" }
    ,73: { name:"GFW" }
    ,81: { name:"K.E.D.F" }
    ,82: { name:"St. Cross Shield" }
    ,91: { name:"Stone" }
    ,92: { name:"Cock Blood" }
    ,93: { name:"Run Away" }
    ,94: { name:"Exchange" }
    ,95: { name:"Real Exchange" }
    ,96: { name:"Mr. Chen's Camera" }
    ,97: { name:"Mr. Chen's Teachings" }

}


function cardo_name(cardo_num){
    return _CARDO_[cardo_num].name;
}

$(function(){
    connect();
});

