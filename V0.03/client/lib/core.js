//core store all common useful function
(function(w){
w.core = {
    rand : function(low,high){ return low + Math.floor(Math.random() * (high - low)); } //[low,high)
    ,randColor : function(){ //get rand color
        return "rgb(" + this.rand(0,256) + "," + this.rand(0,256) + "," + this.rand(0,256) + ")";
    }
    ,num : function(v){ //get number from format like 15% or 15px
        var reg = /^(\d+)(.+)$/.test(v);
        if(reg) return RegExp.$1;
        return NaN;
    }
};
})(window);
