var core = {
    rand : function(low,high){ return low + Math.floor(Math.random() * (high - low)); } //[low,high)
    ,randColor : function(){
        var t,r,g,b;

        t = this.rand(0,256).toString(16);
        t = t.length === 1 ? "0" + t : t;
        r = t;

        t = this.rand(0,256).toString(16);
        t = t.length === 1 ? "0" + t : t;
        g = t;
        
        t = this.rand(0,256).toString(16);
        t = t.length === 1 ? "0" + t : t;
        b = t;
        return ("#"+r+g+b).toUpperCase();
    }
};

