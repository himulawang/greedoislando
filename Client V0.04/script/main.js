var GI_MAP_WIDTH = 1248;
var GI_MAP_HEIGHT = 672;
var GI_GRID_QUANTITY = 96;
var GI_CHARACTER_SPEED = 120;
var wsocket;

var requestAnimationFrame = webkitRequestAnimationFrame;
var cancelRequestAnimationFrame = webkitCancelRequestAnimationFrame;

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
    wsocket = new WsConnect;
    GI = new Init;
});


