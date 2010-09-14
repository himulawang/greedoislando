var ws1;
$(document).ready(function(){

connect();

});
    

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
    //status("Connecting...");
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
                //myChar = new char(json.data);
            },
            con: function(json){
                output(JSON.stringify(json));
                //setTimeout(status("Success!"),1000);
            },
            batt: function(json){
                output(JSON.stringify(json));
            },
        }
    });    
    ws1.onopen = function(){
        output("Connected"); 
        setInterval(
            function(){
                if(ws1.bufferedAmount == 0){
                    ws1._send(1);
                }
            }
        , 100);
    }


    
    ws1.onclose = function(){ output("Disconnected"); }
}



function set_username(){
    var username = $("#username").val();
    ws1.send("con",{cmd:"set_username",username:username});
}

function create_battlefield(){
    var char = $("#char").val();
    var bf_name = $("#bf").val();
    ws1.send("pre",{cmd:"create_bf",bf_name:bf_name,char_name:char});
}

function enter_battlefield(){
    var char = $("#char").val();
    var bf_no = $("#bf_no").val();
    ws1.send("pre",{cmd:"enter_bf",bf_no:bf_no,char_name:char});
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

function bf_start(){
    var char = $("#char").val();
    ws1.send("pre",{cmd:"bf_start"});
}

function output(info){
    $("#console").append("<div>" + info + "</div>");
}

function list_battlefield(){
    ws1.send("pre",{cmd:"get_bf_list"});
}

function list_user(){
    ws1.send("pre",{cmd:"get_user_list"});
}



