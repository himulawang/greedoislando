//Bar
(function(w){
w._Model_Bar_ = Class.extend({
    init : function(){
        this.container = $("<div></div>").css({"margin-left" : "auto", "margin-right" : "auto", width : "550px", "margin-top" : "200px"});
        return this;
    }
    ,appendTo : function(el){
        $(el).append(this.container);
        return this;
    }
});
})(window);
