var turnRed = function() {
    
}

var tempText;
$().ready(function(){

var getSelection = function(){
    var selection = document.getSelection();
    var pos = selection.focusOffset;

    var allDiv = $("#edit-area").children("div");
    var lineNode = selection.focusNode instanceof Text ? $(selection.focusNode).parent() : $(selection.focusNode);
    var index = allDiv.index(lineNode);
    return {pos : pos, line : index, div : lineNode};
}


$("#edit-area").keyup(function(e){
    var selection = getSelection();
    $("#log").prepend("<div>Line:" + selection.line + " Pos:" + selection.pos + "</div>");

    if (e.keyCode === 13) {
        $(selection.div).addClass("line").bind("change",function(e){
            console.log(1);
        });
    }
});


});


