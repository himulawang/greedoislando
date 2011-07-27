var UI_ChargeBar = function(cID) {
    this.constructor.super_.apply(this, arguments);
    var html = '';
    html += "<div id='ui-charge-bar-div'>";
    html += "<div id='ui-charge-bar-progress'></div>";
    html += "</div>";
    $("#ui").prepend(html);//TODO
    this.el = $("#ui-charge-bar-progress");
}

util.inherits(UI_ChargeBar, UI);

UI_ChargeBar.prototype.setProgress = function(rate) {
    var left = util.fix(rate * 200) - 200;
    this.el.css("left", left); //TODO
};
UI_ChargeBar.prototype.resetProgress = function() {
    this.el.css("left", -200); //TODO
};
