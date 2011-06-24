var GI_MAP_WIDTH = 12480;
var GI_MAP_HEIGHT = 6720;
var GI_GRID_QUANTITY = 960;
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
    window.scrollX = GI_MAP_WIDTH / 2;
});
