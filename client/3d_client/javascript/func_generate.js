$(function(){
    generate_login_interface();
});

var _GI_username;

var generate_login_interface = function(){
    $("#islando").append("<div id='welcome-title'></div><div id='login-div'><div><p>USERNAME: </p><input type='text' id='username' class='text-input' value='' /></div><div><p>PASSWORD: </p><input type='password' id='password' class='text-input' value='' /></div><div id='login-func-button'><input type='button' value='LOGIN' class='button index-login' id='login'/><input type='button' value='WELCOME' class='button index-login' onclick='slide_show();'/></div></div>");
    
    var cookieset = checkCookie("_GI_username");
    if(cookieset){
       	_GI_username = getCookie("_GI_username");
       	$("#username").val(_GI_username);
    }

    $("#login").click(function(){
	if(!$("#username").val()){
	    return;
	}
	

	_GI_username_input = $("#username").val();
        if(_GI_username_input != getCookie("_GI_username")){
            setCookie("_GI_username",_GI_username_input,"1");
        }

	$("#islando").empty();
	$("#islando").append("<div id='user-list-info' class='list-info'></div>");
	$("#islando").append("<div id='bf-list-info' class='list-info'></div>");
	$("#islando").append("<div id='bf-info' class='list-info'></div>");
	$("#user-list-info").append("<div id='avatar'></div>");
	$("#avatar").append("<img src='../images/images.jpg' class='avatar-1' />");
	
    });

}

var s = [];

function slide_show(){
    var a;
    a = new text_generate.obo("This is a Game produced by ilaempire members. Welcome to our world [Greed Island]. Enjoy urselves and have fun!","welcome-title");
}

var text_generate = {
    obo : function(msg,id){
        //Variable
        var _this = this;
        this.msg = msg;
        this.el = $("#" + id);
        this.idx;
        _this.el.empty();
        _this.idx = s.push( setInterval(function(){ _this.obo(); },10) );

        this.obo = function(){
            var len = _this.el.html().length;
            if(len >= msg.length){
                window.clearInterval(s[_this.idx - 1]);
                return;
            }

            char = msg.charAt(len);
            _this.el.append(char);
        }
    }
}



