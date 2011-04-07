var MapEditorTigger = 1;

var MapEditor = Coordinate.extend({
    init : function() {
        this._super();
    }
    ,getCanvas : function(el){
        this.el = el;
        el.width = this.TILEWIDTH;
        el.height = this.TILEHEIGHT;
        this.context = el.getContext('2d');
    }
    ,draw : function(){
        this.context.fillStyle    = '#00f';
        this.context.font         = 'italic 30px sans-serif';
        this.context.textBaseline = 'top';
        this.context.fillText  ('Rock', this.TILEWIDTH / 2, this.TILEHEIGHT / 2);
    }
});
