var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'General';
var socket = io();

console.log(name + ' joined ' + room);

socket.on('connect', function() {
    console.log('connected');
});

socket.on('message', function(message) {
    var momentTimeStamp = moment.utc(message.timeStamp);
    var $message = jQuery('.messages');
    console.log('New Message:');
    console.log(message.text);

    $message.append('<p><strong>' + message.name + ' ' + momentTimeStamp.local().format('h:mm a') + '</strong></p>');
    $message.append('<p>' + message.text + '</p');

});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    event.preventDefault();

    var $message = $form.find('input[name=message]');

    socket.emit('message', {
        name: name,
        text: $message.val()
    });

    $message.val('');
    // document.getElementById('message').value = "";
});