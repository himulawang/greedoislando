var UI_TargetStatus = UI.extend({
    init : function(cID) {
        this._super(cID);
        var html = '';
        html += "<div id='ui-target-profile'>";
        html += "<div id='ui-target-avartar'></div>";
        html += "<div id='ui-target-profile-status-div'>";
        html += "<div id='ui-target-profile-hp-div'><span>HP:</span><span id='ui-my-profile-hp'></span></div>";
        html += "<div id='ui-target-profile-nv-div'><span>NV:</span><span id='ui-my-profile-nv'></span></div>";
        html += "</div>";
        html += "<div class='clear'></div>";
        html += "</div>";
        $("body").prepend(html);
        this.elName = $("#ui-target-avartar");
        this.elHP = $("#ui-my-profile-hp");
        this.elNV = $("#ui-my-profile-nv");
    }
    ,setName : function(name) {
        this.elName.html(name);
    }
    ,setHP : function(hp) {
        this.elHP.html(hp);
    }
    ,setNV : function(nv) {
        this.elNV.html(nv);
    }
});

