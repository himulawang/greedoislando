var UI_Profile = function(cID) {
    UI_Profile.super_.apply(this, arguments);
};

util.inherits(UI_Profile, UI);

UI_Profile.prototype.setName = function(name) {
    this.elName.innerHTML = name;
};
UI_Profile.prototype.setHP = function(hp) {
    this.elHP.innerHTML = hp;
};
UI_Profile.prototype.setNV = function(nv) {
    this.elNV.innerHTML = nv;
};
UI_Profile.prototype.setBuff = function(buff) {
    var buffEl = this.getBuffEl(buff.getSourceCID(), buff.getSkillID());
    if (buffEl) {
        this.refreshBuff(buff);
    } else {
        this.createBuff(buff);
    }
};
UI_Profile.prototype.getBuffEl = function(cID, skillID) {
    var buffID = this.getBuffID(cID, skillID);
    var buffEl = $("#" + buffID);
    if (buffEl === null) return false;
    return buffEl;
};
UI_Profile.prototype.getBuffID = function(cID, skillID) {
    return 'buff-' + cID + '-' + skillID;
};
UI_Profile.prototype.delBuff = function(cID, skillID) {
    var buffID = this.getBuffID(cID, skillID);
    $.remove($("#" + buffID));
};
UI_Profile.prototype.createBuff = function(buff) {
    var html = '';
    var sourceCID = buff.getSourceCID();
    var skillID = buff.getSkillID();
    var stack = buff.getStack();
    var duration = buff.getDuration();
    var buffID = this.getBuffID(sourceCID, skillID);
    html += "<div class='ui-buff-div' id='" + buffID + "'>";
    html += "<div class='ui-buff-name'>" + skillID + "</div>";
    html += "<div class='ui-buff-stack'>" + stack + "stk</div>";
    html += "<div class='ui-buff-time'>" + duration + "</div>";
    html += "</div>";
    $.prepend(this.elBuff, html);
};
UI_Profile.prototype.refreshBuff = function(buff) {
    var buffEl = this.getBuffEl(buff.getSourceCID(), buff.getSkillID());
    if (!buffEl) return;
    //TODO
    buffEl.children(".ui-buff-stack").html(buff.getStack() + 'stk');
    buffEl.children(".ui-buff-time").html(buff.getStringTime());
};
