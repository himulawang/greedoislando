var UI_Skill = function(cID) {
    UI_Skill.super_.apply(this, arguments);
};

util.inherits(UI_Skill, UI);

UI_Skill.prototype.make = function(skillID) {
    var html = '';
    html += "<td class='ui-skill-td' onclick='GI.skill[" + skillID + "].cast();'>";
    html += "<canvas class='canvas-skill' id='canvas-skill-" + skillID + "' width='55' height='44' ></canvas>";
    html += "<div class='ui-skill'>" + SKILL[skillID].abbreviation + "</div>";
    html += "</td>";
    $.append($('#ui-skill-tr'), html);
    this.canvas = $("#canvas-skill-" + skillID).getContext('2d');
};
UI_Skill.prototype.setCD = function() {
    var c = this.canvas;

    c.fillStyle = "#333333";
    c.fillRect(0, 0, 55, 44);
};
UI_Skill.prototype.refreshCD = function(progress) {
    var c = this.canvas;
    
    var endAngle = Math.PI * 2 * progress - Math.PI / 2;
    c.fillStyle = "#FFFFFF";
    c.beginPath();
    c.moveTo(28, 22);
    c.lineTo(28, 0);
    c.arc(28, 22, 40 //28 * 1.414
        ,-Math.PI/2
        ,endAngle
        ,false);
    c.fill();
};
UI_Skill.prototype.resetCD = function() {
    this.canvas.clearRect(0, 0, 55, 44);
};
