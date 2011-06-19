var fadingSteps = function() {}

util.inherits(fadingSteps, Skill);

fadingSteps.prototype.initSkill = function(character) {
	this.sID = "10101";
	this.init(character);
}
fadingSteps.prototype.castSkill = function(coordinate) {
	this.coordinate = coordinate;
    if(!this.castLocationCheck()) return;
    this.posCastProc();
    this.doFadingSteps();
	this.doSpeedUp();
}
fadingSteps.prototype.doFadingSteps = function() {
	var endGridIndex = this.doTeleportCoordinateVerify();
	io.addOutputData(this.cID, 'teleport', 'logged', { cID : this.cID, nowLocation : this.self.position, endLocation : endGridIndex, timestamp : fc.getTimestamp() });
	io.response();
    this.self.setLocation(endGridIndex);
    this.setSkillCD();
    this.startSkillCDProc();
    this.setCommonCD();
    this.self.beginStanding();
}
fadingSteps.prototype.doSpeedUp = function() {
	var _this = this;
	this.bID = this.getBuffID(this.self);
	this.pushBuffList(this.self);
	this.self.speedFactor = 1 + this.skill.adtEffectVal;
	io.addOutputData(this.cID, 'buff', 'logged', { cID : this.cID, sourceCID : this.cID, skillID : this.skill.skillID, last : this.skill.adtEffectTime ,effect : this.skill.adtEffect, stack : 1, isOn : 1 });
	io.response();

    if (this.self.doSpeedUpTimeout[this.bID]) clearTimeout(this.self.doSpeedUpTimeout[this.bID]);

    this.self.doSpeedUpTimeout[this.bID] = setTimeout(function(){
    	_this.self.speedFactor = 1;
    	io.addOutputData(_this.cID, 'buff', 'logged', { cID : _this.cID, sourceCID : _this.cID, skillID : _this.skill.skillID, last : _this.skill.adtEffectTime ,effect : _this.skill.adtEffect, stack : 1, isOn : 0 });
        io.response();
    	delete _this.self.buffList[_this.bID];
    }, this.skill.adtEffectTime);
}

global.Skill_FadingSteps = fadingSteps;
