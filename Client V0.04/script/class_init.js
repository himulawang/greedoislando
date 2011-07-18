var Init = Class.extend({
    init : function() {
        var _this = this;
        this.lag = null;
        this.target = null;
        this.otherChar = {};
        this.initInput();
        this.initMaterial();
        this.initCursor();
        this.initCharacter();
        this.disableContextMenu();
        this.bindKey();
        this.bindMouseOverGrid();
        this.bindMouseClick();
    }
    /* Event Listener */
    ,disableContextMenu : function() {
        document.oncontextmenu = function(e) {
            return false;
        }
    }
    ,bindKey : function() {
        this.keyboard = new Keyboard;
        this.keyboard.make();
    }
    ,bindMouseOverGrid : function() {
        var _this = this;
        $("#ui")[0].onmousemove = function(e) {
            // pass mousemove event to grid layout
            var event = document.createEvent('MouseEvents');
            event.initMouseEvent("mousemove"
                ,false //canBubble
                ,true //cancelable
                ,window //view
                ,0 //detail mouse click count
                ,e.screenX //screenX
                ,e.screenY //screenY
                ,e.clientX //clientX
                ,e.clientY //clientY
                ,false //ctrl
                ,false //alt
                ,false //shift
                ,false //metaKey
                ,0 //button
                ,null
            );
            $("#grid")[0].dispatchEvent(event);
            return false;
        };
        $("#grid")[0].onmousemove = function(e) {
            _this.cursor.move(e);
            $('#mouseevent').html("ScreenX:" + e.screenX + " ScreenY:" + e.screenY);
            $('#output').html("LogicX:" + _this.cursor.x + " LogicY:" + _this.cursor.y);
        }
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
        this.mapList = new MapList;
        var xy = this.mapList.getPlayerAbsoluteXY();
        console.log(xy);
        var mapBlockList = this.mapList.getMapBlockIDsByAbsolutePosition(xy.x, xy.y);

        console.log(mapBlockList);
        var mapBlockXY, mapBlockID;
        for (var id in mapBlockList) {
            mapBlockXY = mapBlockList[id];
            mapBlockID = this.mapList.transferMapBlockXYToIndex(mapBlockXY.x, mapBlockXY.y);
            this.mapList.load(mapBlockID);
        }
    }
    ,initCursor : function() {
        this.cursor = new Cursor;
        this.cursor.getCanvas($('#cursor')[0]);
        this.cursor.draw();
        this.cursor.startBreath();
    }
    ,initCharacter : function() {
        this.character = {};
    }
    ,initLog : function() {
        log = new Log;
    }
    ,initTimer : function() {
        this.timer = new Timer;
    }
    ,isSelf : function(cID) {
        if (cID === this.cID) return true;
        return false;
    }
});

