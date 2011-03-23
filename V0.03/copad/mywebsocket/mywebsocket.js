var net = require('net'),
sys = require('sys'),
clients = {},
Server = net.createServer(function(stream){
	var state = {
		handshaked: false
	},
	requestHeaders = [
		/^GET (.*) HTTP\/1\.1$/,
		/^Upgrade: WebSocket$/,
		/^Connection: Upgrade$/,
		/^Host: (.*)$/,
		/^Origin: (.*)$/,
		/^Sec-WebSocket-Protocol: (.*)$/,
		/^Sec-WebSocket-Key1: (.*)$/,
		/^Sec-WebSocket-Key2: (.*)$/
	],
	responseHeaders = [
		'HTTP/1.1 101 WebSocket Protocol Handshake',
		'Upgrade: WebSocket',
		'Connection: Upgrade',
		'Sec-WebSocket-Origin: {ORIGIN}',
		'Sec-WebSocket-Location: {LOCATION}',
		'Sec-WebSocket-Protocol: {PROTOCOL}'
	];
	
	function _abort(){
		stream.end();
	}

	function pack(num) {
  	return new Buffer([
  	num >> 24 & 0xFF,
  	num >> 16 & 0xFF,
  	num >> 8 & 0xFF,
  	num &	0xFF
  	]);
	};

	function _getParams(_data, _requestHeaders){
		var _responseParam = {
			resource:null, 
			upgrade:null, 
			connection:null, 
			host:null, 
			port:null, 
			origin:null, 
			protocol:null, 
			chalenge:null, 
			key1:null, 
			key2:null, 
			key3:null, 
			location:null, 
			k1s:null, 
			k2s:null
		};
		
		var data1 = _data.toString('utf8',0,_data.length);
		var fields = data1.split('\r\n');
		fields.map(function(item){
			_requestHeaders.map(function(rule,j){
				var matches = [],t;
				matches = item.match(rule);
				if(matches && matches.length > 0){
					switch(j) {
						case 0:
							if(matches.length==2)
								_responseParam.resource = matches[1];
							break;
						case 1:
							if(matches.length==1)
								_responseParam.upgrade = matches[0];
							break;
						case 2:
							if(matches.length==1)
								_responseParam.connection = matches[0];
							break;
						case 3:
							if(matches.length==2)
								t = matches[1];
							if(t.indexOf(':') > -1) {
								t = t.split(':');
								_responseParam.host = t[0];
								_responseParam.port = t[1];
							} else {
								_responseParam.host = t;
							}
							break;
						case 4:
							if(matches.length==2)
								_responseParam.origin = matches[1];
							break;
						case 5:
							if(matches.length==2)
								_responseParam.protocol = matches[1];
							break;
						case 6:
							if(matches.length==2)
								t = parseInt(matches[1].replace(/[^\d]/g,''),10);
								_responseParam.k1s = matches[1].replace(/[^ ]/g,'').length;
								if(0 === (t%_responseParam.k1s) && _responseParam.k1s !== 0 && t < 4294967295) {
									_responseParam.key1 = t/_responseParam.k1s;
								}
							break;
						case 7:
							if(matches.length==2)
								t = parseInt(matches[1].replace(/[^\d]/g,''));
								_responseParam.k2s = matches[1].replace(/[^ ]/g,'').length;
								if(0 === (t%_responseParam.k2s) && _responseParam.k2s !== 0 && t < 4294967295) {
									_responseParam.key2 = t/_responseParam.k2s;
								}
							break;
					}
				}
			});
		});
		for(var m=0;m<_data.length;m++) {
			if(_data[m]==0x0D && _data[m+1]==0x0A && _data[m+2]==0x0D && _data[m+3]==0x0A) {
				_responseParam.key3 = _data.slice(m+4, m+12);
				break;
			}
		}
		return _responseParam;
	}

	function _checkRequestValid(_responseParam) {
		var required = [
			'resource',
			'upgrade',
			'connection',
			'host',
			'origin',
			'key1',
			'key2',
			'key3'
		];
		var flag = true;
		required.map(function(item){
			if(!_responseParam[item]) {
				sys.log('client handshake invalid: ' + item);
				flag = false;
			}
		});
		return flag;
	}

	function _handshake(data, requestHeaders){
		responseParam = _getParams(data, requestHeaders);
		if(!_checkRequestValid(responseParam)) {
			_abort();
		}
		sys.log('client handshake is valid.');
		responseParam.location = 'ws://' + responseParam.host + (responseParam.port? ':'+responseParam.port:'') + responseParam.resource;
		var responseHeader = responseHeaders.concat('','').join('\r\n');
		var md5 = require('crypto').createHash('md5');
		md5.update(pack(parseInt(responseParam.key1)).toString('binary'));
		md5.update(pack(parseInt(responseParam.key2)).toString('binary'));
		md5.update(responseParam.key3.toString('binary',0,responseParam.key3.length));
		responseHeader = responseHeader.replace(/\{ORIGIN\}/,responseParam.origin)
																	 .replace(/\{LOCATION\}/,responseParam.location)
																	 .replace(/\{PROTOCOL\}/,responseParam.protocol);
		stream.write(responseHeader+md5.digest('binary'),'binary');
		sys.log('server handshake sent ok.');
		state.handshaked = true;
		return;
	}

	function _receiveData(data) {
		if(data.length==2) {
			if(data[0] == 0xFF && data[1] == 0x00) {
				_abort();
				return;
			}
		}
		if(data[0] != 0x00) {
			return;
		}
		var content = data.toString('utf8', 1, data.length-1);
		sys.log('frame data: ' + content);
		setTimeout(function(){
			var i='';
			for(var i in clients) {
				clients[i].write(new Buffer([0]));
				clients[i].write(content,'utf8');
				clients[i].write(new Buffer([255]));
				sys.log('client: ['+i+'] writed.');
			}
		},50);
	}

	stream.on('connect', function(){
		sys.log('client connected.['+stream.remoteAddress+']');
		this.sid = this.remoteAddress + ((new Date().getTime()) + Math.random()*100);
		clients[this.sid] = this;
	});
	
	stream.on('data',function(data){
		if(!state.handshaked) {
			_handshake(data, requestHeaders);
		} else {
			_receiveData(data);
		}
	});
	stream.on('end',function(){
		stream.end();
		sys.log('client end');
	});
	stream.on('close',function(){
		stream.destroy();
		delete clients[this.sid];
		sys.log('client: ['+this.sid+'] closed');
	});
	Server.on('close',function(){
		sys.log('server closed');
	});
}),
Admin = net.createServer(function(stream){
	var cmd = '';
	stream.setEncoding('ascii');
	stream.on('data', function(data){
		cmd += data;
		if(cmd.indexOf('quit')>-1) {
			var i = null;
			for (i in clients) {
				clients[i].end();
				clients[i].destroy();
				delete clients[i];
			}
			sys.log('server stopping');
			stream.end();
			stream.destroy();
			Server.close();
			Admin.close();
		}
	});
});
Server.listen(8080, '0.0.0.0');
Admin.listen(8081, '127.0.0.1');
