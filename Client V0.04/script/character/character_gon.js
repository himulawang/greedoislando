var Character_Gon = function(name) {
    console.log(this);
    this.super_(arguments);
    this.name = name;
    this.type = 'Gon';
};

util.inherits(Character_Gon, Character);
