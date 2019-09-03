const io = require('socket.io')(4000);

io.on('connection', (socket) => {
    console.log('hey')

    socket.on('message', () => {
        socket.send('yo')
    })
});

io.on('message', (data) => {
    console.log(data)
});