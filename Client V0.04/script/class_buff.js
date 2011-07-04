var Buff = Class.extend({
    init : function(data) {
        this.sourceCID = data.sourceCID;
        this.skillID = data.skillID;
        this.duration = data.last;
        this.stack = data.stack;
        this.createStamp = fc.getNowTimestamp();
    }
    ,getSourceCID : function() {
        return this.sourceCID;
    }
    ,getSkillID : function() {
        return this.skillID;
    }
    ,getDuration : function() {
        return this.duration;
    }
    ,getStack : function() {
        return this.stack;
    }
    ,getCreateStamp : function() {
        return this.createStamp;
    }
    ,getRemainDuration : function() {
        var remainDuration = this.getDuration() - (fc.getNowTimestamp() - this.getCreateStamp());
        if (remainDuration < 0) remainDuration = 0;
        return fc.fix(remainDuration);
    }
});
