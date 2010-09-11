var ws1;

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
        open: function(){
            output("Connected");
        },
        close: function(){
            output("Disconnected");
        },
        events: {
            talk: function(json){
                output(json.data.name + ": "+json.data.msg);
            },
            pre: function(json){
                output(JSON.stringify(json));
                myChar = new char(json.data);
            }
        }
    });
    
}

function sendhi(){
    ws1.send('hi');
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

function sys_list_char(){
    ws1.send("sys",{cmd:"listChar"});
}

function sys_list_socket(){
    ws1.send("sys",{cmd:"listSocket"});
}

function prepare(){
    var char = $("#char").val();
    ws1.send("pre",{cmd:"prepareChar",name:char});
}

function start(){
    var char = $("#char").val();
    ws1.send("pre",{cmd:"battleStart",name:char});
}

function output(info){
    $("#output").append("<div>" + info + "</div>");
}

