var UI_TargetStatus = UI.extend({
    init : function(cID) {
        this._super(cID);
        var html = '';
        html += "<div id='profile-target-character' style='position: absolute; width: 210px; height: 110px; border: 1px solid #DDDDDD; left: 213px;'>";

        html += "<div id='avartar-target-character' style='float: left; width: 100px; height: 100px; border: 1px solid #DDDDDD;'></div>";

        html += "<div id='div-status-target-character' style='float: left'>";
        html += "<div id='div-hp-target-character'><span>HP:</span><span id='hp-target-character'></span></div>";
        html += "<div id='div-nv-target-character'><span>NV:</span><span id='nv-target-character'></span></div>";
        html += "</div>";

        html += "</div>";
        $("body").prepend(html);
        this.elName = $("#avartar-target-character");
        this.elHP = $("#hp-target-character");
        this.elNV = $("#nv-target-character");
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

