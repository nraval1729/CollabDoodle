// Basic requirements
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// Templating set up
var engines = require('consolidate');
app.engine('html', engines.hogan);
app.set('views', __dirname + '/public/templates');
app.set('view engine', 'html');

// Find static files in the public directory
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
	console.log("Rendering the home page now");
	res.render("index.html")
});

io.sockets.on('connection', function(socket){
	console.log("A client joined!");

	// If we receive a drawPath event, broadcast it to everyone except sender
	socket.on("drawPath", function(path) {
		socket.broadcast.emit("drawPath", path);
	});
});

// server.listen(8080);
console.log("Server started. Listening.");