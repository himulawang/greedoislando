var Init = Class.extend({
    init : function() {
        this.initCursor();
        //this.disableContextMenu();
        this.bindArrowKey();
        this.bindMouseOverGrid();
        this.bindMouseClick();
        this.initMap();
        this.initMapEditor();
    }
    /* Event Listener */
    ,disableContextMenu : function() {
        document.oncontextmenu = function(e) {
            return false;
        }
    }
    ,bindArrowKey : function() {
        var _this = this;
        document.onkeydown = function(e) {
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
            var xPX = e.layerX;
            var yPX = e.layerY;
            var x = _this.map.transferScreenToLogicX(xPX, yPX);
            var y = _this.map.transferScreenToLogicY(xPX, yPX);
            if (e.which === 1) {
                if (x >= 96 || y >= 96 || x < 0 || y < 0) return false;
                _this.editor.click(x, y);
            }
            return false;
        }
    }
    /* Draw Basic Element */
    ,initMap : function(data) {
        this.map = new Map();
        this.map.getCanvas($('#grid')[0]);
        this.map.getData();
        this.map.draw();
    }
    ,initCursor : function() {
        this.cursor = new Cursor();
        this.cursor.getCanvas($('#cursor')[0]);
        this.cursor.draw();
        this.cursor.startBreath();
    }
    ,initShowWay : function() {
        this.showWayCursor = new Cursor();
        this.showWayCursor.getCanvas($('#show-way-cursor')[0]);
        this.showWayCursor.draw();
        this.showWayCursor.startBreath();
    }
    ,initMapEditor : function(){
        this.editor = new MapEditor;
    }
});

