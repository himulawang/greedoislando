var Material = function() {
    this.ANIMATION_MATERIAL = global.ANIMATION_MATERIAL;
    this.images = {};
    this.loadCharacterList();
    this.loadMapElement();
    this.loadEffectList();
};

Material.prototype.loadCharacterList = function() {
    for (var character in this.ANIMATION_MATERIAL.character) {
        this.images[character] = {};
        this.loadCharacter(this.ANIMATION_MATERIAL.character[character], character);
    }
};
Material.prototype.loadCharacter = function(character, characterName) {
    for (var action in character) {
        var frames = character[action].frames;
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
};
Material.prototype.loadMapElement = function() {
    var TERRAIN = global.TERRAIN;
    var tmp = {}
    for (var objID in TERRAIN) {
        if (!TERRAIN[objID].render) continue;
        var img = new Image();
        img.src = 'images/terrain/' + TERRAIN[objID].name + '-1-s.png';
        tmp[objID] = img;
    }
    this.images['map'] = tmp;
};
Material.prototype.loadEffectList = function() {
    for (var effectName in this.ANIMATION_MATERIAL.effect) {
        this.images[effectName] = {};
        this.loadEffect(this.ANIMATION_MATERIAL.effect[effectName], effectName);
    }
};
Material.prototype.loadEffect = function(effect, effectName) {
    var tmp = {};
    for (var action in effect) {
        var frames = effect[action].frames
        tmp[action] = [];
        for (var i = 0; i < effect[action].frames; ++i) {
            tmp[action].push(new Image);
            tmp[action][i].src = 'images/effect/' + effectName.toLowerCase() + '/' + action + '/' + i + '.png';
        }
    }
    this.images[effectName] = tmp;
};
