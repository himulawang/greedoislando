var UserInterface = Class.extend({
    init : function(cID) {
        this.cID = cID;
        this.drawUserHpSlot();
        this.drawUserManaSlot();
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
        Hpslot_X = ScreenX + 9;
        ManaSlot_X = ScreenX + 9;
        Hpslot_Y = ScreenY - 16;
        ManaSlot_Y = ScreenY - 8;
        
        Hpslot.css({left : Hpslot_X + 'px', top : Hpslot_Y + 'px'});
        ManaSlot.css({left : ManaSlot_X + 'px', top : ManaSlot_Y + 'px'});
    }
});

