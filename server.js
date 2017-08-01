var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var x = 0;


app.use(express.static(__dirname + '/public'));

// io.on('connection', function(socket) {
//     console.log('User connected via socket.io');
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', function(data) {
//         console.log(data);
//     });
// });

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/public/index.html');
// });

io.on('connection', function(socket) {
    console.log((x = x + 1) + ' a user connected');

    socket.on('message', function(message) {
        console.log('Message received: ' + message.text);
        socket.broadcast.emit('message', message);
    });

    socket.emit('message', {
        'text': 'Welcome to the chat application'
    });
});

http.listen(PORT, function() {

    console.log('Server started!');
});