//Public cardo position
(function(w){
w._Cardo_Public_ = _Model_Cardo_.extend({
    init : function(idx){
        this.shape(120,194,8);
        this.defaultPosition = [
        //translateX translateY rotateX rotateY rotateZ translateZ scale3d
            [0,this.xyz["k"],0,0,0,this.xyz["z"]*0,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,this.xyz["z"]*1,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,this.xyz["z"]*2,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,this.xyz["z"]*3,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,this.xyz["z"]*4,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,this.xyz["z"]*5,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,this.xyz["z"]*6,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,this.xyz["z"]*7,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,this.xyz["z"]*8,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,this.xyz["z"]*9,[1,1,1]]
            ,[0,this.xyz["k"],0,0,0,this.xyz["z"]*10,[1,1,1]]
        ]
        this.front.css({
            "background-image" : "url('cardo1.png')"
            ,"background-size" : "100% 100%"
        });
        this.back.css("background-image","url('glass.gif')");
        this.setDefaultPosition(idx);
        return this;
    }
});
})(window);
