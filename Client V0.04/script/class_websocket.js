var ws;
var consoleDiv;
//var WS_HOST = "ws://192.168.0.130:8081";
//var WS_HOST = "ws://ginodedemo.duostack.net:9980";
var WS_HOST = "ws://192.168.0.130:8081";
//var WS_HOST = "ws://giworld.gicp.net:8081";
//var WS_HOST = "ws://gi.no.de:8080";

var WsConnect = Class.extend({
    init : function(){
        this.initConnect();
        this.initDisconnect();
        this.initSelectChar();
        var _this = this;
        this.keepSessionInterval = setInterval(function(){
            var obj = {
                type : "keepSession"
                ,timestamp : Date.now()
            }
            _this.sendMessage(obj);
        },5000);
    }
    ,initConnect : function(){
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
            var stream = JSON.parse(e.data);
            GI.input.execute(stream);
        }
    }
    ,initDisconnect : function(){
        $('#console')[0].onclick = function(e) {
            ws.close();
        };
    }
    ,initSelectChar : function(){
        var _this = this;
        $('.pickchar').click(function(){
            GI_PLAYER = $(this).html();
            var obj = {
                type : "selectCharacter"
                ,character : GI_PLAYER
            }
            _this.sendMessage(obj);
        });
    }
    ,writelog : function(text){
        if(!consoleDiv){
            consoleDiv = document.getElementById('console');
        }
        consoleDiv.innerHTML = consoleDiv.innerHTML + "<div>" + text + "</div>";
    }
    ,sendMessage : function(obj){
        ws.send(JSON.stringify(obj));
    }
});
