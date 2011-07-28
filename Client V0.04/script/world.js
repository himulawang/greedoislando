var World = function() {
    this.lag = null;
    this.target = null;
};

World.prototype.initLogin = function() {
    this.initLog();
    this.initMaterial();
    this.initInput();
    this.initCursor();
    this.initCharacterList();
    this.initConnection();
    this.initEvent();
};
World.prototype.initEvent = function() {
    new Event();
};
World.prototype.initInput = function() {
    this.input = new Input();
};
World.prototype.initMaterial = function() {
    this.material = new Material();
};
World.prototype.initMapList = function() {
    this.mapList = new MapList();
    var xy = this.characterList.getSelf().getPosition();
    this.mapList.make(xy.x, xy.y);
}
World.prototype.initCursor = function() {
    this.cursor = new Cursor();
};
World.prototype.initCharacterList = function() {
    this.characterList = new Character_List();
};
World.prototype.initLog = function() {
    this.log = new Log();
};
World.prototype.initTimer = function() {
    this.timer = new Timer();
};
World.prototype.initUI = function(cID) {
    var myStatus = new UI_MyStatus(cID);
    var targetStatus = new UI_TargetStatus(cID);
    var communication = new UI_Communication(cID);
    var skillbar = new UI_SkillBar(cID);
    var chargebar = new UI_ChargeBar(cID);
    GI.ui = {
        myStatus : myStatus
        ,targetStatus : targetStatus
        ,communication : communication
        ,skillbar : skillbar
        ,chargebar : chargebar
    };
};
World.prototype.initConnection = function() {
    ws = new Connect();
    ws.connect();
};
