var socket = io.connect();

$(document).ready(function() {

    var canvas = new fabric.Canvas('sheet');


    // TODO: ADD SUPPORT FOR RESIZING. THE DOODLE SHOULD NOT DISAPPEAR WHEN THE BROWSER IS RESIZED
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    socket.on("drawPath", function(path) {
        drawPath(canvas, path);
    });
});

// HELPER FUNCTIONS

function setUpCanvas(canvas) {
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 2;
    canvas.freeDrawingBrush.color = "#ff0000";
    canvas.on('path:created', function(e) {
        drawPathHandler(e)
    });
}

function resizeCanvas() {
    var canvas = new fabric.Canvas('sheet');

    setUpCanvas(canvas);
    canvas.setHeight(window.innerHeight);
    canvas.setWidth(window.innerWidth);
    canvas.renderAll();
}

function drawPathHandler(e) {
    console.log("path drawn!");
    socket.emit("drawPath", e.path.toJSON());
}

function drawPath(canvas, path) {
    fabric.util.enlivenObjects([path], function(objects) {
        objects.forEach(function(o) {
            canvas.add(o);
        });
    });
}