var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var x = 0;



app.use(express.static(__dirname + '/public'));
io.on('connection', function(socket) {
    console.log((x = x + 1) + ' a user connected');

    socket.on('message', function(message) {
        console.log('Message received: ' + message.text);
        message.timestamp = moment().valueOf();
        io.emit('message', message);
    });

    socket.emit('message', {
        'text': 'Welcome to the chat application',
        'timeStamp': moment().valueOf()
    });
});

http.listen(PORT, function() {

    console.log('Server started!');
});