var Cursor = function() {
    this.x = 0;
    this.y = 0;
    this.alpha = .5;

    this.preCastSkill = false;
};

Cursor.prototype.getCanvas = function(el) {
    this.el = el;
    el.width = GI_CURSOR_WIDTH;
    el.height = GI_CURSOR_HEIGHT;
    this.context = el.getContext('2d');
};
Cursor.prototype.draw = function() { // Draw Cursor Side
    //var x, y;

    this.context.clearRect(0, 0, this.TILEWIDTH, this.TILEHEIGHT);
    this.context.globalAlpha = this.alpha;
    this.context.fillStyle = "orange";
    this.context.beginPath();
    this.context.moveTo(this.TILEWIDTH / 2, 0);
    this.context.lineTo(0, this.TILEHEIGHT / 2);
    this.context.lineTo(this.TILEWIDTH / 2, this.TILEHEIGHT);
    this.context.lineTo(this.TILEWIDTH, this.TILEHEIGHT / 2);
    this.context.closePath();
    this.context.fill();
};
Cursor.prototype.breath = function() {
    if (this.alpha <= .2) {
        this.alpha = .8;
    } else {
        this.alpha -= .1;
    }
};
Cursor.prototype.startBreath = function() {
    var _this = this;
    setInterval(function(){
        _this.breath();
        _this.draw();
    }, 100);
};
Cursor.prototype.move = function(e) {
    this.put(e.clientX, e.clientY);
};
Cursor.prototype.setPreCastSkill = function(skillID) {
    this.preCastSkill = skillID;
};
Cursor.prototype.clearPreCastSkill = function() {
    this.preCastSkill = false;
};
