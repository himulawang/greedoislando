var UI = Class.extend({
    init : function(cID) {
        this.cID = cID;
    }
    ,drawUserHpSlot : function() {
        var HpSlotHtml = "<div class='hpslot' id='" + this.cID + "-hpslot'><div class='hpfiller'></div></div>";
        $("#main").append(HpSlotHtml);
    }
    ,drawUserManaSlot : function() {
        var ManaSlotHtml = "<div class='manaslot' id='" + this.cID + "-manaslot'><div class='manafiller'></div></div>";
        $("#main").append(ManaSlotHtml);
    }
    ,slotput : function(ScreenX,ScreenY) {
        var Hpslot = $('#' + this.cID + '-hpslot');
        var ManaSlot = $('#' + this.cID + '-manaslot');
        var Hpslot_X = ScreenX - 20;
        var ManaSlot_X = ScreenX - 20;
        var Hpslot_Y = ScreenY - 16;
        var ManaSlot_Y = ScreenY - 8;
        
        Hpslot.css({left : Hpslot_X + 'px', top : Hpslot_Y + 'px'});
        ManaSlot.css({left : ManaSlot_X + 'px', top : ManaSlot_Y + 'px'});
    }
});

