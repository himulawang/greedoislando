$(function(){
    ws = new _GI_Connection_("ws://localhost:12345/");
    generate.login_interface();
    char = new _GI_Character_();
    room = new _GI_Room_();
    my_cardo_slot = [];
    enemy_cardo_slot = [];
    _GI_ = new _GI_World_();
});

var _GI_,intervalArray = [],ws,char,room,actionbar;

function write_log(info){
	$("#console").append("<p>" + info + "</p>");
}

var _GI_Connection_ = Class.extend({
    init : function(url){
        this.ws = WebSocket ? new WebSocket(url) : null;
        if(!this.ws) return;

        this.ws.onopen = function(){
            write_log("Connected");
            setInterval( function(){ if(this.ws.bufferedAmount === 0) this.ws.send(1); }
                ,100);
        }

        this.ws.onclose = function(){ write_log("Disconnected"); }
        this.ws.onmessage = function(msg){
            var get = JSON.parse(msg.data);
            var type = get.type;
            var data = get.data;
            var cmd = data.cmd;
            var doc = data.doc;

            if(type==="batt"){
                var id;
                for(id in doc){
                    _GI_[type][id][cmd](doc);
                }
            }else{
                _GI_[type][cmd](doc);
            }
        }

        var _this = this;
        $(window).unload(function(){ _this.ws.close(); this.ws = null });

    }
    ,state : function(){
        return this.ws.readyState;
    }
    ,send : function(type,data){
        var info = {
            type: type
            ,data: data
        };
        return this.ws.send(JSON.stringify(info));
    }
    ,set_username : function(username){
        this.send("con",{cmd:"set_username",username:$.cookie("_GI_username")});
    }
    ,set_room : function(roomname,charname){
        this.send("pre",{cmd:"create_bf",bf_name:roomname,char_name:charname});
    }
    ,enter_bf : function(room_no){
        this.send("pre",{cmd:"enter_bf",bf_no:room_no,char_name:char.name()});
    }
    ,start_bf : function(){
        this.send("pre",{cmd:"start_bf"});
    }
});

var _GI_Character_ = Class.extend({
    init : function(){
        this.charName = null;
        this.actionpoint = 0;
    }
    ,name : function(name){
        if(arguments.length===0) return this.charName;

        if(name===undefined){
            alert("Plz Enter A Character Name");
            return;
        }

        generate.cancel_dialog();
        this.charName = name;
        var str = "<img src='" + name + ".jpg' class='avatar-1' />";
        $("#avatar").empty().append(str);
        new _Effect_Print_Text_("Hello, " + name + "! Welcome to the world of Greedo Island , u are now available to fight!",$("#char-set-des"));
    }
});

var _Character_My_ = _GI_Character_.extend({
    init : function(id){
        this._super();
        this.id = id;
        this.cardo_slot = [];
    }
    ,deal_cardo : function(doc){
        var x,xxx;
        for(x in doc[this.id].cardo){
            this.cardo_slot[x] = new _Cardo_My_(x).appendTo($("#me"));
            xxx = doc[this.id].cardo[x];
            this.cardo_slot[x].front.empty();
            this.cardo_slot[x].front.append(xxx);
        }
    }
    ,get_action_point : function(doc){
        var p = doc[this.id].action_point * 10;
        this.actionpoint = p;
        actionbar.change("my",p);
    }
});

var _Character_Enemy_ = _GI_Character_.extend({
    init : function(id){
        this._super();
        this.id = id;
        this.cardo_slot = [];
    }
    ,deal_cardo : function(doc){
        var x,xxx;
        for(x in doc[this.id].cardo){
            this.cardo_slot[x] = new _Cardo_Enemy_(x).appendTo($("#enemy-info-left"));
            xxx = doc[this.id].cardo[x];
            this.cardo_slot[x].front.empty();
            this.cardo_slot[x].front.append(xxx);
        }
    }
    ,get_action_point : function(doc){
        var p = doc[this.id].action_point * 10;
        this.actionpoint = p;
        actionbar.change("enemy",p);
    }
});

var _GI_World_ = Class.extend({
    init : function(){
    }
    ,con : {
        get_id : function(doc){
            this.id = doc.id;
            this.username = doc.username;
            _GI_ID_ = doc.id;
        }
        ,get_user_list : function(doc){
            this.userList = doc;
            var str = "",x;
            for(x in doc){
                str += "<div class='online-player-block'>" + doc[x].username + "</div>";
            }
            $("#p-list").empty().append(str);
        }
        ,get_battlefieldlist : function(doc){
            this.battlefieldList = doc;
            var x,str = "";
            var rooms = [];
            for(x in doc){
                str += "<div class='online-room-block' id='" + doc[x].no + "'>Room No." + doc[x].no + " " + doc[x].bf_name + "</div>";
                rooms[doc[x].no] = doc[x];
            }
            $("#b-list").empty().append(str);

            $(".online-room-block").bind("click", function(){
                var selected = $(".online-room-block").filter(".selected");
                if(selected){
                    selected.removeClass("selected");
                }
                $(this).addClass("selected");
                
                $("#b-detail").empty();
                var room_no = $(this).attr('id');
                if(rooms[room_no].battleStart == 0){
                    rooms[room_no].battleStart_status = "Preparing";
                }else{
                    rooms[room_no].battleStart_status = "Playing";
                }
                var str = "<div class='room-name'>Room Name : " + rooms[room_no].bf_name + "</div>";
                str += "<div class='room-prepare-status'>Room Status : " + rooms[room_no].battleStart_status + "</div>";
                str += "<div class='players-in-room'>Player In Room : ";
                for(x in rooms[room_no].char){
                    str += "<div class='player-in-room'> " + x + " : " + rooms[room_no].char[x].char_name + "</div>";
                }
                str += "</div>";
                $("#b-detail").append(str);
            });

            $(".online-room-block").bind("dblclick", function(){
                var room_no = $(this).attr('id');
                room.enter(room_no);
            });
        }        
    }
    ,pre : {
        enter_bf : function(doc){
            generate.battlefield();
            str = doc.bf_name;
            $("#room-name-title").append(str);
        }
        ,start_bf : function(doc){
            var x;
            var str;

            for(x in doc.char){
                if(x === _GI_ID_){
                    _GI_.batt[_GI_ID_] = new _Character_My_(_GI_ID_);
                }else{
                    _GI_.batt[x] = new _Character_Enemy_(x);
                }
            }

            actionbar = new _Bar_Action_(["enemy","my"]).appendTo($("#action-bar"));

            $("#me-info-left").fadeOut("50",function(){
                $("#me").fadeIn("50");
                $("#ready-to-fight").remove();
                for(x in doc.char){
                    if(x === _GI_ID_){
                        str = "<div class='char-attr-info'>ID: " + doc.char[x].id + "</div>";
                        str += "<div class='char-attr-info'>Name: " + doc.char[x].name + "</div>";
                        str += "<div class='char-attr-info'>HP: <span id='me-current-hp'>" + doc.char[x].hp + "</span> / " + doc.char[x].maxhp + "</div>";
                        str += "<div class='char-attr-info'>Speed: <span id='me-current-speed'>" + doc.char[x].speed + "</span></div>";
                        str += "<div class='char-attr-info'>Speedup: <span id='me-current-speedup'>" + doc.char[x].speedup + "</span></div>";
                        str += "<div class='char-attr-info'>ActionPoint: <span id='me-current-actionpoint'>" + doc.char[x].actionPoint + "</span></div>";
                        $("#me-info-left").append(str);
                    }else{
                        str = "<div class='char-attr-info'>ID: " + doc.char[x].id + "</div>";
                        str += "<div class='char-attr-info'>Name: " + doc.char[x].name + "</div>";
                        str += "<div class='char-attr-info'>HP: <span id='enemy-current-hp'>" + doc.char[x].hp + "</span> / " + doc.char[x].maxhp + "</div>";
                        str += "<div class='char-attr-info'>Speed: <span id='enemy-current-speed'>" + doc.char[x].speed + "</span></div>";
                        str += "<div class='char-attr-info'>Speedup: <span id='enemy-current-speedup'>" + doc.char[x].speedup + "</span></div>";
                        str += "<div class='char-attr-info'>ActionPoint: <span id='enemy-current-actionpoint'>" + doc.char[x].actionPoint + "</span></div>";
                        $("#enemy-info-right").append(str);
                    }
                }
            }).delay("10").fadeIn("50");
        }
    }
    ,batt : {}
});

var _GI_Room_ = Class.extend({
    init : function(){
        this.roomName = null;
    }
    ,name : function(){
        return this.roomName;
    }
    ,set : function(name){
        if (char.name() === null){
            alert("Plz Set A Character Name First");
            return;
        }

        generate.cancel_dialog();
        ws.set_room(name,char.name());
    }
    ,enter : function(room_no){
        if (char.name()===null){
            alert("Plz Set A Character Name First");
            return;
        }

        ws.enter_bf(room_no);
    }
    ,start : function(){
        ws.start_bf();
    }
});

var _GI_Effect_ = Class.extend({
});
var _Effect_Print_Text_ = _GI_Effect_.extend({
    init : function(text,el){
        this.text = text;
        this.max = text.length;
        this.el = $(el).empty();
        var _this = this;
        this.idx = intervalArray.push( setInterval(function(){ _this.generate(); } , 10) );
    }
    ,generate : function(){
        var len = this.el.html().length;
        if(len >= this.max){
            window.clearInterval(intervalArray[this.idx - 1]);
            return;
        }
        var char = this.text.charAt(len);
        this.el.append(char);
    }
});
var generate = {
    login_interface : function(){
        var str;
        str = "<div id='welcome-title'></div>";
        str += "<div id='login-div'><div><p>USERNAME: </p><input type='text' id='username' class='text-input' value='' /></div>";
        str += "<div><p>PASSWORD: </p><input type='password' id='password' class='text-input' value='' /></div>";
        str += "<div id='login-func-button'><input type='button' value='LOGIN' class='button index-login' id='login'/><input type='button' value='WELCOME' class='button index-login' onclick='generate.welcome();'/></div></div>";
        $("#a-game").append(str);

        $("#login").bind('click',function(){
            var username = $("#username").val();

            if(!username) return;

            if(username != $.cookie("_GI_username")){
                $.cookie("_GI_username",username,{expires:1});
            }
            
            if(ws.state() === 1){
                $("#a-game").fadeOut("200",function(){
                    generate.setup_interface();
                }).delay(20).fadeIn("200");
            }
        });

        var username = $.cookie("_GI_username");
        if(username){
            $("#username").val(username);
            $("#login").trigger('click');
        }
    }
    ,setup_interface : function(){
        ws.set_username();
        $("#a-game").empty();
        str = "<div id='user-list-info' class='list-info'></div>";
        str += "<div id='bf-list-info' class='list-info'><p class='block-title'>Online Room</p><div id='b-list' class='list'></div></div>";
        str += "<div id='bf-info' class='list-info'><p class='block-title'>Room Detail</p><div id='b-detail' class='list'></div></div>";
        $("#a-game").append(str);
        str = "<div id='char-info'><div id='avatar'></div><div id='char-des-1'></div><div id='char-des-2'>reservation</div></div><div id='online-player-list'><p class='block-title'>Online Player</p><div id='p-list' class='list'></div></div>";
        $("#user-list-info").append(str);
        str = "<input type='button' value='Set Character' id='set-character' class='button set-info' />";
        str += "<input type='button' value='Set Room' id='set-room' class='button set-info' />";
        str += "<div id='char-set-des'></div>";
        $("#char-des-1").append(str);

        $("#set-character").click(function(){
            var dialog = generate.set_dialog(this);
            str = "<input type='text' value='killua' id='char-name' class='text-input' />";
            str += "<p><input type='button' value='Set Char' class='button set-info yes' id='yes' />";
            str += "<input type='button' value='Cancel' class='button set-info no' id='no' /></p>";
            dialog.append(str);
            dialog.slideDown("200");

            $(".set-info").click(function(){
                generate.dialog_toggle(this,$(this).val());
            })
        });

        $("#set-room").click(function(){
            var dialog = generate.set_dialog(this);
            str = "<input type='text' value='Greed Jealous Hate' id='room-name' class='text-input' />";
            str += "<p><input type='button' value='Set Room' class='button set-info yes' id='yes' />";
            str += "<input type='button' value='Cancel' class='button set-info no' id='no' /></p>";
            dialog.append(str);
            dialog.slideDown("200");

            $(".set-info").click(function(){
                generate.dialog_toggle(this,$(this).val());
            });
        }); 
    }
    ,battlefield : function(){
        $("#a-game").empty();
        str = "<div id='room-name-title' class='block-title'></div>";
        str += "<div id='enemy'><div id='enemy-upper-layer'></div><div id='enemy-lower-layer'></div></div>";
        str += "<div id='bf-console'><div id='bf-console-upper-layer'></div><div id='bf-console-lower-layer'></div></div>";
        str += "<div id='me'></div>";
        $("#a-game").append(str);
        str = "<div id='enemy-info-left'></div><div id='enemy-info-right'></div>";
        $("#enemy-upper-layer").append(str);
        str = "<div id='action-avatar'></div><div id='action-bar'></div>";
        $("#enemy-lower-layer").append(str);
        str = "<div id='me-info-left'></div>";
        $("#bf-console-lower-layer").append(str);
        str = "<div id='ready-to-fight' class='button'>Ready</div>";
        $("#me-info-left").append(str);

        $("#me").ready(function(){
            $("#me").css("display","none");
        });

        $("#ready-to-fight").click(function(){
            room.start();
        });
    }
    ,set_dialog : function(obj){
        var obj = $(obj);
        $(".dialog").slideUp("200").remove();
        $("#islando").append("<div class='dialog'></div>");
        var dialog = $(".dialog");
        var pos = obj.offset();
        var top = pos.top + 65;
        var left = pos.left;
        dialog.css("top",top).css("left",left);
        return $(".dialog");
    }
    ,dialog_toggle : function(obj,val){
        var id = $(obj).attr("id");
        if(id === "yes"){
            if(val === "Set Char"){
                char.name($("#char-name").val());
            }else if(val === "Set Room"){
                room.set($("#room-name").val());
            }
        }else if(id === "no"){
            this.cancel_dialog();
        }
    }
    ,cancel_dialog : function(){
        var dialog = $(".dialog");
        var v = dialog.html();
        if(v){
            dialog.slideUp("200",function(){
                $(this).remove();        
            });
        }
    }
    ,welcome : function(){
        new _Effect_Print_Text_("This is a Game produced by ilaempire members. Welcome to our world [Greed Island]. Enjoy urselves and have fun!",$("#welcome-title"));
    }
}




