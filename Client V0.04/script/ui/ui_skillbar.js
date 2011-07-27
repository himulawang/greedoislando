var UI_SkillBar = function() {
    this.constructor.super_.apply(this, arguments);
    this.skill = {};
};

util.inherits(UI_SkillBar, UI);

UI_SkillBar.prototype.makeBar = function() { //skill list
    var html = '';
    html += "<div id='ui-skill-bar-div' class='radius center'>";
    html += "<div id='ui-skill-bar'>";
    html += "<table id='ui-skill-table'>";
    html += "<tr id='ui-skill-tr'>";
    html += "</tr>";
    html += "</table>";
    html += "</div>";
    html += "</div>";
    $("#ui").prepend(html);// TODO
    this.makeSkill();
};
UI_SkillBar.prototype.makeSkill = function() {
    var skill = GI.character[GI.cID].skill;
    for (var skillID in skill) {
        this.skill[skillID] = new UI_Skill(this.cID);
        this.skill[skillID].make(skillID);
    }
};
