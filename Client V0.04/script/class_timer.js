var Timer = Class.extend({
    init : function() {
        this.buff = null;
        this.makeBuffTimer();
    }
    ,makeBuffTimer : function() {
        this.buff = setInterval(this.buffTimer, 100);
    }
    ,buffTimer : function() {
        var buffList, index, buff, cID;
        if (fc.objectLength(GI.player.buff) != 0) {
            buffList = GI.player.buff;
            for (index in buffList) {
                buff = buffList[index];
                GI.ui.myStatus.refreshBuff(buff);
            }
        }
        if (fc.objectLength(GI.otherChar) === 0) return;
        
        for (cID in GI.otherChar) {
            buffList = GI.otherChar[cID].buff;
            for (index in buffList) {
                buff = buffList[index];
                GI.ui.targetStatus.refreshBuff(buff);
            }
        }
    }
});
