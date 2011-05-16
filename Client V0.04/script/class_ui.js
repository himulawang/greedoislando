var UI = Class.extend({
    init : function(cID) {
        this.cID = cID;
    }
    ,initMyCharacterProfile : function() {
        var html = '';
        html += "<div id='profile-my-character' style='position: absolute; width: 210px; height: 110px; border: 1px solid #DDDDDD;'>";

        html += "<div id='avartar-my-character' style='float: left; width: 100px; height: 100px; border: 1px solid #DDDDDD;'></div>";

        html += "<div id='div-status-my-character' style='float: left'>";
        html += "<div id='div-hp-my-character'><span>HP:</span><span id='hp-my-character'></span></div>";
        html += "<div id='div-nv-my-character'><span>NV:</span><span id='nv-my-character'></span></div>";
        html += "</div>";

        html += "</div>";
        $("body").prepend(html);
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

