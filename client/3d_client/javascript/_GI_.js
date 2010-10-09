var _GI_ = {
	core : {
		globalProcess : function(msg){
			var json = JSON.parse(msg.data);
			var string = msg.data;
			var func = ["_GI_", json.type , json.data.cmd].join(".") + "(" + string + ")";
			$.globalEval(func);		
		}
	},

	
}
