var World = function() {
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

    this.initConnection();
};

/* Event Listener */
World.prototype.disableContextMenu = function() {
    document.oncontextmenu = function(e) {
        return false;
    }
};
World.prototype.bindKey = function() {
    this.keyboard = new Keyboard();
    this.keyboard.make();
};
World.prototype.bindMouseOverGrid = function() {
    var _this = this;
    $("#ui").onmousemove = function(e) {
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
};
World.prototype.bindMouseClick = function() {
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
};
World.prototype.initInput = function() {
    this.input = new Input();
};
/* Draw Basic Element */
World.prototype.initMaterial = function() {
    this.material = new Material();
};
World.prototype.initLoginEvent = function() {
    var _this = this;
    $('.pickchar').click(function(){ //TODO
        GI_PLAYER = $(this).html();
        var obj = {
            type : "selectCharacter"
            ,character : GI_PLAYER
        }
        _this.sendMessage(obj);
    });
};
World.prototype.initMap = function() {
    this.mapList = new MapList();
    var xy = this.mapList.getPlayerAbsoluteXY();
    this.mapList.make(xy.x, xy.y);
}
World.prototype.initCursor = function() {
    this.cursor = new Cursor();
    this.cursor.getCanvas($('#cursor')[0]);
    this.cursor.draw();
    this.cursor.startBreath();
};
World.prototype.initCharacter = function() {
    this.character = {};
};
World.prototype.initLog = function() {
    this.log = new Log();
};
World.prototype.initTimer = function() {
    this.timer = new Timer();
};
World.prototype.isSelf = function(cID) {
    if (cID === this.cID) return true;
    return false;
};
World.prototype.initConnection = function() {
    ws = new Connect();
    ws.connect();
}
