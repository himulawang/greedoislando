var moraStone = function() {}

util.inherits(moraStone, Skill);

moraStone.prototype.initSkill = function(character) {
	this.sID = "10001";
	this.init(character);
}
moraStone.prototype.castSkill = function(target) {
	this.target = target;
    if (!this.castTargetCheck()) return;
	if (!this.castProc()) return;
	this.doDamage();
	this.doRepel();
}
moraStone.prototype.doRepel = function() {
	var _this = this;
	this.pushDebuffList(this.target);
	this.dID = this.getDebuffID(this.target);
	this.target.stopMoving(3);
	
	var direction = calc.getDirection(this.self.position, this.target.position);
	var validLine = calc.getLineCoordinateWithoutObstacle(this.target.position, direction, this.skill.adtEffectVal);
	var len = validLine.length;
	var endGridIndex = (len === 0) ? this.target.position : validLine[len - 1];
	
	io.addOutputData(this.cID, 'moveRepel', 'logged', {cID : this.target.cID, nowLocation : this.target.position, endLocation : endGridIndex, duration : this.skill.adtEffectTime, timestamp : fc.getTimestamp() });
	io.response();
	this.target.setLocation(endGridIndex);

    if (this.self.doRepelTimeout[this.dID]) clearTimeout(this.self.doRepelTimeout[this.dID]);
	
	this.self.doRepelTimeout[this.dID] = setTimeout(function(){
		delete _this.target.debuffList[_this.dID];
		_this.target.beginStanding();
	}, this.skill.adtEffectTime);
}

global.Skill_MoraStone = moraStone;
