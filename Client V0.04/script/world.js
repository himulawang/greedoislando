var World = function() {
    this.lag = null;
    this.target = null;
    this.initInput();
    this.initMaterial();
    this.initCursor();
    this.initCharacterList();
    this.initEvent();

    this.initConnection();
};

World.prototype.initEvent = function() {
    new Event();
};
World.prototype.initInput = function() {
    this.input = new Input();
};
/* Draw Basic Element */
World.prototype.initMaterial = function() {
    this.material = new Material();
};
World.prototype.initMap = function() {
    this.mapList = new MapList();
    var xy = this.mapList.getPlayerAbsoluteXY();
    this.mapList.make(xy.x, xy.y);
}
World.prototype.initCursor = function() {
    this.cursor = new Cursor();
    this.cursor.getCanvas($('#cursor'));
    this.cursor.draw();
    this.cursor.startBreath();
};
World.prototype.initCharacterList = function() {
    this.characterList = new Character_List();
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
