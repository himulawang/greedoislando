var UI_SkillBar = UI.extend({
    init : function(cID) {
        this._super(cID);
    }
    ,makeBar : function() { //skill list
        var skill = GI.skill;
        console.log(GI.skill);
        var html = '';
        html += "<div id='ui-skill-bar-div' class='radius center'>";
        html += "<div id='ui-skill-bar'>";
        html += "<table id='ui-skill-table'>";
        html += "<tr>";
        for (var skillID in skill) {
            html += "<td class='ui-skill-td' onclick='GI.skill[" + skillID + "].cast();'>" + skill[skillID].abbreviation + "</td>";
        }
        html += "</tr>";
        html += "</table>";
        html += "</div>";
        html += "</div>";
        $("body").prepend(html);
    }
});

