var UI_SkillBar = UI.extend({
    init : function(cID) {
        this._super(cID);
        var html = '';
        html += "<div id='ui-skill-bar-div' class='radius center'>";
        html += "<div id='ui-skill-bar'>";
        html += "<table id='ui-skill-table'>";
        html += "<tr>";
        html += "<td class='ui-skill-td' onclick=''>拳</td>";
        html += "<td class='ui-skill-td'>拳</td>";
        html += "<td class='ui-skill-td'>拳</td>";
        html += "<td class='ui-skill-td'>拳</td>";
        html += "<td class='ui-skill-td'>体</td>";
        html += "<td class='ui-skill-td'>爆</td>";
        html += "<td class='ui-skill-td'>光</td>";
        html += "</tr>";
        html += "</table>";
        html += "</div>";
        html += "</div>";
        $("body").prepend(html);
    }
});

