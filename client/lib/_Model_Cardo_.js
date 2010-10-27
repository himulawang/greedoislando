//Create a cardo, this class extends from _Model_Cube_
(function(w){
w._Model_Cardo_ = _Model_Cube_.extend({
    init : function(){
        this.selected = false;
    }
    ,setDefaultPosition : function(idx){
        this.setIndex(idx);
        this.cube.translateX(this.defaultPosition[idx][0]);
        this.cube.translateY(this.defaultPosition[idx][1]);
        this.cube.rotateX(this.defaultPosition[idx][2]);
        this.cube.rotateY(this.defaultPosition[idx][3]);
        this.cube.rotateZ(this.defaultPosition[idx][4]);
        this.cube.translateZ(this.defaultPosition[idx][5]);
        this.cube.scale3d(this.defaultPosition[idx][6].join(","));
        this.cube.render();
        return this;
    }
    ,setIndex : function(idx){ this.idx = idx; return this; }
    ,select : function(){
        if(this.selected){
            this.cube.scale3d("1.0,1.0,1.0").css("opacity",".7").render();
            this.selected = false;
        }else{
            this.cube.scale3d("1.1,1.1,1.1").css("opacity","1.0").render();
            this.selected = true;
        }
        return true;
    }
});
})(window);
