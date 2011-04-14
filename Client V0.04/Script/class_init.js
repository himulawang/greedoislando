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
            if (e.which === 1) {
                //verify click grid is movePossible
                var index = _this.map.getCoordinateIndex(x, y);
                if(!_this.map.verifyMovePossible(index)) return;
                //check character is moving 
                if (_this.char.player.characterMoving) {
                    _this.char.player.setNewDestinationTigger = true;
                    _this.char.player.nextWayEndX = x;
                    _this.char.player.nextWayEndY = y;
                    return;
                }
                //start move
                _this.findWay.setStart(_this.char.player.x, _this.char.player.y);
                _this.findWay.setEnd(x, y);
                _this.findWay.reset();
                var way = _this.findWay.getWay();
                console.log(way);
                _this.char.player.setWay(way);
                _this.char.player.startWay();
            }
            return false;
        }
    }
    /* Draw Basic Element */
    ,initMap : function(data) {
        this.map = new Map();
        this.map.getCanvas($('#grid')[0]);
        this.map.getData(data);
        this.map.draw();
    }
    ,initFindWay : function() {
        this.findWay = new FindWay;
        //add obstacle to findway's obstacleList
        var xy;
        for (var index in this.map.grid) {
            if (this.map.verifyMovePossible(index)) continue;
            xy = this.map.getCoordinateXY(index);
            this.findWay.setObstacle(xy.x, xy.y);
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
        this.char.player = eval('new '+ data.name);
        this.char.player.cID = data.cID;
        this.char.player.make(data);
    }
    ,createOtherChar : function(data){
        this.otherChar = {};
        //this.cID = data.cID;
        //this.name = data.name;
        //this.otherChar[this.cID] = new Character('char',this.name , data);
        for(x in data){
            this.cID = data[x].cID;
            this.otherChar[this.cID] = eval('new ' + data[x].name);
            this.otherChar[this.cID].make(data[x]);
        }
    }
});

