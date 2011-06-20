var auraBehv = function(character) {
    this.initAura(character);
}

auraBehv.prototype.initAura = function(character) {
    this.self = character;
    this.initAuraReinforcement();
}
auraBehv.prototype.initAuraReinforcement = function() {
    this.self.defRF = this.self.charAura[5000].auraRFVal + this.self.charAuraID[5000] * this.self.charAura[5000].lvUpMod.auraRFVal;
    this.self.atkRF = this.self.charAura[5001].auraRFVal + this.self.charAuraID[5001] * this.self.charAura[5001].lvUpMod.auraRFVal;
    this.self.recRF = this.self.charAura[5002].auraRFVal + this.self.charAuraID[5002] * this.self.charAura[5002].lvUpMod.auraRFVal;
    this.self.skillRF = this.self.charAura[5003].auraRFVal + this.self.charAuraID[5003] * this.self.charAura[5003].lvUpMod.auraRFVal;
}

exports.get = function(character) {
    return new auraBehv(character);
} 

