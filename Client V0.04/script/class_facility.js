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
}
