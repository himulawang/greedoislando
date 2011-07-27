var Event = function() {
    this.initDisableContextMenu();
    this.initKeyboard();
    this.initMouse();
};

Event.prototype.onSelectTarget = function(el) {
    el.onmouseup = function(e) {
        if (e.which != 1) return;

        var selfCID = GI.cID;
        var targetCID = el.id;
        if (targetCID === selfCID) return;
        var characters = GI.character;
        //cancel other targets
        for (var cID in characters) {
            GI.character[cID].cancelTarget();
        }

        GI.targetCID = targetCID;
        //set this targetCID
        var target = characters[targetCID];
        target.setTarget();

        //display target status
        var uiTargetStatus = GI.ui.targetStatus;
        uiTargetStatus.setName(target.name);
        uiTargetStatus.setHP(target.hp);
        uiTargetStatus.setNV(target.nv);
    }
};
Event.prototype.initDisableContextMenu = function() {
    document.oncontextmenu = function(e) {
        return false;
    };
};
Event.prototype.initKeyboard = function() {
    GI.keyboard = new Keyboard();
    GI.keyboard.make();
};
Event.prototype.initMouse = function() {
    GI.mouse = new Mouse();
}
