var Init = Class.extend({
    init : function() {
        var _this = this;
        $(document).ready(function(){
            _this.initCursor();
            _this.initShowWay();
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
        $('#grid')[0].onmouseup = function(e) {
            var xPX = e.layerX;
            var yPX = e.layerY;
            var x = _this.map.transferScreenToLogicX(xPX, yPX);
            var y = _this.map.transferScreenToLogicY(xPX, yPX);
            var startPoint = _this.map.getCoordinateIndex(_this.char.player.x, _this.char.player.y);
            var endPoint = _this.map.getCoordinateIndex(x, y);
            var obj = { type : 'moveCharacter', startPoint : startPoint, endPoint : endPoint };
            if (e.which === 1) {
                //verify click grid is movePossible
                var index = _this.map.getCoordinateIndex(x, y);
                if(!_this.map.verifyMovePossible(index)) return;
                _this.char.player.charMove(startPoint,endPoint);
                wsocket.sendMessage(obj);
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
    ,initFindWay : function() {
        this.findWay = new FindWay;
        //add obstacle to findway's obstacleList
        var xy, i, j;
        for (var index in this.map.grid) {
            if (this.map.verifyMovePossible(index)) continue;
            xy = this.map.getCoordinateXY(index);
            for (i = 0; i < 6; ++i) {
                for (j = 0; j < 6; ++j) {
                    this.findWay.setObstacle(xy.x + i, xy.y + j);
                }
            }
        }
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
        //this.editor = new MapEditor(GI_MAP_WIDTH, GI_MAP_HEIGHT, GI_GRID_QUANTITY);
        //this.editor.getCanvas($('#MapEditor')[0]);
        //this.editor.draw();
    }
    /* Create Character */
    ,createChar : function(data) {
        this.char = {};
        for(x in data){
            this.char.player = eval('new '+ data[x].name);
            this.char.player.cID = data[x].cID;
            this.char.player.make(data[x]);
        }
    }
    ,createOtherChar : function(data){
        this.otherChar = {};
        //this.cID = data.cID;
        //this.name = data.name;
        //this.otherChar[this.cID] = new Character('char',this.name , data);
        for(x in data){
            this.otherChar[data[x].cID] = eval('new ' + data[x].name);
            this.otherChar[data[x].cID].make(data[x]);
        }
    }
});

