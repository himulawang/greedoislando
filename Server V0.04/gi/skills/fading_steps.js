util.inherits(fadingSteps, skill);

var fadingSteps = function(character) {
	this.initSkill(character);
}
exports.create = function(character) {
	return new fadingSteps(character);
}

fadingSteps.prototype.initSkill = function(character) {
	this.sID = "10101";	
	this.init(character);
}
fadingSteps.prototype.excuteSkill = function(coordinate) {
	this.coordinate = coordinate;
	this.excuteFadingSteps();
	this.excuteSpeedUp();
}
fadingSteps.prototype.excuteFadingSteps = function() {
	var endGridIndex = this.excuteTeleportCoordinateVerify();
	this.io.addOutputData(this.cID, 'teleport', 'logged', {cID : this.cID, nowLocation : this.self.position, endLocation : endGridIndex, timestamp : fc.getTimestamp() });
	this.self.setLocation(endGridIndex);
	this.io.response();	
}
fadingSteps.prototype.excuteSpeedUp = function() {
	var _this = this;
	this.bID = this.getBuffID();
	this.pushBuffList();
	this.self.speedFactor = 1 + this.skill.adtEffectVal;
	this.io.addOutputData(this.cID, 'buff', 'logged', { cID : this.cID, skillID : _this.skill.skillID, last : _this.skill.adtEffectTime ,effect : _this.skill.adtEffect, stack : 1, isOn : 1 });    
	this.io.response();
    this.doSpeedUpTimeout = setTimeout(function(){
    	_this.self.speedFactor = 1;
    	_this.io.addOutputData(_this.cID, 'buff', 'logged', { cID : _this.cID, skillID : _this.skill.skillID, last : _this.skill.adtEffectTime ,effect : _this.skill.adtEffect, stack : 1, isOn : 0 });
        _this.io.response();
    	delete _this.self.buffList[_this.bID];
    }, skill.adtEffectTime);
}
