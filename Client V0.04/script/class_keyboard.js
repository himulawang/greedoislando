var Keyboard = Class.extend({
    init : function() {
        this.key = {};
        this.list = {};
    }
    ,make : function() {
        var _this = this;
        document.onkeydown = function(e) {
            var keyCode = e.which;
            if (keyCode >= 49 && keyCode <=52) {
                _this.list[keyCode].keydown(_this, keyCode);
            }
        }
        document.onkeyup = function(e) {
            var duration = _this.delKeyPressDuration(e.which);
            var keyCode = e.which;
            if (keyCode >= 49 && keyCode <=52) {
                _this.list[keyCode].keyup(_this, keyCode);
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
        return duration;
    }
    ,delKeyPressDuration : function(keyCode) {
        delete this.key[keyCode];
    }
});
