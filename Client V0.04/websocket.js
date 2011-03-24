var ws;
var consoleDiv;
var WS_HOST = "ws://58.35.200.149:8080";

//Upper case variable name means Constant,like 'WS_HOST'
//Class name should begin as Upper case and then lower case like 'CharacterNPC'
//'WSCLASS' names 'Connect' should be better
var WSCLASS = Class.extend({
    init : function(){
        //these function name should be initConnect, initDisconnect, initSelectChar better, because it's just initial function but not execute them.
        this.connect();
        this.disconnect();
        this.selectChar();
    }
    ,connect : function(){
        ws = new WebSocket(WS_HOST);
        var _this = this;
        //Protype JS on Event (onclick,onmousemove) has a default callback value: event, I use e to present event. This value has many attributes about this behavior, like click which element, click on x and y, left click or right click ,etc.
        ws.onopen = function(e) {
            console.log(e);
            _this.writelog("connected");
        }
        ws.onclose = function(e) {
            _this.writelog("disconnect");
        }
        ws.onmessage = function(e) {
            console.log(e);
            _this.writelog(e.data);
            //Here should add main entrance in the future
        }
    }
    ,disconnect : function(){
        $('#console')[0].onclick = function(e) {
            ws.close();
        };
    }
    ,selectChar : function(){
        $('.pickchar').click(function(){
            //If you want to use GI_PLAYER as a global variable, better var this at the top of script.
            GI_PLAYER = $(this).html();
            var obj = {
                type : "selectCharacter"
                ,character : GI_PLAYER
            }
            ws.send(JSON.stringify(obj));
            //this place:
            /*
            if(!GI_PLAYER) return;
            $("#login").fadeOut(100,function(){
                $("#main").fadeIn(100,function(){
                    var GI = new Init;
                });
            });

            better? less one level of {}
             */
            if(GI_PLAYER){
                $("#login").fadeOut(100,function(){
                    $("#main").fadeIn(100,function(){
                        //if you want to use GI as a global variable, var this at the top of script
                        var GI = new Init;
                    });
                });
            }
        });
    }
    ,writelog : function(text){
        if(!consoleDiv){
            consoleDiv = document.getElementById('console');
        }
        consoleDiv.innerHTML = consoleDiv.innerHTML + "<div>" + text + "</div>";
    }
});
