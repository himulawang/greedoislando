var GI_MAP_WIDTH = 6240;
var GI_MAP_HEIGHT = 3360;
var GI_GRID_QUANTITY = 480;
var GI_CHARACTER_SPEED = 100;

var GI_TERRAIN_DEFINE = {
    2000 : 'Plain'
    ,2001 : 'BrokenWall'
    ,2002 : 'Tree'
    ,2003 : 'Door'
    ,2004 : 'River'
    ,2005 : 'Ruins'
    ,2006 : 'Bridge'
};

var GI;

$(function(){
    GI = new Init;
    document.body.scrollLeft = GI_MAP_WIDTH / 3;
});
