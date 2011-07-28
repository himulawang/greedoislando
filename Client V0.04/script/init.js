var global = {};

var requestAnimationFrame = webkitRequestAnimationFrame;
var cancelRequestAnimationFrame = webkitCancelRequestAnimationFrame;

var ws;
var GI;

document.addEventListener("DOMContentLoaded", function() {
    GI = new World();
    GI.initLogin();
}, false);
