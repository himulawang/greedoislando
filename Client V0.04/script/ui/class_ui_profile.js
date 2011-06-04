var UI_Profile = UI.extend({
    init : function(cID) {
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
    ,setBuff : function(buff) {
        var buffEl = this.getBuffEl(buff.getSourceCID(), buff.getSkillID());
        if (buffEl === false) console.log('FALSE');
        if (buffEl) {
            console.log('refreshBuff');
            this.refreshBuff(buff);
        } else {
            console.log('createBuff');
            this.createBuff(buff);
        }
    }
    ,getBuffEl : function(cID, skillID) {
        var buffID = this.getBuffID(cID, skillID);
        var buffEl = $("#" + buffID);
        if (buffEl.length === 0) return false;
        return buffEl;
    }
    ,getBuffID : function(cID, skillID) {
        return 'buff-' + cID + '-' + skillID;
    }
    ,delBuff : function(cID, skillID) {
        var buffID = this.getBuffID(cID, skillID);
        $("#" + buffID).remove();
    }
    ,createBuff : function(buff) {
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
        this.elBuff.prepend(html);
    }
    ,refreshBuff : function(buff) {
        var buffEl = this.getBuffEl(buff.getSourceCID(), buff.getSkillID());
        buffEl.children(".ui-buff-time").html(fc.getBuffTime(buff.getRemainDuration()));
    }
});

