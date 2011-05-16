var Event = {
    onSelectTarget : function(el) {
        $(el)[0].onmouseup = function(e) {
            if (e.which === 1) {
                var target = $(el).attr('id');
                console.log(target);
                GI.target = target;
            }
        }
    }
};
