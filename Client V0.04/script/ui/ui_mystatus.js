var UI_MyStatus = function() {
    this.constructor.super_.apply(this, arguments);
    var html = '';
    html += "<div id='ui-my-profile'>";
    html += "<div id='ui-my-avartar'></div>";
    html += "<div id='ui-my-profile-status-div'>";
    html += "<div id='ui-my-profile-hp-div'><span>HP:</span><span id='ui-my-profile-hp'></span></div>";
    html += "<div id='ui-my-profile-nv-div'><span>NV:</span><span id='ui-my-profile-nv'></span></div>";
    html += "</div>";
    html += "<div class='clear'></div>";
    html += "<div id='ui-my-buff-div'></div>";
    html += "</div>";
    $("#ui").prepend(html); //TODO
    this.elName = $("#ui-my-avartar");
    this.elHP = $("#ui-my-profile-hp");
    this.elNV = $("#ui-my-profile-nv");
    this.elBuff = $("#ui-my-buff-div");
}

util.inherits(UI_MyStatus, UI_Profile);
