var centerPlain = function() {}

util.inherits(centerPlain, Map);

centerPlain.prototype.initMap = function() {
    this.startGridXY = "194,194";
    this.maxGridXY = "290,290";
    this.init(this.startGridXY, this.maxGridXY);
    this.grid = fc.readFile("../config/map/80002.js");
}

global.Map_CenterPlain = centerPlain;

