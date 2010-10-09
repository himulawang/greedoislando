var ws;

function connect(){
	if(ws){
		if(ws.readyState == 1){return;}
	}
	write_log("Connecting");
	ws = $.websocket("ws://localhost:12345/",{
		open: function(){},
		close: function(){},
		events: {}		
	});
	ws.onopen = function(){
		write_log("Connected");
		setInterval(
			function(){
				if(ws.bufferedAmount == 0){
					ws._send(1);
				}
			},
		100);
	}
	ws.onclose = function(){ write_log("Disconnected"); }
	ws.onmessage = function(msg){
		_GI_.core.globalProcess(msg);
	}
}

function disconnect(){
	ws.close();
}

function write_log(info){
	$("#console").append("<p>" + info + "</p>");
}
