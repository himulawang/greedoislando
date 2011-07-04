var UI_ChargeBar = UI.extend({
    init : function(cID) {
        this.cID = cID;
        var html = '';
        html += "<div id='ui-charge-bar-div'>";
        html += "<div id='ui-charge-bar-progress'></div>";
        html += "</div>";
        $("body").prepend(html);
        this.el = $("#ui-charge-bar-progress");
    }
    ,setProgress : function(rate) {
        var left = fc.fix(rate * 200) - 200;
        this.el.css("left", left);
    }
    ,resetProgress : function() {
        this.el.css("left", -200);
    }
});

