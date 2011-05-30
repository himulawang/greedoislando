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
        this.loadMapElement();
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
});
