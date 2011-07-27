var Mouse = function() {
    this.initLogin();
    this.initMouseOverGrid();
    this.initMouseClick();
};

Mouse.prototype.initLogin = function() {
    var el = $('.choose-character');
    for (var i in el) {
        el[i].onmouseup = function() {
            var obj = {
                type : "selectCharacter"
                ,character : el[i].id
            }
            ws.send(obj);
        };
    }
};
Mouse.prototype.initMouseOverGrid = function() {
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
        $("#grid").dispatchEvent(event);
        return false;
    };
    $("#grid").onmousemove = function(e) {
        GI.cursor.move(e);
        $('#mouseevent').innerHTML = "ScreenX:" + e.screenX + " ScreenY:" + e.screenY;
        $('#output').innerHTML = "LogicX:" + GI.cursor.x + " LogicY:" + GI.cursor.y;
    };
};
Mouse.prototype.initMouseClick = function() {
    $('#grid').onmouseup = function(e) {
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
            if(!GI.maplist.verifyClickMovePossible(index)) return;
            ws.send(obj);
        }
        return false;
    };
};
