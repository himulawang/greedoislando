var Skill_FadingSteps = function() {};

util.inherits(Skill_FadingSteps, Skill);
//TODO this._super(skillID);

Skill_FadingSteps.prototype.launch = function() {
    var cursor = GI.cursor;
    if (cursor.preCastSkill === this.skillID) {
        this.send();
        cursor.clearPreCastSkill();
    } else {
        cursor.setPreCastSkill(this.skillID);
    }
};
Skill_FadingSteps.prototype.send = function() {
    var cursor = GI.cursor;
    if (cursor.preCastSkill != this.skillID) return;
    var location = cursor.getCoordinateIndex(cursor.x, cursor.y);
    var obj = {
        type : "castSkill"
        ,location : location
        ,skillID : this.skillID
    }
    wsocket.sendMessage(obj);
};
