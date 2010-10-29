$(function(){
    ws = new _GI_Connection_("ws://localhost:12345/");
    generate.login_interface();
    char = new _GI_Character_();
    room = new _GI_Room_();
    my_cardo_slot = [];
    enemy_cardo_slot = [];
});

var ws,char;

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

        this.onclose = function(){ write_log("Disconnected"); }
        this.onmessage = function(msg){
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
        this.ws.send("con",{cmd:"set_username",username:$.cookie("_GI_username")});
        return this;
    }
});

var _GI_Character_ = Class.extend({
    init : function(){
        this.name = null;
    }
    ,name : function(){
        if(arguments.length===0) return this.name;

        var charname = $("#char-name").val();
        if(charname===undefined){
            alert("Plz Enter A Character Name");
            return;
        }

        generate.cancel_dialog();
        this.name = charname;
        var str = "<img src='../images/" + charname + ".jpg' class='avatar-1' />";
        $("#avatar").empty().append(str);
        new text_generate.obo("Hello, " + charname + "! Welcome to the world of Greedo Island , u are now available to fight!","char-set-des");
    }
});
 var a = [];
 a[id] = new __

var _GI_Room_ = Class.extend({
    init : function(){
        this.name = null;
    }
    ,name : function(){
    }
    ,set : function(){
        if (char.name===null){
            alert("Plz Enter A Character Name");
            return;
        }

        var name = $("#room-name").val();
        generate.cancel_dialog();
        ws.send("pre",{cmd:"create_bf",bf_name:bf_name,char_name:mychar.charname});
    }
});


var generate = {
    login_interface : function(){
        var str;
        str = "<div id='welcome-title'></div>";
        str += "<div id='login-div'><div><p>USERNAME: </p><input type='text' id='username' class='text-input' value='' /></div>";
        str += "<div><p>PASSWORD: </p><input type='password' id='password' class='text-input' value='' /></div>";
        str += "<div id='login-func-button'><input type='button' value='LOGIN' class='button index-login' id='login'/><input type='button' value='WELCOME' class='button index-login' onclick='slide_show();'/></div></div>";
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
            });
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
        if(id == "yes"){
            if(val == "Set Char"){
                char.name();
            }else if(val == "Set Room"){
                set_room();
            }
        }else if(id == "no"){
            this.cancel_dialog();
        }
    }
    ,cancel_dialog : function(){
        var dialog = $(".dialog");
        var v = dialog.html();
        if(!v){
            dialog.slideUp("200",function(){
                $(this).remove();        
            });
        }
    }
}


