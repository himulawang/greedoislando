var Init = Class.extend({
    init : function() {
        var _this = this;
        this.lag = null;
        this.target = null;
        this.otherChar = {};
        this.initInput();
        this.initMaterial();
        this.initCursor();
        this.disableContextMenu();
        this.bindArrowKey();
        this.bindMouseOverGrid();
        this.bindMouseClick();
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
            } else if (e.which === 40) { //Down
                _this.cursor.moveDown();
            } else if (e.which === 37) { //Left
                _this.cursor.moveLeft();
            } else if (e.which === 39) { //Right
                _this.cursor.moveRight();
            } else if (e.which === 49) {
                var obj = {
                    type : "castSkill"
                    ,target : GI.targetCID
                    ,skillID: 10000 // right punch
                }
                wsocket.sendMessage(obj);
            } else if (e.which === 50) {
                var obj = {
                    type : "castSkill"
                    ,target : GI.targetCID
                    ,skillID: 10001 // stone
                }
                wsocket.sendMessage(obj);
            } else if (e.which === 51) {
                var obj = {
                    type : "castSkill"
                    ,target : GI.targetCID
                    ,skillID: 10002 // scissors
                }
                wsocket.sendMessage(obj);
            } else if (e.which === 52) {
                var obj = {
                    type : "castSkill"
                    ,target : GI.targetCID
                    ,skillID: 10003 // fabric
                }
                wsocket.sendMessage(obj);
            }
            _this.cursor.put();
            $('#output').html("LogicX:" + _this.cursor.x + " LogicY:" + _this.cursor.y);
            return true;
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
            if (!_this.map.checkMoveOut(x, y)) return;
            var endPoint = _this.map.getCoordinateIndex(x, y);
            var obj = { type : 'moveCharacter', endPoint : endPoint };
            //move
            if (e.which === 3) {
                var index = _this.map.getCoordinateIndex(x, y);
                if(!_this.map.verifyClickMovePossible(index)) return;
                wsocket.sendMessage(obj);
            }
            return false;
        }
    }
    ,initInput : function() {
        this.input = new Input;
    }
    /* Draw Basic Element */
    ,initMaterial : function() {
        this.material = new Material;
    }
    ,initMap : function() {
        this.map = new Map;
        this.map.getCanvas($('#grid')[0]);
        this.map.getData();
        this.map.draw();
        this.map.initObstacle();
    }
    ,initCursor : function() {
        this.cursor = new Cursor;
        this.cursor.getCanvas($('#cursor')[0]);
        this.cursor.draw();
        this.cursor.startBreath();
    }
    ,initShowWay : function() {
        this.showWayCursor = new Cursor;
        this.showWayCursor.getCanvas($('#show-way-cursor')[0]);
        this.showWayCursor.draw();
        this.showWayCursor.startBreath();
    }
    ,isSelf : function(cID) {
        if (cID === this.cID) return true;
        return false;
    }
});

