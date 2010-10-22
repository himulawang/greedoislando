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
            write_log(string);
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
                $("#b-list").append("<div class='online-room-block'>Room No." + json.data.doc[x].no + " " + json.data.doc[x].bf_name + "</div>");
            }

            $(".online-room-block").bind("click",function(){
                var selected = $(".online-room-block").filter(".selected");
                if(selected){
                    selected.removeClass("selected");
                }
                $(this).addClass("selected");
                
                

            });
        }

    }
}

