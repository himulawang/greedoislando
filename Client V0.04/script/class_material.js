var Material = Class.extend({
    init : function(){
        this.images = {};
        this.initMaterial();
    }
    ,initMaterial : function(){
        this.loadCharacterList();
        this.loadMapElement();
        //this.loadEffectList();
    }
    ,loadCharacterList : function() {
        for (var character in ANIMATION_MATERIAL.character) {
            this.images[character] = {};
            this.loadCharacter(ANIMATION_MATERIAL.character[character], character);
        }
    }
    ,loadCharacter : function(character, characterName) {
        for (var action in character.animateList) {
            var frames = character.animateList[action].frames;
            var tmp = [];
            for (var i = 0; i < 8; ++i){
                tmp[i] = [];
                for (var j = 0; j < frames; ++j){
                    tmp[i].push(new Image);
                    tmp[i][j].src = 'images/character/' + characterName.toLowerCase() + '/' + action + '-s-' + i + '/' + characterName.toLowerCase() + '-' + action + '-' + j + '-s.png';
                }
            }
            this.images[characterName][action] = tmp;
        }
    }
    ,loadMapElement : function() {
        var terrains = {
            2001 : 'rock'
            ,2002 : 'tree'
            ,2004 : 'pillar'
        };
        var tmp = {}
        for (var objID in terrains) {
            var img = new Image();
            img.src = 'images/terrain/' + terrains[objID] + '-1-s.png';
            tmp[objID] = img;
        }
        this.images['map'] = tmp;
    }
    ,loadEffectList : function() {
        for (var effectName in ANIMATION_MATERIAL.effect) {
            this.images[effectName] = {};
            this.loadEffect(ANIMATION_MATERIAL.effect[effectName], effectName);
        }
    }
    ,loadEffect : function(effect, effectName) {
        var tmp = [];
        for (var i = 0; i < effect.frames; ++i) {
            tmp.push(new Image);
            tmp[i].src = 'images/effect/' + effectName.toLowerCase() + '/' + i + '.png';
        }
        this.images[effectName] = tmp;
    }
});
