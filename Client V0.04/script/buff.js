var Buff = function(data) {
    this.sourceCID = data.sourceCID;
    this.skillID = data.skillID;
    this.duration = data.last;
    this.stack = data.stack;
    this.createStamp = fc.getNowTimestamp();
};

Buff.prototype.getSourceCID : function() {
    return this.sourceCID;
};
Buff.prototype.getSkillID : function() {
    return this.skillID;
};
Buff.prototype.getDuration : function() {
    return this.duration;
};
Buff.prototype.getStack : function() {
    return this.stack;
};
Buff.prototype.getCreateStamp : function() {
    return this.createStamp;
};
Buff.prototype.getRemainDuration : function() {
    var remainDuration = this.getDuration() - (fc.getNowTimestamp() - this.getCreateStamp());
    if (remainDuration < 0) remainDuration = 0;
    return fc.fix(remainDuration);
};
