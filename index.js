var app = require('http').createServer(handler);
var io = require('socket.io')(4001);
var fs = require('fs');
var dgram = require('dgram');
var udp = dgram.createSocket('udp4');
var randomcolor = require('randomcolor');

app.listen(4000);

function handler (req, res) {
	fs.readFile(__dirname + '/colors.html', 
	function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading colors.html');
		}
		res.writeHead(200);
		res.end(data);
	});
}

io.on('connection', function(socket){
	console.log('a user connected');
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

udp.on('error', function(err){
	console.log("server error:\n" + err.stack)
	udp.close();
});

udp.on("message", function(msg, rinfo){
	console.log("server got " + msg + " from " + rinfo.address + ":" + rinfo.port);
	io.sockets.emit("color", {color: randomcolor.randomColor()});
});

udp.on('listening', function () {
	var address = udp.address();
	console.log('server listening ' + address.address + ":" + address.port);
});

udp.bind(41234);
