var GI_MAP_WIDTH = 1248;
var GI_MAP_HEIGHT = 672;
var GI_GRID_QUANTITY = 16;
var TERRAIN = [];

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
   new WsConnect;

   /*$(".pickchar").click(function(){
        GI_PLAYER = $(this).html();
        if(GI_PLAYER){
            $("#login").fadeOut(100,function(){
                $("#main").fadeIn(100,function(){
                    var GI = new Init;
                });
            });
        }
        return false;
   }); */
    GI = new Init;
});


