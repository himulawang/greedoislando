var ws;
var consoleDiv;
var WS_HOST = "ws://58.35.200.149:8080";

var WSCLASS = Class.extend({
    init : function(){
        this.connect();
        this.disconnect();
        this.selectChar();
    }
    ,connect : function(){
        ws = new WebSocket(WS_HOST);
        var _this = this;
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
        }
    }
    ,disconnect : function(){
        $('#console')[0].onclick = function(e) {
            ws.close();
        };
    }
    ,selectChar : function(){
        $('.pickchar').click(function(){
            GI_PLAYER = $(this).html();
            var obj = {
                type : "selectCharacter"
                ,character : GI_PLAYER
            }
            ws.send(JSON.stringify(obj));
            if(GI_PLAYER){
                $("#login").fadeOut(100,function(){
                    $("#main").fadeIn(100,function(){
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
