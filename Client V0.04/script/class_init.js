var Init = Class.extend({
    init : function() {
        var _this = this;
        this.lag = null;
        this.target = null;
        this.otherChar = {};
        this.initMaterial();
        this.initCursor();
        //this.initShowWay();
        this.initMap();
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
            } else if (e.which >= 49 && e.which <= 53) {
                var obj = {
                    type : "castSkill"
                    ,target : GI.target
                    ,skillID: 10000
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
            //Old Pattern , no longer use , Delete for efficiency
            //var startPoint = _this.map.getCoordinateIndex(_this.char.player.x, _this.char.player.y);            
            //var obj = { type : 'moveCharacter', startPoint : startPoint, endPoint : endPoint };
            var obj = { type : 'moveCharacter', endPoint : endPoint };
            //move
            if (e.which === 3) {
                //verify click grid is movePossible
                var index = _this.map.getCoordinateIndex(x, y);
                //console.log(_this.map.verifyMovePossible(index));
                if(!_this.map.verifyClickMovePossible(index)) return;
                //_this.char.player.charMove(startPoint,endPoint);
                wsocket.sendMessage(obj);
            }
            return false;
        }
    }
    /* Draw Basic Element */
    ,initMaterial : function() {
        this.material = new Material;
    }
    ,initMap : function(data) {
        this.map = new Map;
        this.map.getCanvas($('#grid')[0]);
        this.map.getData();
        this.map.draw();
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
    /* Create Character */
    ,createChar : function(data) {
        this.char = {};
        for (var x in data) {
            this.char.player = eval('new '+ data[x].name);
            this.char.player.cID = data[x].cID;
            this.char.player.setSelf();
            this.char.player.make(data[x]);
        }
    }
    ,createOtherChar : function(data){
        var cID;
        for (var x in data) {
            var cID = data[x].cID;
            if (this.otherChar[cID]) continue;
            this.otherChar[cID] = eval('new ' + data[x].name);
            this.otherChar[cID].make(data[x]);
        }
    }
});

