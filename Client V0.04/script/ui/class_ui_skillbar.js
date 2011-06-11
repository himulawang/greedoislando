var UI_SkillBar = UI.extend({
    init : function(cID) {
        this._super(cID);
        this.skill = {};
    }
    ,makeBar : function() { //skill list
        var html = '';
        html += "<div id='ui-skill-bar-div' class='radius center'>";
        html += "<div id='ui-skill-bar'>";
        html += "<table id='ui-skill-table'>";
        html += "<tr id='ui-skill-tr'>";
        html += "</tr>";
        html += "</table>";
        html += "</div>";
        html += "</div>";
        $("body").prepend(html);
        this.makeSkill();
    }
    ,makeSkill : function() {
        var skill = GI.skill;
        for (var skillID in skill) {
            this.skill[skillID] = new UI_Skill(this.cID);
            this.skill[skillID].make(skillID);
        }
    }
});
