var Map = Coordinate.extend({
    init : function() {
        this._super();
    }
    ,getCanvas : function(el) {
        el.width = this.MAPWIDTH;
        el.height = this.MAPHEIGHT;
        this.context = el.getContext('2d');
    }
    ,draw : function() { // Draw Map Side
        this.context.beginPath();
        this.context.moveTo(this.MAPWIDTH / 2, 0);
        this.context.lineTo(0, this.MAPHEIGHT / 2);
        this.context.lineTo(this.MAPWIDTH / 2, this.MAPHEIGHT);
        this.context.lineTo(this.MAPWIDTH, this.MAPHEIGHT / 2);
        this.context.closePath();
        this.context.stroke();

        /*
        for (var i = 1; i < this.GRIDQUANTITY; ++i) {
            // 0 , 1
            x = 0; y = i;
            this.context.beginPath();
            this.context.moveTo(this.transferLogicToScreenX(x, y), this.transferLogicToScreenY(x, y));
            // 16, 1
            x = this.GRIDQUANTITY; y = i;
            this.context.lineTo(this.transferLogicToScreenX(x, y), this.transferLogicToScreenY(x, y));
            this.context.closePath();
            this.context.stroke();
        }

        for (var i = 1; i < this.GRIDQUANTITY; ++i) {
            // 1 , 0
            x = i; y = 0;
            this.context.beginPath();
            this.context.moveTo(this.transferLogicToScreenX(x, y), this.transferLogicToScreenY(x, y));
            // 1, 16
            x = i; y = this.GRIDQUANTITY;
            this.context.lineTo(this.transferLogicToScreenX(x, y), this.transferLogicToScreenY(x, y));
            this.context.closePath();
            this.context.stroke();
        }
        */
    }
});
