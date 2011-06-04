var Keyboard = Class.extend({
    init : function() {
        this.key = {};
    }
    ,make : function() {
        var _this = this;
        document.onkeydown = function(e) {
            if (e.which === 50) {
                if (!_this.setKeyDownStamp(e.which)) return true;
                var obj = {
                    type : "skillCharge"
                    ,target : GI.targetCID
                    ,skillID: 10001 // stone
                    ,status : 1
                }
                wsocket.sendMessage(obj);
            }
        }
        document.onkeyup = function(e) {
            var duration = _this.getKeyPressDuration(e.which);
            if (e.which === 50) {
                var obj = {
                    type : "skillCharge"
                    ,target : GI.targetCID
                    ,skillID: 10001 // stone
                    ,status : 0
                }
                wsocket.sendMessage(obj);
            } else {
                if (e.which === 38) { //UP
                } else if (e.which === 40) { //Down
                } else if (e.which === 37) { //Left
                } else if (e.which === 39) { //Right
                } else if (e.which === 49) {
                    var obj = {
                        type : "castSkill"
                        ,target : GI.targetCID
                        ,skillID: 10000 // right punch
                    }
                    wsocket.sendMessage(obj);
                } else if (e.which === 51) {
                    var obj = {
                        type : "castSkill"
                        ,target : GI.targetCID
                        ,skillID: 10002 // scissors
                    }
                    wsocket.sendMessage(obj);
                } else if (e.which === 52) {
                    var obj = {
                        type : "castSkill"
                        ,target : GI.targetCID
                        ,skillID: 10003 // fabric
                    }
                    wsocket.sendMessage(obj);
                }
            }
        }
    }
    ,setKeyDownStamp : function(keyCode) {
        if (this.key[keyCode]) return;
        this.key[keyCode] = fc.getNowTimestamp();
        return true;
    }
    ,getKeyPressDuration : function(keyCode) {
        if (!this.key[keyCode]) return 0;
        var duration = fc.getNowTimestamp() - this.key[keyCode];
        delete this.key[keyCode];
    }
});
