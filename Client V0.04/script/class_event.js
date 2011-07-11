var Event = {
    onSelectTarget : function(el) {
        $(el)[0].onmouseup = function(e) {
            if (e.which != 1) return;

            var selfCID = GI.cID;
            var targetCID = $(el).attr('id');
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
    }
};
