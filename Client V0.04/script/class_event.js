var Event = {
    onSelectTarget : function(el) {
        $(el)[0].onmouseup = function(e) {
            if (e.which != 1) return;

            var target = $(el).attr('id');
            if (target === GI.char.player.cID) return;

            GI.target = target;
            var otherChar = GI.otherChar;
            for (var cID in otherChar) {
                otherChar[cID].cancelTarget();
            }
            GI.otherChar[target].setTarget();
        }
    }
};
