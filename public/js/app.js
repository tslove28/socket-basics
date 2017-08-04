var socket = io();
var now = moment();

socket.on('connect', function() {
    console.log('connected');
});

socket.on('message', function(message) {
    var timeStampMoment = moment.utc(message.timeStamp);
    console.log('New Message:');
    console.log(message.text);
    jQuery('.messages').append('<p><strong>' + timeStampMoment.local().format('h:mm a') + '</strong>' + ': ' + message.text + '</p>'); //moment.format added
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    event.preventDefault();
    var $message = $form.find('input[name=message]');
    socket.emit('message', {
        text: $message.val()
    });
    $message.val('');
    // document.getElementById('message').value = "";
});