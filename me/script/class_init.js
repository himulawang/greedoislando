var Init = Class.extend({
    init : function() {
        this.initCursor();
        this.initMapEditor();
        this.initFixFrame();
        //this.disableContextMenu();
        this.bindArrowKey();
        this.bindMouseOverGrid();
        this.bindMouseClick();
        this.bindMouseDrag();
    }
    ,initFixFrame : function() {
        var c = document.createElement("div");
        c.id = "fixed-pop";
        c.textContent = this.editor.DEFINE[this.editor.terrainType].name;
        document.body.appendChild(c);
    }
    /* Event Listener */
    ,disableContextMenu : function() {
        document.oncontextmenu = function(e) {
            return false;
        }
    }
    ,bindMouseDrag : function() {
        var _this = this;

        document.onmousedown = function(e) {
            _this.startPointX = e.screenX;
            _this.startPointY = e.screenY;
            _this.dragTrigger = 1;
        }

        document.onmousemove = function(e) {
            if (_this.dragTrigger === 1){       
                var scrollX = _this.startPointX - e.screenX;
                var scrollY = _this.startPointY - e.screenY;              
                document.body.scrollLeft += scrollX;
                document.body.scrollTop += scrollY;
                _this.startPointX = e.screenX;
                _this.startPointY = e.screenY;
            }
        }

        document.onmouseup = function(e) {
            _this.dragTrigger = 0;
            _this.startPointX = null;
            _this.startPointY = null;
        }
    }
    ,bindArrowKey : function() {
        var _this = this;
        document.onkeydown = function(e) {
            if (e.which === 38) { //UP
                _this.cursor.moveUp();
            } else if (e.which === 40) { //Down
                _this.cursor.moveDown();
            } else if (e.which === 37) { //Left
                _this.cursor.moveLeft();
            } else if (e.which === 39) { //Right
                _this.cursor.moveRight();
            } else if (e.which == 27) {
                $("#terrain-menu").remove();
            }
            _this.cursor.put();
            $('#output').html("LogicX:" + _this.cursor.x + " LogicY:" + _this.cursor.y);
            return false;
        };
    }
    ,bindMouseOverGrid : function() {
        var _this = this;
        $("#grid")[0].onmousemove = function(e) {
            _this.cursor.move(e);
            $('#mouseevent').html("ScreenX:" + e.layerX + " ScreenY:" + e.layerY);
            $('#output').html("LogicX:" + _this.cursor.x + " LogicY:" + _this.cursor.y);
            return false;
        };
    }
    ,bindMouseClick : function() {
        var _this = this;
        
        $('.terrainClass').live('click',function(){
            _this.editor.terrainType = this.id;
            document.getElementById("fixed-pop").textContent = _this.editor.DEFINE[_this.editor.terrainType].name;
            $('#terrain-menu').remove();
        });

        $('#grid')[0].ondblclick = function(e) {
            var xPX = e.layerX;
            var yPX = e.layerY;
            var x = _this.editor.transferScreenToLogicX(xPX, yPX);
            var y = _this.editor.transferScreenToLogicY(xPX, yPX);
            if (e.which === 1) {
                if (x >= GI_GRID_QUANTITY || y >= GI_GRID_QUANTITY || x < 0 || y < 0) return false;
                _this.editor.click(x, y);
            }
            return false;
        }

        document.oncontextmenu = function(e) {
            _this.showTerrainMenu(e);
            return false;
        }
    }
    ,showTerrainMenu : function(e) {
        if($("#terrain-menu")) $("#terrain-menu").remove();
        var c = document.createElement("div");
        var ol = document.createElement("ol");
        var li;
        c.id = "terrain-menu";
        for (var x in this.editor.DEFINE) {
            li = document.createElement("li");
            li.id = x;
            li.className = "terrainClass";
            li.textContent = this.editor.DEFINE[x].name;
            ol.appendChild(li);
        }
        c.appendChild(ol);
        document.body.appendChild(c);
        c.style.position = "absolute";
        c.style.left = e.layerX + "px";
        c.style.top = e.layerY + "px";
    }
    /* Draw Basic Element */
    ,initMap : function(data) {
        this.map = new Map();
        this.map.getCanvas($('#grid')[0]);
        this.map.getData();
        this.map.draw();
    }
    ,initCursor : function() {
        this.cursor = new Cursor();
        this.cursor.getCanvas($('#cursor')[0]);
        this.cursor.draw();
        this.cursor.startBreath();
    }
    ,initShowWay : function() {
        this.showWayCursor = new Cursor();
        this.showWayCursor.getCanvas($('#show-way-cursor')[0]);
        this.showWayCursor.draw();
        this.showWayCursor.startBreath();
    }
    ,initMapEditor : function(){
        this.editor = new MapEditor;
    }
});

