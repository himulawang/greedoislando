//create a cardo
var _Model_Cardo_ = _Model_Cube_.extend({
    setDefaultPosition : function(idx){
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
});