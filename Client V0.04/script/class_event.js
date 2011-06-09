var Event = {
    onSelectTarget : function(el) {
        $(el)[0].onmouseup = function(e) {
            if (e.which != 1) return;

            var targetCID = $(el).attr('id');
            if (targetCID === GI.player.cID) return;

            GI.targetCID = targetCID;
            //cancel other targets
            var otherChar = GI.otherChar;
            for (var cID in otherChar) {
                otherChar[cID].cancelTarget();
            }
            //set this targetCID
            GI.otherChar[targetCID].setTarget();

            //display target status
            var target = GI.otherChar[targetCID];
            GI.ui.targetStatus.setName(target.name);
            GI.ui.targetStatus.setHP(target.hp);
            GI.ui.targetStatus.setNV(target.nv);
        }
    }
};
