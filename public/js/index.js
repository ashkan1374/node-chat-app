let socket = io();

socket.on('connect', () => {
    console.log('Connected to server !');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server !');
});

socket.on('newMessage', (message) => {
    console.log('NewMessage : ',message);
});

socket.emit('createMessage',{
    from : "Frank",
    text : "Hi"
},(data)=>{
    console.log(data);
});