var Init = Class.extend({
    init : function() {
        var _this = this;
        $(document).ready(function(){
            _this.initMap();
            _this.initCursor();
            _this.disableContextMenu();
            _this.bindArrowKey();
            _this.bindMouseOverGrid();
            _this.bindMouseClick();
            _this.createGon();
        });
    }
    /* Event Listener */
    ,disableContextMenu : function() {
        document.oncontextmenu = function(e) {
            return false;
        }
    }
    ,bindArrowKey : function() {
        var _this = this;
        document.onkeyup = function(e) {
            if (e.which === 38) { //UP
                _this.cursor.moveUp();
            }else if (e.which === 40) { //Down
                _this.cursor.moveDown();
            }else if (e.which === 37) { //Left
                _this.cursor.moveLeft();
            }else if (e.which === 39) { //Right
                _this.cursor.moveRight();
            }
            _this.cursor.put();
            $('#output').html("LogicX:" + _this.cursor.x + " LogicY:" + _this.cursor.y);
            return false;
        };
    }
    ,bindMouseOverGrid : function() {
        var _this = this;
        $("#grid")[0].onmousemove = function(e) {
            _this.cursor.move(e);
            $('#mouseevent').html("ScreenX:" + e.layerX + " ScreenY:" + e.layerY);
            $('#output').html("LogicX:" + _this.cursor.x + " LogicY:" + _this.cursor.y);
            return false;
        };
    }
    ,bindMouseClick : function() {
        var _this = this;
        $('#grid')[0].onmouseup = function(e) {
            if (e.which === 1) {
            console.log(e);
                _this.char.gon.move(e);
            }
            return false;
        }
    }
    /* Draw Basic Element */
    ,initMap : function() {
        this.map = new Map(GI_MAP_WIDTH, GI_MAP_HEIGHT, GI_GRID_QUANTITY);
        this.map.getCanvas($('#grid')[0]);
        this.map.draw();
    }
    ,initCursor : function() {
        this.cursor = new Cursor(GI_MAP_WIDTH, GI_MAP_HEIGHT, GI_GRID_QUANTITY);
        this.cursor.getCanvas($('#cursor')[0]);
        this.cursor.draw();
        this.cursor.startBreath();
    }
    /* Create Character */
    ,createGon : function() {
        this.char = {};
        this.char.gon = new Character('char', 'gon');
    }
});

var GI_MAP_WIDTH = 1248;
var GI_MAP_HEIGHT = 672;
var GI_GRID_QUANTITY = 16;
var GI = new Init;
