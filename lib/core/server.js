'use strict';

const
    db = require('./db');

const
    app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(3000);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

async function mouseHandler(data) {
    db.query(`INSERT INTO coordinates (x,y) VALUES (${data.x}, ${data.y})`);
    console.log(data);
}


io.sockets.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('mouse', mouseHandler);
});
