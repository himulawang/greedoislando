var Skill_FadingSteps = Skill.extend({
    init : function(skillID) {
        this._super(skillID);
    }
    ,cast : function() {
        var cursor = GI.cursor;
        if (cursor.preCastSkill === this.skillID) {
            this.send();
            cursor.clearPreCastSkill();
        } else {
            cursor.setPreCastSkill(this.skillID);
        }
    }
    ,send : function() {
        var cursor = GI.cursor;
        if (cursor.preCastSkill != this.skillID) return;
        var location = cursor.getCoordinateIndex(cursor.x, cursor.y);
        var obj = {
            type : "castSkill"
            ,location : location
            ,skillID : this.skillID
        }
        wsocket.sendMessage(obj);
    }
});
