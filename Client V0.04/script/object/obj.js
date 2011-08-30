var Obj = function(objID, typeID, mapBlockID, x, y) {
    Obj.super_.apply(this, arguments);
    //base info
    this.setID(objID);
    this.setTypeID(typeID);
    this.setMapBlockID(mapBlockID);
    this.setPosition(x, y);

    //element init
    this.el = util.createDiv(objID, mapBlockID);
    this.canvasEl = util.createCanvas(objID, mapBlockID);
    this.canvas = this.canvasEl.getContext('2d');
    this.el.appendChild(this.canvas);
};

util.inherits(Obj, Map);

Obj.prototype.getID = function() {
    return this.id;
};
Obj.prototype.setID = function(id) {
    this.id = id;
};
Obj.prototype.getTypeID = function() {
    return this.typeID;
};
Obj.prototype.setTypeID = function(id) {
    this.typeID = id;
};
Obj.prototype.getGroupID = function() {
    return this.groupID;
};
Obj.prototype.setGroupID = function(id) {
    this.groupID = id;
};
Obj.prototype.getPosition = function() {
    return { x : this.x, y : this.y };
};
Obj.prototype.setPosition = function(x, y) {
    if (typeof(x) === 'number' && typeof(y) === 'number') {
        this.x = x;
        this.y = y;
        this.location = this.getCoordinateIndex(x, y);
        return;
    } else if (typeof(x) === 'string') {
        var xy = this.getCoordinateXY(x);
        this.x = xy.x;
        this.y = xy.y;
        this.location = x;
        return;
    }
    throw new Exception(100000, this);
};
Obj.prototype.getMapBlockID = function() {
    return this.mapBlockID;
};
Obj.prototype.setMapBlockID = function(id) {
    this.mapBlockID = id;
};
Obj.prototype.getOffset = function() {
    return { x : this.offsetX, y : this.offsetY };
};
Obj.prototype.put = function() {
    var offset = this.getOffset();
    var xy = this.getPosition();
    var screenX = this.transferAbsolutePositionToOffsetLeft(xy.x, xy.y) - this.HALFTILEWIDTH + offset.x;
    var screenY = this.transferAbsolutePositionToOffsetTop(xy.x, xy.y) - offset.y;
    var z = this.getZIndex(xy.x, xy.y) ;

    $.left(this.el, screenX);
    $.top(this.el, screenY);
    $.z(this.el, z);
};
