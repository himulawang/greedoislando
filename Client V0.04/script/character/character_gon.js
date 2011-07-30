var Character_Gon = function(name) {
    Character_Gon.super_.apply(this, arguments);
    this.name = name;
    this.type = 'Gon';
};

util.inherits(Character_Gon, Character);
