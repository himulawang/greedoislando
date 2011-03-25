var Character = Coordinate.extend({
    init : function(type, name) {
        this._super();
        this.type = type;
        this.name = name;
        this.initCanvas();
        this.initStand(2);
        this.setPosition(13, 13);
        this.put();
    }
    ,initCanvas : function() {
        this.el = $("<canvas id='" + this.name + "' style='position: absolute;'></canvas>");
        $('body').append(this.el);
        this.el = $("#" + this.name)[0];
    }
    ,initStand : function(frames) {
        this.standImages = [];
        for (var i = 0; i < frames; ++i) {
            this.standImages.push(new Image);
            this.standImages[i].src = 'images/Character/' + this.type + '_' + this.name + '_' + i + '_S.png';
            //this.standImages[i].src = 'xsl.jpg';
        }

        //Set Draw Frame Index
        this.standIndex = 0;
        var _this = this;
        this.standInterval = setInterval(function(){ _this.drawStand(); }, 250);
    }
    ,setPosition : function(x, y) {
        this.x = x;
        this.y = y;
    }
    ,drawStand : function() {
        var c = this.el.getContext('2d');
        this.standWidth = this.standImages[0].width;
        //this.standWidth = 76;
        this.standHeight = this.standImages[0].height;
        //this.standHeight = 48;
        //Set Stand Canvas Width And Height
        this.el.width = this.standWidth;
        this.el.height = this.standHeight;

        c.clearRect(0, 0, this.standWidth, this.standHeight);

        this.standIndex = (this.standIndex < this.standImages.length - 1) ? this.standIndex + 1 : 0;
        c.drawImage(this.standImages[this.standIndex], 0, 0);
    }
    ,put : function() {
        //var ScreenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH;
        //var ScreenY = this.transferLogicToScreenY(this.x, this.y);
        var ScreenX = this.transferLogicToScreenX(this.x, this.y) - this.HALFTILEWIDTH + (this.TILEWIDTH - this.standImages[0].width) / 2 + 5;
        var ScreenY = this.transferLogicToScreenY(this.x, this.y) - (this.standImages[0].height - this.HALFTILEHEIGHT) + 5;
        
        $(this.el).css({left : ScreenX + 'px', top : ScreenY + 'px'});
    }
});
