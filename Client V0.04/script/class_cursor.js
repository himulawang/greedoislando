var Cursor = Coordinate.extend({
    init : function() {
        this._super();

        this.x = 0;
        this.y = 0;
        this.alpha = .5;
    }
    ,getCanvas : function(el) {
        this.el = el;
        el.width = this.TILEWIDTH;
        el.height = this.TILEHEIGHT;
        this.context = el.getContext('2d');
    }
    ,draw : function() { // Draw Cursor Side
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
    }
    ,breath : function() {
        if (this.alpha <= .2) {
            this.alpha = .8;
        } else {
            this.alpha -= .1;
        }
    }
    ,startBreath : function() {
        var _this = this;
        setInterval(function(){
            _this.breath();
            _this.draw();
        }, 100);
    }
    ,move : function(e) {
        var xPX = e.layerX;
        var yPX = e.layerY;
        var x = this.transferScreenToLogicX(xPX, yPX);
        var y = this.transferScreenToLogicY(xPX, yPX);

        if (this.checkMoveOut(x, y)) {
            this.x = x;
            this.y = y;
            this.put();
        }
    }
    ,showWay : function(index) {
        var tmp = index.split(",");
        this.x = tmp[0];
        this.y = tmp[1];
        this.put();
    }
});
