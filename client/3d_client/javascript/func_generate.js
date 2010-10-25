$(function(){
    connect();
    generate_login_interface();
});

var _GI_username;

var generate_login_interface = function(){
    var str;
    str = "<div id='welcome-title'></div>";
    str += "<div id='login-div'><div><p>USERNAME: </p><input type='text' id='username' class='text-input' value='' /></div>";
    str += "<div><p>PASSWORD: </p><input type='password' id='password' class='text-input' value='' /></div>";
    str += "<div id='login-func-button'><input type='button' value='LOGIN' class='button index-login' id='login'/><input type='button' value='WELCOME' class='button index-login' onclick='slide_show();'/></div></div>";
    $("#a-game").append(str);

    $("#login").bind('click',function(){

	    if(!$("#username").val()){
	        return;
	    }

	    _GI_username_input = $("#username").val();
        if(_GI_username_input != getCookie("_GI_username")){
            setCookie("_GI_username",_GI_username_input,"1");
            _GI_username = _GI_username_input;
        }
        
        if(ws.readyState == 1){
            $("#a-game").fadeOut("200",function(){
                generate_setup_interface();
            }).delay(20).fadeIn("200");
        }
    });

    var cookieset = checkCookie("_GI_username");
    if(cookieset){
       	_GI_username = getCookie("_GI_username");
       	$("#username").val(_GI_username);
        $("#login").trigger('click');
    }
}

var generate_setup_interface = function(){
    set_character(_GI_username);
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
        var _this = set_dialog($(this));
        str = "<input type='text' value='killua' id='char-name' class='text-input' />";
        str += "<p><input type='button' value='Set Char' class='button set-info yes' id='yes' />";
        str += "<input type='button' value='Cancel' class='button set-info no' id='no' /></p>";
        _this.append(str);
        _this.slideDown("200");

        $(".set-info").click(function(){
            dialog_toggle($(this),$(this).val());
        });
    });

    $("#set-room").click(function(){
        var _this = set_dialog($(this));
        str = "<input type='text' value='Greed Jealous Hate' id='room-name' class='text-input' />";
        str += "<p><input type='button' value='Set Room' class='button set-info yes' id='yes' />";
        str += "<input type='button' value='Cancel' class='button set-info no' id='no' /></p>";
        _this.append(str);
        _this.slideDown("200");

        $(".set-info").click(function(){
            dialog_toggle($(this),$(this).val());
        });
    }); 
}

var generate_battle_field = function(){
    $("#a-game").empty();
    str = "<div id='room-name-title' class='block-title'></div>";
    str += "<div id='enemy'><div id='enemy-upper-layer'></div><div id='enemy-lower-layer'></div></div>";
    str += "<div id='bf-console'><div id='bf-console-upper-layer'></div><div id='bf-console-lower-layer'></div></div>";
    str += "<div id='me'></div>";
    $("#a-game").append(str);
    str = "<div id='enemy-action-bar'></div><div id='me-action-bar'></div>";
    $("#enemy-lower-layer").append(str);
    var cardo0 = new _Cardo_My_(0).appendTo($("#me"));
    var cardo1 = new _Cardo_My_(1).appendTo($("#me"));
    var cardo2 = new _Cardo_My_(2).appendTo($("#me"));
    var cardo3 = new _Cardo_My_(3).appendTo($("#me"));
    var cardo4 = new _Cardo_My_(4).appendTo($("#me"));
    var cardo5 = new _Cardo_My_(5).appendTo($("#me"));
}
