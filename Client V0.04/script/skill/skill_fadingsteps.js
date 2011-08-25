var Skill_FadingSteps = function(skillID) {
    Skill_FadingSteps.super_.apply(this, arguments);
};

util.inherits(Skill_FadingSteps, Skill);

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
