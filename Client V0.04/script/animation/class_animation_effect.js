var Animation_Effect = Animation.extend({
    init : function(owner){
    	this._super();
        this.owner = owner;
        this.defaultAction = 'move';
        this.action = this.defaultAction;

        this.animateList = ANIMATION_MATERIAL.effect[this.owner.name].animateList;

        this.initImages();
        this.initCanvas();
        this.runCanvas();
        this.put();
    }
    ,initImages : function(){
        this.images = GI.material.images[this.owner.name];
    }
    ,initCanvas : function() {
        var canvas = $("<canvas id='" + this.owner.cID +"' style='position: absolute;'></canvas>");
        $('body').append(canvas);
        this.el = $("#" + this.owner.cID);
        this.canvas = this.el[0].getContext('2d');
    }
});
