var Scene = function(objID, typeID, mapBlockID, x, y) {
    Scene.super_.apply(this, arguments);
    this.setGroupID(1);
    this.setDefine();
    this.setOffset();
};

util.inherits(Scene, Obj);

Scene.prototype.setDefine = function() {
    this.define = global.ANIMATION_MATERIAL.scene[this.typeID];
};
Scene.prototype.setOffset = function() {
    this.offsetX = this.define.offsetX;
    this.offsetY = this.define.offsetY;
};
