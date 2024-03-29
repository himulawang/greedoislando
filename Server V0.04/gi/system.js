var systemBehv = function(character) {
    this.initSystem(character);
}

systemBehv.prototype.initSystem = function(character) {
    this.self = character;
    this.initSystemReinforcement();
}
systemBehv.prototype.initSystemReinforcement = function() {
    for (var x in this.self.charSkill) {
        if (this.self.charSkill[x].trigger === 'aura') continue;
        var pecentage = this.self.system[this.self.charSkill[x].systemBelongs];
        this.self.charSkill[x].damage = ( Number(this.self.charSkill[x].damage) * pecentage / 100 );
        /*
        if (this.self.system.sysRFType === this.self.charSkill[x].attribution) {
            this.self.charSkill[x].damage = ( this.self.charSkill[x].damage * ( 1 + this.self.system.sysRFVal ) ) * ( 1 + this.self.skillRF );
        }
        */
    }
}

exports.get = function(character) {
    return new systemBehv(character);
} 
