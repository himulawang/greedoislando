var Timer = function() {
    this.list = {};
    this.startBuff();
    this.startSkillCD();
    this.startSession();
};
Timer.prototype.startSession = function() {
    this.list['session'] = setInterval(this.session, 5000);
};
Timer.prototype.startBuff = function() {
    this.list['buff'] = setInterval(this.buff, 100);
};
Timer.prototype.startSkillCD = function() {
    this.list['skillCD'] = setInterval(this.skillCD, 50);
};
Timer.prototype.session = function() {
    ws.sendMessage({ type : "keepSession", timestamp : fc.getNowTimestamp() });
};
Timer.prototype.buff = function() {
    var characterList = GI.characterList.getPlayerList();
    var myCharacter = GI.characterList.getSelf();
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

    var buffList = characterList.getPlayer(targetCID).buff;
    if (fc.objectLength(buffList) != 0) {
        for (index in buffList) {
            buff = buffList[index];
            GI.ui.targetStatus.refreshBuff(buff);
        }
    }
};
Timer.prototype.skillCD = function() {
    var skillList, index, skill;
    skillList = GI.characterList.getSelf().skill;
    for (index in skillList) {
        skill = skillList[index];
        var progress = skill.getCDProgress();
        if (!progress) continue;

        GI.ui.skillbar.skill[index].refreshCD(progress);
    }
};
