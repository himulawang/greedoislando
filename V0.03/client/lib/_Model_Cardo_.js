//Create a cardo, this class extends from _Model_Cube_
(function(w){
w._Model_Cardo_ = _Model_Cube_.extend({
    init : function(){
        this.selected = false;
        this.XXX = {
            0 : {
                xxx : "0"
                ,name : "off"
                ,description : "u can't see me"
            }
            ,51 : {
                xxx : "051"
                ,name : "hammer"
                ,description : "casue physical damage 1"
            }
            ,52 : {
                xxx : "052"
                ,name : "gun"
                ,description : "casue physical damage 3"
            }
            ,53 : {
                xxx : "053"
                ,name : "bomb"
                ,description : "casue physical damage 5"
            }
            ,61 : {
                xxx : "061"
                ,name : "fire"
                ,description : "casue magical damage 2"
            }
            ,62 : {
                xxx : "062"
                ,name : "thunder"
                ,description : "casue magical damage 6"
            }
            ,71 : {
                xxx : "071"
                ,name : "umbrella"
                ,description : "defend stone"
                ,fieldColor : "black"
            }
            ,72 : {
                xxx : "072"
                ,name : "lid"
                ,description : "defend all physical attack except bomb"
                ,fieldColor : "gray"
            }
            ,73 : {
                xxx : "073"
                ,name : "GFW"
                ,description : "defend all physical attack"
                ,fieldColor : "gold"
            }
            ,81 : {
                xxx : "081"
                ,name : "Kinetic energy distribution field"
                ,description : "defend 50% magical damage"
                ,fieldColor : "red"
            }
            ,82 : {
                xxx : "082"
                ,name : "St. Cross Shield"
                ,description : "reverse magic damage"
                ,fieldColor : "green"
            }
            ,91 : {
                xxx : "091"
                ,name : "stone"
                ,description : "half opponent's Action Point"
            }
            ,92 : {
                xxx : "092"
                ,name : "cock blood"
                ,description : "speed up 2 keep 3 rounds"
            }
            ,93 : {
                xxx : "093"
                ,name : "run away"
                ,description : "escape from battlefield"
            }
            ,94 : {
                xxx : "094"
                ,name : "exchange"
                ,description : "exchange one random opponent cardo with my selected cardo"
            }
            ,95 : {
                xxx : "095"
                ,name : "real exchange"
                ,description : "exchange one selected opponent cardo with my selected cardo"
            }
            ,96 : {
                xxx : "096"
                ,name : "Mr. Chen's Camera"
                ,description : "peep one random opponent's cardo, will be noticed by opponent"
            }
            ,97 : {
                xxx : "097"
                ,name : "Mr. Chen's Teachings"
                ,description : "peep 3 selected opponent's cardo, won't be noticed by opponent"
            }
        }
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
            this.cube.scale3d("1.0,1.0,1.0").render();
            this.selected = false;
        }else{
            this.cube.scale3d("1.1,1.1,1.1").render();
            this.selected = true;
        }
    }
    ,display : function(xxx){
        var frontside = "";
        frontside += "<div>XXX:"+xxx+"</div>";
        frontside += "<div>Name:"+this.XXX[xxx].name+"</div>";
        frontside += "<div>Description:"+this.XXX[xxx].description+"</div>";
        this.front.html(frontside);
    }
});
})(window);
