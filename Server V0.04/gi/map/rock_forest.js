var rockForest = function() {}

util.inherits(rockForest, Map);

rockForest.prototype.initMap = function() {
    this.startGridXY = "0,0";
    this.maxGridXY = "96,96";
    this.init(this.startGridXY, this.maxGridXY);
    this.grid = fc.readFile("../config/map/80002.js");
}

global.Map_RockForest = rockForest;
