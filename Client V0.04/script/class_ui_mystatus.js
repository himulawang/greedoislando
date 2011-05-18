var UI_MyStatus = UI.extend({
    init : function(cID) {
        this._super(cID);
        var html = '';
        html += "<div id='profile-my-character' style='position: absolute; width: 210px; height: 110px; border: 1px solid #DDDDDD;'>";

        html += "<div id='avartar-my-character' style='float: left; width: 100px; height: 100px; border: 1px solid #DDDDDD;'></div>";

        html += "<div id='div-status-my-character' style='float: left'>";
        html += "<div id='div-hp-my-character'><span>HP:</span><span id='hp-my-character'></span></div>";
        html += "<div id='div-nv-my-character'><span>NV:</span><span id='nv-my-character'></span></div>";
        html += "</div>";

        html += "</div>";
        $("body").prepend(html);
        this.elName = $("#avartar-my-character");
        this.elHP = $("#hp-my-character");
        this.elNV = $("#nv-my-character");
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

