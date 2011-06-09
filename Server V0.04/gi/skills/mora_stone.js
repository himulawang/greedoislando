var moraStone = function(character) {
	this.initSkill(character);
}

moraStone.prototype.initSkill = function(character) {
	this.sID = "10002";
	this.init(character);
}
moraStone.prototype.castSkill = function(target) {
	this.target = target;
	if(this.castProc() === 0) return;
	this.doDamage();
	this.doRepel();
	this.chargeFactor = 1;
}
moraStone.prototype.doRepel = function() {
	var _this = this;
	this.pushDebuffList();
	this.target.setDoAction(3);
	
	var direction = giMap.getDirection(this.target.position, this.self.position);
	var validLine = giMap.getLineCoordinateWithoutObstacle(this.target.position, direction, this.skill.adtEffectVal);
	var len = validLine.length;
	var endGridIndex = (len === 0) ? this.target.position : validLine[len - 1];
	
	this.target.setLocation(endGridIndex);
	this.io.addOutputData(this.cID, 'moveRepel', 'logged', {cID : this.target.getCID(), nowLocation : this.target.position, endLocation : endGridIndex, duration : this.skill.adtEffectTime, timestamp : fc.getTimestamp() });
	this.io.response();
	var dID = this.getDebuffID();
	
	this.doRepelTimeout = setTimeout(function(){
		delete _this.target.debuffList[dID];
		_this.target.setDoAction(0);
	}, repelDuration);
}

util.inherits(moraStone, Skill);
global.Skill_MoraStoneSkill = moraStone;
