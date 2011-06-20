//Create a background theme
(function(w){
w._Model_Background_ = Class.extend({
    shape : function(x,y,image,low,high){ //x = width; y = height; image = patch/name.png; low = first image idx; high = last image idx;
        var div = $("<div></div>");
        var img = $("<div></div>");

        var a = image.split(".");
        img.css({
            position : "absolute"
            ,width : x+"px"
            ,height : y+"px"
            ,"background-image" : "url(" + a[0] + core.rand(low,high + 1) + "." + a[1] + ")"
            ,"-webkit-background-size" : "50px 50px"
        });

        div.css({
            position : "absolute"
            ,width : x+"px"
            ,height : y+"px"
        });

        div.append(img);

        return div;
    }
});
})(window);
