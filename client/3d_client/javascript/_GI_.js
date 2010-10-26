var char = function(data){
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

var _GI_ = {
	core : {
		globalProcess : function(msg){
			var json = JSON.parse(msg.data);
			var string = msg.data;
            //write_log(string);
			var func = ["_GI_", json.type , json.data.cmd].join(".") + "(" + string + ")";
			$.globalEval(func);
		}
	},

    con : {
        get_id : function(json){
            mychar = new char(json.data.doc);
        },

        get_user_list : function(json){
            var x;
            var list = $("#p-list");
            list.empty();
            for(x in json.data.doc){
                list.append("<div class='online-player-block'>" + json.data.doc[x].username + "</div>");
            }
        },

        get_battlefieldlist : function(json){
            var x;
            var room = [];
            $("#b-list").empty();
            for(x in json.data.doc){
                $("#b-list").append("<div class='online-room-block' id='" + json.data.doc[x].no + "'>Room No." + json.data.doc[x].no + " " + json.data.doc[x].bf_name + "</div>");
                room[json.data.doc[x].no] = json.data.doc[x];
            }

            $(".online-room-block").bind("click", function(){
                var selected = $(".online-room-block").filter(".selected");
                if(selected){
                    selected.removeClass("selected");
                }
                $(this).addClass("selected");
                
                $("#b-detail").empty();
                var room_no = $(this).attr('id');
                if(room[room_no].battleStart == 0){
                    room[room_no].battleStart_status = "Preparing";
                }else{
                    room[room_no].battleStart_status = "Playing";
                }
                var str = "<div class='room-name'>Room Name : " + room[room_no].bf_name + "</div>";
                str += "<div class='room-prepare-status'>Room Status : " + room[room_no].battleStart_status + "</div>";
                str += "<div class='players-in-room'>Player In Room : ";
                for(x in room[room_no].char){
                    str += "<div class='player-in-room'> " + x + " : " + room[room_no].char[x].char_name + "</div>";
                }
                str += "</div>";
                $("#b-detail").append(str);
            });

            $(".online-room-block").bind("dblclick", function(){
                var room_no = $(this).attr('id');
                enter_bf(room_no);
            });
        }

    },

    pre : {
        enter_bf : function(json){
            generate_battle_field();
            str = json.data.doc.bf_name;
            $("#room-name-title").append(str);
        },

        start_bf : function(json){
            var x;
            var str;

            $("#me-info-left").fadeOut("50",function(){
                $("#me").fadeIn("50");
                $("#ready-to-fight").remove();
                for(x in json.data.doc.char){
                    str = "<div class='char-attr-info'>ID: " + json.data.doc.char[x].id + "</div>";
                    str += "<div class='char-attr-info'>Name: " + json.data.doc.char[x].name + "</div>";
                    str += "<div class='char-attr-info'>HP: <span id='me-current-hp'>" + json.data.doc.char[x].hp + "</span> / " + json.data.doc.char[x].maxhp + "</div>";
                    str += "<div class='char-attr-info'>Speed: <span id='me-current-speed'>" + json.data.doc.char[x].speed + "</span></div>";
                    str += "<div class='char-attr-info'>Speedup: <span id='me-current-speedup'>" + json.data.doc.char[x].speedup + "</span></div>";
                    str += "<div class='char-attr-info'>ActionPoint: <span id='me-current-actionpoint'>" + json.data.doc.char[x].actionPoint + "</span></div>";
                    if(x == mychar.id){
                        $("#me-info-left").append(str);
                    }else{
                        $("#enemy-info-right").append(str);
                    }
                }
            }).delay("10").fadeIn("50");
        }
    },

    batt : {
        deal_cardo : function(json){
            var x,y,str,func;
            for(x in json.data.doc){
                if(x == mychar.id){
                    for(y in json.data.doc[x].cardo){
                        str = json.data.doc[x].cardo[y];
                        if(y == 0){
                            cardo0.front.empty();
                            cardo0.front.append(str);
                        }else if(y == 1){
                            cardo1.front.empty();
                            cardo1.front.append(str);
                        }else if(y == 2){
                            cardo2.front.empty();
                            cardo2.front.append(str);
                        }else if(y == 3){
                            cardo3.front.empty();
                            cardo3.front.append(str);
                        }else if(y == 4){
                            cardo4.front.empty();
                            cardo4.front.append(str);
                        }else if(y == 5){
                            cardo5.front.empty();
                            cardo5.front.append(str);
                        }
                    }
                }
            }
        }       
    }
}

