var Init = Class.extend({
    init : function() {
        var _this = this;
        $(document).ready(function(){
            _this.initCursor();
            //ila: MapEditorTrigger is a Constant. use MAP_EDITOR_TRIGGER and move this to main.js
            // and Tigger is T(r)igger
            if(MapEditorTigger){
                //_this.initMapEditor();
            }
            _this.disableContextMenu();
            _this.bindArrowKey();
            _this.bindMouseOverGrid();
            _this.bindMouseClick();
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
        //alert(GI.char.player.x +"|"+ GI.char.player.y);
        //fw.setStart(GI.char.player.x,GI.char.player.y);
        $('#grid')[0].onmouseup = function(e) {
            var xPX = e.layerX;
            var yPX = e.layerY;
            console.log(e);
            var InstanceCoordinate = new Coordinate();
            var x = InstanceCoordinate.transferScreenToLogicX(xPX, yPX);
            var y = InstanceCoordinate.transferScreenToLogicY(xPX, yPX);
            //fw.setEnd(x,y);
            if (e.which === 1) {
                console.log(e);
                //fw.getWay();
                //_this.char.player.move(e);

                // ila begin here
                var InstanceFindWay = new FindWay;
                InstanceFindWay.setStart(_this.char.player.x, _this.char.player.y);
                InstanceFindWay.setEnd(x, y);
                alert(console.log(InstanceFindWay.getWay()));
                // ila end here
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
    ,initMapEditor : function(){
        //this.editor = new MapEditor(GI_MAP_WIDTH, GI_MAP_HEIGHT, GI_GRID_QUANTITY);
        //this.editor.getCanvas($('#MapEditor')[0]);
        //this.editor.draw();
    }
    /* Create Character */
    ,createChar : function() {
        this.char = {};
        this.char.player = new Character('char', GI_PLAYER);
    }
});
