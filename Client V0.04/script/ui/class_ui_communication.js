var UI_Communication = UI.extend({
    init : function(cID) {
        this._super(cID);
        var html = '';
        html += "<div style='width: 358px; height: 198px; border: 1px solid #DDDDDD; position: absolute; top: 400px; z-index: 100;'>";
        html += "<div id='ui-chat-history'></div>";
        html += "<input style='width: 356px; height: 12px; margin-left: auto; margin-right: auto;'>";
        html += "</div>";
        $("#ui").prepend(html);
    }
});

