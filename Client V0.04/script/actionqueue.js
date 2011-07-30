var ActionQueue = function(owner) {
    this.owner = owner;
    this.queue = [];
};

ActionQueue.prototype.add = function(stream) {
    this.queue.push(stream);
    this.execute();
};
ActionQueue.prototype.execute = function() {
    if (this.queue.length === 0) return;
    if (this.owner.nowAction) return; // some action is executing
    var shift = this.queue.shift();
    this.owner.nowAction = shift.data;

    var actionType = shift.type;
    this.owner[actionType]();
};
ActionQueue.prototype.clearNow = function() {
    this.owner.nowAction = null;
};
