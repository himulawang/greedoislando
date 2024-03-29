var UI_TargetStatus = function() {
    UI_TargetStatus.super_.apply(this, arguments);
    var html = '';
    html += "<div id='ui-target-profile'>";
    html += "<div id='ui-target-avartar'></div>";
    html += "<div id='ui-target-profile-status-div'>";
    html += "<div id='ui-target-profile-hp-div'><span>HP:</span><span id='ui-target-profile-hp'></span></div>";
    html += "<div id='ui-target-profile-nv-div'><span>NV:</span><span id='ui-target-profile-nv'></span></div>";
    html += "</div>";
    html += "<div class='clear'></div>";
    html += "<div id='ui-target-buff-div'></div>";
    html += "</div>";
    $.prepend($("#ui"), html);
    this.elName = $("#ui-target-avartar");
    this.elHP = $("#ui-target-profile-hp");
    this.elNV = $("#ui-target-profile-nv");
    this.elBuff = $("#ui-target-buff-div");
};

util.inherits(UI_TargetStatus, UI);
