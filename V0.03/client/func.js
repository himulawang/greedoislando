var ws1;

//Class char
function char(data) {
    this.id = data.id;
    this.username = data.username;
    this.charname = data.char_name;
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
            battle_info(json);
            var func = ["_GI_", json.type, json.data.cmd].join(".") + "(" + string + ")";
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
            if(json.data.doc.newcomer.id == mychar.id){
                mychar.charname = json.data.doc.newcomer.char_name;
                $("#status_own > p:eq(0)").html("<p>" + json.data.doc.newcomer.char_name + "</p>");
                $("#status_own > p:eq(1)").html("<p>" + json.data.doc.newcomer.id + "</p>");
            }else{
                opchar = new char(json.data.doc.newcomer);
                $("#status_oppo > p:eq(0)").html("<p>" + json.data.doc.newcomer.char_name + "</p>");
                $("#status_oppo > p:eq(1)").html("<p>" + json.data.doc.newcomer.id + "</p>");
            }
            for(y in json.data.doc.roomer){
                if(json.data.doc.roomer[y].id == mychar.id){
                    mychar.charname = json.data.doc.roomer[y].char_name;
                    $("#status_own > p:eq(0)").html("<p>" + json.data.doc.roomer[y].char_name + "</p>");
                    $("#status_own > p:eq(1)").html("<p>" + json.data.doc.roomer[y].id + "</p>");
                }else{
                    opchar = new char(json.data.doc.roomer[y]);
                    $("#status_oppo > p:eq(0)").html("<p>" + json.data.doc.roomer[y].char_name + "</p>");
                    $("#status_oppo > p:eq(1)").html("<p>" + json.data.doc.roomer[y].id + "</p>");
                }
            }
        },

        create_bf : function(json){
            
        },
            
        start_bf : function(json){
            var op_num = 0;
            var character = json.data.doc.char;
            for(x in json.data.doc.char){
                if(x == mychar.id){
                    mychar.charname = character[x].name;
                    mychar.hp = character[x].hp;
                    mychar.maxhp = character[x].maxhp;
                    mychar.speed = character[x].speed;
                    mychar.speedup = character[x].speedup;
                    mychar.actionPoint = character[x].actionPoint;
                    $("#status_own > p:eq(2)").html("<p>HP:" + mychar.hp + " / " + mychar.maxhp + "</p>");
                    $("#status_own > p:eq(3)").html("<p>Speed:" + mychar.speed + "</p>");
                    $("#status_own > p:eq(4)").html("<p>Speedup:" + mychar.speedup + "</p>");
                    $("#status_own > p:eq(5)").html("<p>ActionPoint:" + mychar.actionPoint + "</p>");
                }else{
                    opchar.charname = character[x].name;
                    opchar.hp = character[x].hp;
                    opchar.maxhp = character[x].maxhp;
                    opchar.speed = character[x].speed;
                    opchar.speedup = character[x].speedup;
                    opchar.actionPoint = character[x].actionPoint;
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
            mychar = new char(json.data.doc);
        },

        get_user_list : function(json){
            var x;
            $("#user_online_list").empty();
            $("#user_online_list").append("<p>Online User List<span style='float:right;cursor:pointer;' onclick='list_online_player(2);'>X</span></p>");
            for(x in json.data.doc){
                $("#user_online_list").append("<p>" + json.data.doc[x].username + "</p>");
            }
        },

        get_battlefieldlist : function(json){
            var x;
            $("#battle_field_online_list").empty();
            $("#battle_field_online_list").append("<p>Online BF List<span style='float:right;cursor:pointer;' onclick='list_online_battle_field(2)'>X</span></p>");
            for(x in json.data.doc){
                $("#battle_field_online_list").append("<p>Room No." + json.data.doc[x].no + " " + json.data.doc[x].bf_name + "<span style='float:right;cursor:pointer;' onclick='enter_bf("+ json.data.doc[x].no +");'>Enter</span></p>");
            }
        },

    },

    batt : {
        get_action_point : function(json){
            var x;
            for(x in json.data.doc){
                if(json.data.doc[x].id == mychar.id){
                    var own_value = json.data.doc[x].action_point * 10;
                    $("#own_ap").val(own_value);
                    $("#status_own > p:eq(5)").html("<p>ActionPoint:" + json.data.doc[x].action_point + "</p>");
                }else if(json.data.doc[x].id == opchar.id){
                    var opp_value = json.data.doc[x].action_point * 10;
                    $("#opp_ap").val(opp_value);
                    $("#status_oppo > p:eq(5)").html("<p>ActionPoint:" + json.data.doc[x].action_point + "</p>");
                }
            }
        },

        deal_cardo : function(json){
            var x;
            var y;
            var c_name;
            for(x in json.data.doc){
                if(x == mychar.id){
                    for(y in json.data.doc[x].cardo){
                        c_name = cardo_name(json.data.doc[x].cardo[y]);
                        $("#own_cardo_in_hand_pos_" + y).replaceWith("<div id='own_cardo_in_hand_pos_" + y + "' class='cardo_in_hand' onclick='action_type(" + y + ");'>" + c_name + "</div>");
                    }
                }else if(x == opchar.id){
                    for(y in json.data.doc[x].cardo){
                        c_name = cardo_name(json.data.doc[x].cardo[y]);
                        $("#oppo_cardo_in_hand_pos_" + y).replaceWith("<div id='oppo_cardo_in_hand_pos_'" + y + " class='cardo_in_hand'>" + c_name + "</div>");
                    }
                }
            }
        },

        get_hp : function(json){
            var x;
            for(x in json.data.doc){
                if(x == mychar.id){
                    $("#status_own > p:eq(2)").html("<p>HP:" + json.data.doc[x].hp + " / " + mychar.maxhp + "</p>");
                }else if(x == opchar.id){
                    $("#status_oppo > p:eq(2)").html("<p>HP:" + json.data.doc[x].hp + " / " + opchar.maxhp + "</p>");
                }
            }
        },

	use_cardo : function(json){
	    //
	},

	get_speedup : function(json){
	    for(x in json.data.doc){
	    	if(x == mychar.id){
		    $("#status_own > p:eq(4)").html("<p>Speedup:" + json.data.doc[x].speed_up + "</p>");
		}else if(x == opchar.id){
		    $("#status_oppo > p:eq(4)").html("<p>Speedup:" + json.data.doc[x].speed_up + "</p>");
		}
	    }
	},
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

function get_defendcardo(){
    ws1.send("sys",{cmd:"get_defendcardo"});
}

function get_specialcardo(){
    ws1.send("sys",{cmd:"get_specialcardo"});
}

function action_type(num){
    $("#own_cardo_in_hand_pos_" + num).fadeOut("slow");
    ws1.send("batt",{cmd:"use_cardo",pos:num});
}

var _CARDO_ = {
    0: { name:"GI Cardo"}
    ,51: { name:"Hammer" , description:"and do Low Damage" }
    ,52: { name:"Gun" , description:"and do Medium Damage" }
    ,53: { name:"Bomb" , description:"and do High Damage" }
    ,61: { name:"Fire" , description:"and do Some Fire Damage" }
    ,62: { name:"Thunder" , description:"and do Some Lightning Damage" }
    ,71: { name:"Umbrella" , description:"and can denfend a stone" }
    ,72: { name:"Lid" , description:"and can defend physical damage except bomb" }
    ,73: { name:"GFW" , description:"and can defend all physic attack" }
    ,81: { name:"K.E.D.F" , description:"and reduce 50% magic damage" }
    ,82: { name:"St. Cross Shield" , description:"and reverse magic damage" }
    ,91: { name:"Stone" , description:"and half opponent's ActionPoint" }
    ,92: { name:"Cock Blood" , description:" +2 speed keep 3 rounds" }
    ,93: { name:"Run Away" , description:"and escaping from battlefield" }
    ,94: { name:"Exchange" , description:"and exchange one random opponent cardo with his selected cardo" }
    ,95: { name:"Real Exchange" , description:"and exchange one selected opponent cardo with his selected cardo" }
    ,96: { name:"Mr. Chen's Camera" , description:"and peep one random opponent's cardo" }
    ,97: { name:"Mr. Chen's Teachings" , description:"peep 3 selected opponent's cardo" }

}


function cardo_name(cardo_num){
    return _CARDO_[cardo_num].name;
}

var _BATTLEINFO_ = {
    enter_bf : { info : "entered the battlefield" },
    start_bf : { info : "start to fight" },
    deal_cardo : { info : "gets some new cards" },
    use_cardo : { info : "use the card" },
    get_defendfield : { info : "gets the defendfield" },
    effect_defendfield : { info : "effecr is now on & taking effect" },
    cancel_defendfield : { info : "effect no more exists" },
    get_hp : { info : "Hp remains" },
    get_damage : { info : "gets damage" },
    get_buffer : { info : "gets buff" },
    get_speedup : { info : "gets speedup" },
    get_buffer_remain_round : { info : "remains" },
    get_unbuffer : { info : "buff no more exists"}
}


function battle_info(string){
    var factor = string.data.cmd;
    var now = time_process();
    var player = "";
    switch(factor){
        case "enter_bf":
            for(x in string.data.doc.newcomer){
                player = string.data.doc.newcomer[x];
            }
            $("#battle_log").prepend("<p>" + now + " " + player + " " +  _BATTLEINFO_[factor].info + "</p>");
            break;
        case "start_bf":
            for(x in string.data.doc.char){
                if(player){
                    player = player + " & " + string.data.doc.char[x].name;
                }else{
                    player =  string.data.doc.char[x].name;
                }
            }
            $("#battle_log").prepend("<p>" + now + " " + player + " " +  _BATTLEINFO_[factor].info + "</p>");
            break;
       case "deal_cardo":
            for(x in string.data.doc){
                if(x == mychar.id){
                    $("#battle_log").prepend("<p>" + now + " " + mychar.charname + " " +  _BATTLEINFO_[factor].info + "</p>");
                }else if(x == opchar.id){
                    $("#battle_log").prepend("<p>" + now + " " + opchar.charname + " " +  _BATTLEINFO_[factor].info + "</p>");
                }
            }
            break;
       case "use_cardo":
	    for(x in string.data.doc){
           	 if(x == mychar.id){
           	     $("#battle_log").prepend("<p>" + now + " " + mychar.charname + " " +  _BATTLEINFO_[factor].info + " " + _CARDO_[string.data.doc[x].xxx].name + " " + _CARDO_[string.data.doc[x].xxx].description + "</p>");
           	 }else if(x == opchar.id){
           	     $("#battle_log").prepend("<p>" + now + " " + opchar.charname + " " +  _BATTLEINFO_[factor].info + " " + _CARDO_[string.data.doc[x].xxx].name + " " + _CARDO_[string.data.doc[x].xxx].description + "</p>");
           	 }
	    }
            break;
       case "get_defendfield":
            for(x in string.data.doc){
                if(x == mychar.id){
                    $("#battle_log").prepend("<p>" + now + " " + mychar.charname + " " +  _BATTLEINFO_[factor].info + " " + _CARDO_[string.data.doc[x].df].name + "</p>");
                }else if(x == opchar.id){
                    $("#battle_log").prepend("<p>" + now + " " + opchar.charname + " " +  _BATTLEINFO_[factor].info + " " + _CARDO_[string.data.doc[x].df].name + "</p>");
                }
            }
            break;
       case "effect_defendfield":
	    for(x in string.data.doc){
	    	if(x == mychar.id){
                    $("#battle_log").prepend("<p>" + now + " " + mychar.charname + " " +  _BATTLEINFO_[factor].info + " " + _CARDO_[string.data.doc[x].df].name + "</p>");
                }else if(x == opchar.id){
                    $("#battle_log").prepend("<p>" + now + " " + opchar.charname + " " +  _BATTLEINFO_[factor].info + " " + _CARDO_[string.data.doc[x].df].name + "</p>");
                }
	    }
	    break;
       case "cancel_defendfield":
            for(x in string.data.doc){
                if(x == mychar.id){
                    $("#battle_log").prepend("<p>" + now + " " + mychar.charname + " " + _CARDO_[string.data.doc[x].df].name + " " +  _BATTLEINFO_[factor].info + "</p>");
                }else if(x == opchar.id){
                    $("#battle_log").prepend("<p>" + now + " " + opchar.charname + " " + _CARDO_[string.data.doc[x].df].name + " " +  _BATTLEINFO_[factor].info + "</p>");
                }
            }
            break;
       case "get_hp":
            for(x in string.data.doc){
                if(x == mychar.id){
                    $("#battle_log").prepend("<p>" + now + " " + mychar.charname + " " +  _BATTLEINFO_[factor].info + " " + string.data.doc[x].hp + "</p>");
                }else if(x == opchar.id){
                    $("#battle_log").prepend("<p>" + now + " " + opchar.charname + " " +  _BATTLEINFO_[factor].info + " " + string.data.doc[x].hp + "</p>");
                }
            }
            break;
       case "get_damage":
            for(x in string.data.doc){
	    	if(x == mychar.id){
		    $("#battle_log").prepend("<p>" + now + " " + mychar.charname + " " + _BATTLEINFO_[factor].info + " " + string.data.doc[x].damage + "</p>");
		}else if(x == opchar.id){
		    $("#battle_log").prepend("<p>" + now + " " + opchar.charname + " " + _BATTLEINFO_[factor].info + " " + string.data.doc[x].damage + "</p>");
		}
	    }
      	    break;
       case "get_buffer" :
	    for(x in string.data.doc){
	    	if(x == mychar.id){
		    $("#battle_log").prepend("<p>" + now + " " + mychar.charname + " " + _BATTLEINFO_[factor].info + " " + _CARDO_[string.data.doc[x].buffer].description + "</p>");
		}else if(x == opchar.id){
		    $("#battle_log").prepend("<p>" + now + " " + opchar.charname + " " + _BATTLEINFO_[factor].info + " " + _CARDO_[string.data.doc[x].buffer].description + "</p>");
		}
	    }
       	    break;
       case "get_buffer_remain_round":
	    for(x in string.data.doc){
	    	if(x == mychar.id){
		    $("#battle_log").prepend("<p>" + now + " " + mychar.charname + " " + _CARDO_[string.data.doc[x].buffer].name + " " + _BATTLEINFO_[factor].info + " " + string.data.doc[x].remain_round + " rounds</p>");
		}else if(x == opchar.id){
		    $("#battle_log").prepend("<p>" + now + " " + opchar.charname + " " + _CARDO_[string.data.doc[x].buffer].name + " " + _BATTLEINFO_[factor].info + " " + string.data.doc[x].remain_round + " rounds</p>");
		}
	    }
	    break;
       case "get_unbuffer":
	    for(x in string.data.doc){
	    	if(x == mychar.id){
		    $("#battle_log").prepend("<p>" + now + " " + mychar.charname + " " + _CARDO_[string.data.doc[x].buffer].name + " " + _BATTLEINFO_[factor].info + "</p>");
		}else if(x == opchar.id){
		    $("#battle_log").prepend("<p>" + now + " " + opchar.charname + " " + _CARDO_[string.data.doc[x].buffer].name + " " + _BATTLEINFO_[factor].info + "</p>");
		}
	    }
	    break;

    }
}

function time_process(){
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    if(hour < 10){
        hour = "0" + hour;
    }
    if(min < 10){
        min = "0" + min;
    }
    if(sec < 10){
        sec = "0" + sec;
    }
    var time = hour + ":" + min + ":" + sec;
    return time;
}

$(function(){
    connect();
});

