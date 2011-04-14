var Map = Coordinate.extend({
    init : function() {
        this._super();
    }
    ,getCanvas : function(el) {
        el.width = this.MAPWIDTH;
        el.height = this.MAPHEIGHT;
        this.context = el.getContext('2d');
    }
    ,draw : function() { // Draw Map Side
        var x, y;
        this.context.beginPath();
        this.context.moveTo(this.MAPWIDTH / 2, 0);
        this.context.lineTo(0, this.MAPHEIGHT / 2);
        this.context.lineTo(this.MAPWIDTH / 2, this.MAPHEIGHT);
        this.context.lineTo(this.MAPWIDTH, this.MAPHEIGHT / 2);
        this.context.closePath();
        this.context.stroke();

        //consoleDiv = document.getElementById('console');
        //consoleDiv.innerHTML = consoleDiv.innerHTML + "<div>" + terrain + "</div>";
        //alert(TERRAIN);
        
        var comp;
        var obsname;
        var dcomp;
        for(var i = 0; i < this.GRIDQUANTITY; ++i){
            x = i; 
            for(var j = 0; j < this.GRIDQUANTITY; ++j){
                y = j;
                comp = x + "," + y;
                for(z in TERRAIN){
                    dcomp = JSON.parse(TERRAIN[z]);
                    //var cncl = jQuery.inArray(comp, dcomp.Coord);
                    if(comp == dcomp.Coord){
                        obsname = dcomp.Obs;
                        if(obsname == "BrokenWall" || obsname == "Tree" || obsname == "River"){
                            GI.InstanceFindWay.setObstacle(x,y);
                        }
                    }
                }
                this.context.fillStyle    = '#000000';
                this.context.font         = 'Calibri 16px sans-serif';
                this.context.textBaseline = 'top';
                //this.context.fillText  (obsname, this.transferLogicToScreenX(x, y) - 10, this.transferLogicToScreenY(x, y) - 30);
                this.context.fillText  (obsname, this.transferLogicToScreenX(x+1, y+1) - 10, this.transferLogicToScreenY(x+1, y+1) - 30);
            }
        }

        for (var i = 1; i < this.GRIDQUANTITY; ++i) {
            // 0 , 1
            x = 0; y = i;
            this.context.beginPath();
            this.context.moveTo(this.transferLogicToScreenX(x, y), this.transferLogicToScreenY(x, y));
            // 16, 1
            x = this.GRIDQUANTITY; y = i;
            this.context.lineTo(this.transferLogicToScreenX(x, y), this.transferLogicToScreenY(x, y));
            this.context.closePath();
            this.context.stroke();
        }

        

        for (var i = 1; i < this.GRIDQUANTITY; ++i) {
            // 1 , 0
            x = i; y = 0;
            this.context.beginPath();
            this.context.moveTo(this.transferLogicToScreenX(x, y), this.transferLogicToScreenY(x, y));
            // 1, 16
            x = i; y = this.GRIDQUANTITY;
            this.context.lineTo(this.transferLogicToScreenX(x, y), this.transferLogicToScreenY(x, y));
            this.context.closePath();
            this.context.stroke();
        }
    }
});
