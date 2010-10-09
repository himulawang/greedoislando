function generate_login_interface(){
    $("#islando").append("<div id='welcome-title'></div><div id='login'><div id='username'><p>USERNAME: </p><input type='text' id='username' class='text_input' value='' /></div><div id='username'><p>PASSWORD: </p><input type='password' id='password' class='text_input' value='' /></div><div id='login_func_button'><input type='button' value='LOGIN' class='button index_login'/><input type='button' value='CANCEL' class='button index_login' onclick='active(\"welcome-title\");'/></div></div>");
}

var msg = "This is a Game produced by ilaempire members. Welcome to our world [Greed Island]. Enjoy urselves and have fun!";

function text_generate_obo(msg,id){
    var printed_text_length = $("#" + id).html().length;
    if(printed_text_length >= msg.length){
        window.clearInterval(s);
        return;
    }

    char = msg.charAt(printed_text_length);
    text_generate(char,id);
}

function active(id){
    var s = setInterval("text_generate_obo(msg,'"+id+"')",10);
}

function text_generate(char,id){
    $("#" + id).append(char);
}



