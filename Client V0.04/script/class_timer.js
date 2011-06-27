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
        var characters = GI.character;
        var myCharacter = characters[GI.cID];
        var buffList = myCharacter.buff;
        var index = null, buff = null;
        //self Buff UI
        if (fc.objectLength(buffList) != 0) {
            for (index in buffList) {
                buff = buffList[index];
                GI.ui.myStatus.refreshBuff(buff);
            }
        }

        //target Buff UI
        var targetCID = GI.targetCID;
        if (!targetCID) return;

        var buffList = characters[targetCID].buff;
        if (fc.objectLength(buffList) != 0) {
            for (index in buffList) {
                buff = buffList[index];
                GI.ui.targetStatus.refreshBuff(buff);
            }
        }
    }
    ,skillCDTimer : function() {
        var skillList, index, skill;
        skillList = GI.character[GI.cID].skill;
        for (index in skillList) {
            skill = skillList[index];
            var progress = skill.getCDProgress();
            if (!progress) continue;

            GI.ui.skillbar.skill[index].refreshCD(progress);
        }
    }
});
