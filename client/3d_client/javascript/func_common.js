var setCookie = function(c_name,value,expiredays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

var getCookie = function(c_name){
    if (document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1){ 
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1){
                c_end=document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start,c_end));
        } 
    }
    return "";
}

var checkCookie = function(c_name){
    username=getCookie(c_name);
    var val;
    if (username!=null && username!=""){
        val = 1;
    }else{
        val = 0;
    }
    return val;
}


var s = [];

var slide_show = function(){
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

var set_dialog = function(obj){
    var v = $(".dialog").html();
    if(v != null){
        return;
    }else{
        var _this = obj;
        $("#islando").append("<div class='dialog'></div>");
        var dialog = $(".dialog");
        var pos = _this.offset();
        var top = pos.top + 70;
        var left = pos.left;
        dialog.css("top", top);
        dialog.css("left", left);
        return dialog;
    }    
}

var cancel_dialog = function(){
    var v = $(".dialog").html();
    if(v != null){
        $(".dialog").fadeOut("200",function(){
            $(this).remove();        
        });
        return;
    }
}

var set_character_name = function(){
    var c_name = $("#char-name").val();
    if(c_name){
        cancel_dialog();
        $("#avatar").empty();
        var str = "<img src='../images/" + c_name + ".jpg' class='avatar-1' />";
    	$("#avatar").append(str);
        var ch = new text_generate.obo("Hello, " + c_name + "! Welcome to the world of Greedo Island , u are now available to fight!","char-set-des");
    }else{
        alert("Plz Enter A Character Name");
        return;
    }
}

var set_room = function(){
    
}

var dialog_toggle = function(obj){
    var id = obj.attr("id");
    if(id == "yes"){
        set_character_name();
    }else if(id == "no"){
        cancel_dialog();
    }
}


