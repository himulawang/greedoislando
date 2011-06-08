util.inherits(fadingSteps, skill);

var fadingSteps = function(coordinate) {
	this.sID = "10101";
	this.coordinate = coordinate;
	this.excuteSkill();
}
exports.create = function(coordinate) {
	return new fadingSteps(coordinate);
}

fadingSteps.prototype.excuteSkill = function() {
	this.excuteFadingSteps();
}
fadingSteps.prototype.excuteFadingSteps = function() {
	var skill = this.skillList[this.sID];
	var endGridIndex = this.coordinateVerify(skill, this.coordinate);
	this.io.addOutputData(this.cID, 'teleport', 'logged', {cID : this.cID, nowLocation : this.self.position, endLocation : endGridIndex, timestamp : fc.getTimestamp() });
	this.self.setLocation(endGridIndex);
	this.io.response();
	this.excuteSpeedUp();
}
fadingSteps.prototype.excuteSpeedUp = function() {
	var _this = this;
	var skill = this.skillList[this.sID];
	var bID = this.getBuffID(skill);
	this.pushBuffList(skill);
	
	this.self.speedFactor = 1 + skill.adtEffectVal;
	
	this.io.addOutputData(this.cID, 'buff', 'logged', { cID : this.cID, skillID : skill.skillID, last : skill.adtEffectTime ,effect : skill.adtEffect, stack : 1, isOn : 1 });    
	this.io.response();
    
    this.doSpeedUpTimeout = setTimeout(function(){
    	_this.self.speedFactor = 1;
    	_this.io.addOutputData(_this.cID, 'buff', 'logged', { cID : _this.cID, skillID : skill.skillID, last : skill.adtEffectTime ,effect : skill.adtEffect, stack : 1, isOn : 0 });
        _this.io.response();
    	delete _this.self.buffList[bID];
    }, skill.adtEffectTime);
}
