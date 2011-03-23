//Information Window
(function(w){
w._Model_Info_ = Class.extend({
    shape : function(x,y){ //x = width; y = height
        this.container = $("<div></div>");

        this.container.css({
            width : x + "px"
            ,height : y + "px"
        })

        return this;
    }
    ,appendTo : function(el){
        $(el).append(this.container);
        return this;
    }
});
})(window);
