var Cursor = function() {
    this.constructor.super_.apply(this, arguments);
    this.x = 0;
    this.y = 0;
    this.alpha = .5;

    this.preCastSkill = false;
    this.el = $('#cursor');
    this.canvas = this.el.getContext('2d');

    this.el.width = global.GI_CURSOR_WIDTH;
    this.el.height = global.GI_CURSOR_HEIGHT;

    this.draw();
    this.startBreath();
};

util.inherits(Cursor, Map);

Cursor.prototype.draw = function() { // Draw Cursor Side
    this.canvas.clearRect(0, 0, this.TILEWIDTH, this.TILEHEIGHT);
    this.canvas.globalAlpha = this.alpha;
    this.canvas.fillStyle = "orange";
    this.canvas.beginPath();
    this.canvas.moveTo(this.TILEWIDTH / 2, 0);
    this.canvas.lineTo(0, this.TILEHEIGHT / 2);
    this.canvas.lineTo(this.TILEWIDTH / 2, this.TILEHEIGHT);
    this.canvas.lineTo(this.TILEWIDTH, this.TILEHEIGHT / 2);
    this.canvas.closePath();
    this.canvas.fill();
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
