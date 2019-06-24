let socket = io();


function scrollToBottom(){
    let messages=jQuery('#messages');
    let newMessage = messages.children('li:last-child');
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', () => {
    console.log('Connected to server !');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server !');
});

socket.on('newMessage', (message) => {
    let formattedTime = moment(message.createAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', (message) => {
    let formattedTime = moment(message.createAt).format('h:mm a');
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.emit('createMessage', {
    from: "Frank",
    text: "Hi"
}, (data) => {
    console.log(data);
});

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();

    let messageTexbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTexbox.val()
    }, () => {
        messageTexbox.val('');
    });

});

let locationButton = jQuery('#send-location');

locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by youe browser !');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location ...');

    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr('disabled').text('send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        locationButton.removeAttr('disabled').text('send Location');
        alert('Unable to fetch location !');
    });

});

