var Timer = Class.extend({
    init : function() {
        this.buff = null;
        this.skillCD = null;
        this.makeBuffTimer();
    }
    ,makeBuffTimer : function() {
        this.buff = setInterval(this.buffTimer, 100);
        this.skillCD = setInterval(this.skillCDTimer, 50);
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
    ,skillCDTimer : function() {
        var skillList, index, skill, cID;
        skillList = GI.skill;
        for (index in skillList) {
            skill = skillList[index];
            var progress = skill.getCDProgress();
            if (!progress) continue;

            GI.ui.skillbar.skill[index].refreshCD(progress);
        }
    }
});
