var ws = $.websocket("ws://localhost:12345/",{
    open: function(){
        $("#output").html("Open");
    },
    close: function(){
        $("#output").html("Close");
    },
    events: {
        
    }

});



