util.inherits(moraStone, skill);

var moraStone = function(chargeFactor) {
	this.sID = "10001";
	this.chargeFactor = chargeFactor;
	this.excuteSkill();
}
exports.create = function(chargeFactor) {
	return new moraStone(chargeFactor);
}

moraStone.prototype.excuteSkill = function() {
	this.excuteDamage(this.skillList[this.sID], this.chargeFactor);
	this.excuteRepel();
}
moraStone.prototype.excuteRepel = function() {
	var _this = this;
	this.target.setDoAction(3);
	
	var skill = this.skillList[this.sID];
	var direction = giMap.getDirection(this.target.position, this.self.position);
	var validLine = giMap.getLineCoordinateWithoutObstacle(this.target.position, direction, skill.adtEffectVal);
	var len = validLine.length;
	var endGridIndex = (len === 0) ? this.target.position : validLine[len - 1];
	var repelDuration = skill.adtEffectTime;
	
	this.target.setLocation(endGridIndex);
	this.io.addOutputData(this.cID, 'moveRepel', 'logged', {cID : this.target.getCID(), nowLocation : this.target.position, endLocation : endGridIndex, duration : repelDuration, timestamp : fc.getTimestamp() });
	
	var dID = this.getDebuffID(this.skillList[this.sID]);
	
	this.doRepelTimeout = setTimeout(function(){
		delete _this.target.debuffList[dID];
		_this.target.setDoAction(0);
	}, repelDuration);
}
