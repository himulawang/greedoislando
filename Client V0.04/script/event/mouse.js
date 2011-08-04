var Mouse = function() {
    this.uiEl = $('#ui');
    this.gridEl = $('#grid');
    this.mapEl = $('#map');
    this.mouseEventEl = $('#mouseevent');
    this.outputEl = $('#output');
    this.initLogin();
    this.initMouseOverGrid();
    this.initMouseClick();
};

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
    console.log(e.clientX, e.clientY);
        _this.mouseEventEl.innerHTML = "ClientX:" + e.layerX + " ClientY:" + e.layerY;
        _this.outputEl.innerHTML = "LogicX:" + GI.mapList.transferAbsolutePositionToLogicX(e.layerX, e.layerY) + " LogicY:" + GI.mapList.transferAbsolutePositionToLogicY(e.layerX, e.layerY);
    };
};
Mouse.prototype.initMouseClick = function() {
    this.gridEl.onmouseup = function(e) {
        var xPX = e.layerX;
        var yPX = e.layerY;
        var x = GI.maplist.transferScreenToLogicX(xPX, yPX);
        var y = GI.maplist.transferScreenToLogicY(xPX, yPX);
        if (!GI.maplist.checkMoveOut(x, y)) return;
        var endPoint = GI.maplist.getCoordinateIndex(x, y);
        var obj = { type : 'moveCharacter', endPoint : endPoint };
        //move
        if (e.which === 3) {
            var index = GI.maplist.getCoordinateIndex(x, y);
            if (!GI.maplist.verifyClickMovePossible(index)) return;
            ws.send(obj);
        }
        return false;
    };
};
