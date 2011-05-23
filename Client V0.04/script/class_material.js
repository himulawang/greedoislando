var Material = Class.extend({
    init : function(){
        this.images = {};
        this.initMaterialData();
        this.initMaterial();
    }
    ,initMaterialData : function() {
        this.materialData = {
            character : {
                gon : {
                    animateList : {
                        'stand' : {
                            'frames' : 2
                            ,'duration' : 500
                        }
                        ,'attack' : {
                            'frames' : 7
                            ,'duration' : 500
                        }
                        ,'run' : {
                            'frames' : 8
                            ,'duration' : 100
                        }
                    }
                }
            }
        }
    }
    ,initMaterial : function(){
        this.loadCharacterList();
    }
    ,loadCharacterList : function() {
        for (var character in this.materialData.character) {
            this.images[character] = {};
            this.loadCharacter(this.materialData.character[character], character);
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
});
