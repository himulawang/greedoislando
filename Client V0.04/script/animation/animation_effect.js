var Animation_Effect = function() {
    this.constructor.super_.apply(this, arguments);
    this.owner = owner;
    this.defaultAction = 'move';
    this.action = this.defaultAction;

    this.animateList = ANIMATION_MATERIAL.effect[this.owner.name];

    this.initImages();
    this.initCanvas();
    this.runCanvas();
};

util.inherits(Animation_Effect, Animation);

Animation_Effect.prototype.initImages : function(){
    this.images = GI.material.images[this.owner.name];
};
Animation_Effect.prototype.initCanvas : function() {
    var canvas = $("<canvas id='" + this.owner.cID +"' style='position: absolute;'></canvas>");
    $('body').append(canvas);
    this.el = $("#" + this.owner.cID);
    this.canvas = this.el.getContext('2d');
};
Animation_Effect.prototype.getRunImages : function() {
    this.nowImages = this.images[this.action];
    if (!this.actionSwitched) return;
    this.animateWidth = this.nowImages[0].width;
    this.animateHeight = this.nowImages[0].height;
    this.el[0].width = this.animateWidth;
    this.el[0].height = this.animateHeight;

    this.nowImagesIndex = -1;
    
    this.actionSwitched = false;
};
Animation_Effect.prototype.stopMove : function() {
    this.moveStartStamp = 0;
    this.moving = false;
    this.owner.destroy();
};
