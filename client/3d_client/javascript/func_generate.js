$(function(){
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
        
        $("#a-game").fadeOut("slow",function(){
            generate_setup_interface();
        }).delay(20).fadeIn("slow");
	    
    });

    var cookieset = checkCookie("_GI_username");
    if(cookieset){
       	_GI_username = getCookie("_GI_username");
       	$("#username").val(_GI_username);
        $("#login").trigger('click');
    }

    
}

var generate_setup_interface = function(){
    $("#a-game").empty();
    str = "<div id='user-list-info' class='list-info'></div>";
    str += "<div id='bf-list-info' class='list-info'></div>";
    str += "<div id='bf-info' class='list-info'></div>";
    $("#a-game").append(str);
    str = "<div id='char-info'><div id='avatar'></div><div id='char-des-1'></div><div id='char-des-2'></div></div><div id='online-player-list'></div>";
	$("#user-list-info").append(str);
    str = "<img src='../images/images.jpg' class='avatar-1' />";
	$("#avatar").append(str);
    str = "<p>" + _GI_username + "</p>";
    str += "<input type='button' value='Set Character' id='set-character' class='button set-info' />";
    $("#char-des-1").append(str);

    $("#set-character").bind("click",function(){
        var _this = set_slide($(this));
        str = "<input type='text' value='' id='char-name' class='text-input' />";
        str += "<p><input type='button' value='Confirm' class='button set-info yes' id='yes'/>";
        str += "<input type='button' value='Cancel' class='button set-info no' /></p>";
        _this.append(str);
        _this.slideDown("slow");
    });
}


