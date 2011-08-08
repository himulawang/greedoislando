var Mouse = function() {
    Mouse.super_.apply(this, arguments);
    this.uiEl = $('#ui');
    this.gridEl = $('#grid');
    this.mapEl = $('#map');
    this.mouseEventEl = $('#mouseevent');
    this.outputEl = $('#output');
    this.initLogin();
    this.initMouseOverGrid();
    this.initMouseClick();
};

util.inherits(Mouse, Map);

Mouse.prototype.initLogin = function() {
    var el = $('.choose-character');
    for (var i in el) {
        el[i].onmouseup = function() { ws.send({ type : "selectCharacter", character : this.id }); };
    }
};
Mouse.prototype.initMouseOverGrid = function() {
    var _this = this;
    this.uiEl.onmousemove = function(e) {
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
        _this.gridEl.dispatchEvent(event);
        _this.mapEl.dispatchEvent(event);
        return false;
    };
    this.gridEl.onmousemove = function(e) {
        GI.cursor.move(e);
    };
    this.mapEl.onmousemove = function(e) {
        _this.mouseEventEl.innerHTML = "ClientX:" + e.layerX + " ClientY:" + e.layerY;
        _this.outputEl.innerHTML = "LogicX:" + _this.transferAbsolutePositionToLogicX(e.layerX, e.layerY) + " LogicY:" + _this.transferAbsolutePositionToLogicY(e.layerX, e.layerY);
    };
};
Mouse.prototype.initMouseClick = function() {
    var _this = this;
    this.uiEl.onmouseup = function(e) {
        // pass mousemove event to grid layout
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent("mouseup"
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
            ,3 //button
            ,null
        );
        _this.gridEl.dispatchEvent(event);
        return false;
    };
    this.gridEl.onmouseup = function(e) {
        var xy = GI.cursor.getPosition();
        if (!_this.checkMoveOut(xy.x, xy.y)) return;
        var endPoint = _this.getCoordinateIndex(xy.x, xy.y);
        var obj = { type : 'moveCharacter', endPoint : endPoint };
        //move
        console.log(endPoint);
        if (e.which === 3) {
            ws.send(obj);
        }
        return false;
    };
};
