var masadora = function() {}

util.inherits(masadora, Map);

masadora.prototype.initMap = function() {
    this.startGridXY = "97,97";
    this.maxGridXY = "193,193";
    this.init(this.startGridXY, this.maxGridXY);
    this.grid = fc.readFile("../config/map/80001.js");
}

global.Map_Masadora = masadora;
