var fc = {
    getNowTimestamp : function() {
        return Date.now();
    }
    ,fix : function(float) {
        return typeof(float) === 'number' ? parseInt(float.toFixed()) : float;
    }
}
