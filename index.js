var express = require('express');
var app = express();
var http = require('http').Server(app);
var socket = require('socket.io');
var io = socket(http);
var dgram = require('dgram');
var udp = dgram.createSocket('udp4');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/colors.html');
});
io.on('connection', function(socket){
	console.log('a user connected');
});
http.listen(3000, function(){
	console.log('listening on 3000');
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

udp.on('error', function(err){
	console.log("server error:\n" + err.stack)
	udp.close();
});

udp.on("message", function(msg, rinfo){
	console.log("server got " + msg + " from " + rinfo.address + ":" + rinfo.port);
});

udp.on('listening', function () {
	var address = udp.address();
	console.log('server listening ' + address.address + ":" + address.port);
});

udp.bind(41234);
