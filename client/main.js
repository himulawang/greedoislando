var ws1;
/*
$(document).ready(function(){

ws1 = new WebSocket('ws://localhost:12345/');
ws1.onopen = function () {
    output("connected");
};


});
*/
    

//Class char
function char(data) {
    this.id = data.id;
    this.name = data.name;
    this.hp = data.hp;
    this.maxhp = data.maxhp;
    this.speed = data.speed;
    this.speedup = data.speedup;
    this.actionPoint = data.actionPoint;
    this.cardo = [];
}

var myChar;

function connect(){
    if(ws1){
        if(ws1.readyState == 1){return;}
    }
    output("Connecting");
    ws1 = $.websocket("ws://localhost:12345/",{
        open: function(){ },
        close: function(){ },
        events: {
            talk: function(json){
                output(json.data.name + ": "+json.data.msg);
            },
            pre: function(json){
                output(JSON.stringify(json));
                myChar = new char(json.data);
            },
            pre_new_bf: function(json){
                output(JSON.stringify(json));
            },
            con: function(json){
                output(JSON.stringify(json));
            }
        }
    });
    ws1.onopen = function(){ output("Connected"); }
    ws1.onclose = function(){ output("Disconnected"); }
}



function set_username(){
    var username = $("#username").val();
    ws1.send("con",{cmd:"set_username",username:username});
}

function create_battlefield(){
    var char = $("#char").val();
    ws1.send("pre_new_bf",{bf_name:"OurWar",name:char});
}

function talk(){
    var el = $("#input");
    var char = $("#char").val();
    var msg = el.val()
    var json = {name:char,msg:msg}
    ws1.send("talk",json);
    el.val("");
}

function disconnect(){
    ws1.close();
}


function test(){
    if(!("WebSocket" in window)){
        alert("Not Support WebSocket");
    }else{
        alert("Support");
    }
}

function sys_list_user(){
    ws1.send("sys",{cmd:"listUser"});
}

function sys_list_battlefield(){
    ws1.send("sys",{cmd:"listBattlefield"});
}

function sys_list_socket(){
    ws1.send("sys",{cmd:"listSocket"});
}

function prepare(){
    var char = $("#char").val();
    ws1.send("pre",{cmd:"prepareChar",name:char,no:0});
}

function start(){
    var char = $("#char").val();
    ws1.send("pre",{cmd:"battleStart",name:char});
}

function output(info){
    $("#chat_log").append("<div>" + info + "</div>");
}

function list_battlefield(){
    ws1.send("pre",{cmd:"get_bf_list"});
}

function list_user(){
    ws1.send("pre",{cmd:"get_user_list"});
}

