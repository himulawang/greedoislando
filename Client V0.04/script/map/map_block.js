/* <div id='map'>
 *      <div id='b001_001'>Line&Terrain</div>
 * </div>
 * <div id='object'>
 *      <div class='b001_001'><img src='TREE'></div>
 *      <div><canvas id='9348091a-63b5-b861-fc7b-33cedaf10e52'>Character</canvas></div>
 *      <div><canvas id='9348091a-63b5-b861-fc7b-33cedaf10e53'>NPC</canvas></div>
 * </div>
 * */
var Map_Block = function(id) {
    var xy = this.transferMapBlockIndexToXY(id);
    // argument: objID, typeID, mapBlockID, x, y
    Map_Block.super_.apply(this, [fc.guid(), id, id, xy.x, xy.y]);
    this.setGroupID(3);
    this.scene = window[id];

    this.el.style.width = this.MAPWIDTH;
    this.el.style.height = this.MAPHEIGHT;
    this.canvasEl.width = this.MAPWIDTH;
    this.canvasEl.height = this.MAPHEIGHT;
    $('#map').appendChild(this.el);

    this.draw();
    this.put();
};

util.inherits(Map_Block, Obj);

Map_Block.prototype.put = function() {
    var x = this.x - 1;
    var y = this.y - 1;

    var left = this.transferMapBlockLogicToLayerX(x, y);
    var top = this.transferMapBlockLogicToLayerY(x, y);

    $.left(this.el, left);
    $.top(this.el, top);
};
Map_Block.prototype.draw = function() {
    var x, y;
    this.canvas.beginPath();
    this.canvas.moveTo(this.MAPWIDTH / 2, 0);
    this.canvas.lineTo(0, this.MAPHEIGHT / 2);
    this.canvas.lineTo(this.MAPWIDTH / 2, this.MAPHEIGHT);
    this.canvas.lineTo(this.MAPWIDTH, this.MAPHEIGHT / 2);
    this.canvas.closePath();
    this.canvas.stroke();

    /*
    var xy, tmpXY, img;
    for (var index in this.grid) {
        tmpXY = this.getCoordinateXY(index);
        x = tmpXY.x;
        y = tmpXY.y;

        var objID = this.grid[index].objID;
        var offsetX = this.TERRAIN[objID].offsetX;
        var offsetY = this.TERRAIN[objID].offsetY;
        var lib = GI.material.images.map;
        if (objID == 2001  || objID == 2002 || objID == 2004) {
            img = lib[objID];
            this.canvas.drawImage(img, this.transferLogicToScreenX(x, y) - offsetX, this.transferLogicToScreenY(x, y) - offsetY);
        }
    }
    */
};
/*
Map_Block.prototype.getTerrainType = function(index) {
    if (!this.grid[index]) return false;
    var objID = this.grid[index].objID;
    
    return this.TERRAIN[objID].name;
};
Map_Block.prototype.drawTest = function() {
    var img = new Image();
    img.src = 'images/plain.png';
    this.canvas.drawImage(img, 0, 0);
};
*/
