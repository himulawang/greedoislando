var Material = function() {
    this.images = {};
    this.initMaterial();
    this.loadCharacterList();
    this.loadMapElement();
    this.loadEffectList();
};

Material.prototype.loadCharacterList = function() {
    for (var character in ANIMATION_MATERIAL.character) {
        this.images[character] = {};
        this.loadCharacter(ANIMATION_MATERIAL.character[character], character);
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
    //TODO
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
};
Material.prototype.loadEffectList = function() {
    for (var effectName in ANIMATION_MATERIAL.effect) {
        this.images[effectName] = {};
        this.loadEffect(ANIMATION_MATERIAL.effect[effectName], effectName);
    }
};
Material.prototype.loadEffect = function(effect, effectName) {
    var tmp = {};
    for (var action in effect) {
        var frames = effect[action].frames
        tmp[action] = [];
        for (var i = 0; i < effect[action].frames; ++i) {
            tmp[action].push(new Image);
            console.log('images/effect/' + effectName.toLowerCase() + '/' + action + i + '.png');
            tmp[action][i].src = 'images/effect/' + effectName.toLowerCase() + '/' + action + '/' + i + '.png';
        }
    }
    this.images[effectName] = tmp;
};
