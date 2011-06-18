var ActionQueue = Class.extend({
    init : function(owner){
        this.owner = owner;
        this.queue = [];
    }
    ,add : function(stream) {
        this.queue.push(stream);
        this.execute();
    }
    ,execute : function() {
        if (this.queue.length === 0) return;
        if (this.owner.nowAction) return; // some action is executing
        var shift = this.queue.shift();
        this.owner.nowAction = shift.data;

        var actionType = shift.type;
        this.owner[actionType]();
    }
    ,clearNow : function() {
        this.owner.nowAction = null;
    }
});
