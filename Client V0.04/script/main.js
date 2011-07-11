var GI_MAP_WIDTH = 760;
var GI_MAP_HEIGHT = 600;
var GI_GRID_QUANTITY = 96;
var GI_CHARACTER_SPEED = 120;
var GI_CURSOR_WIDTH = 13;
var GI_CURSOR_HEIGHT = 7;
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
var log;
$(function(){
    GI = new Init;
    wsocket = new WsConnect;
});


