var fc = {
    getNowTimestamp : function() {
        return Date.now();
    }
    ,getBuffTime : function(duration) {
        return this.fix(duration / 1000) + 'S';
    }
    ,fix : function(float) {
        return typeof(float) === 'number' ? parseInt(float.toFixed()) : float;
    }
    ,objectLength : function(object) {
        var c = 0;
        for (var i in object) {
            if (object.hasOwnProperty(i)) ++c;
        }
        return c;
    }
    ,guid : function() {
        var guid = ""; 
        for (var i = 1; i <= 32; i++){ 
            var n = Math.floor(Math.random() * 16.0).toString(16); 
            guid += n; 
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) 
                guid += "-"; 
        } 
        return guid; 
    }
    ,fill0 : function(length, origin) {
        var originLength = ('' + origin).length;
        var fillTime = length - originLength;
        var string = origin;
        for (var i = 0; i < fillTime; ++i) {
            string = '0' + string;
        }
        return string;
    }
    ,inObject : function(value, array) {
        for (var i in array) {
            if (array[i] === value) return i;
        }
        return undefined;
    }
}
