/*var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8081;

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/index', function (req, res) {
    res.render('pages/index');
});
app.get('/controllers', function (req, res) {
    res.render('pages/controller');
});

io.on('connection', function (socket) {
    socket.on('comand_i', function (data) {
        data.socket_id = socket.id;
        socket.broadcast.emit('comand_o', data);
    });

    socket.on('disconnect', function(){
        socket.broadcast.emit('comand_o', {
            socket_id: socket.id,
            command: 'delete'
        });
    });
});

server.listen(port, function () {
    console.log(`App listening on port ${port}`);
});*/

var express = require("express");
var err = express();
var app = require('http').createServer(err);
var io = require('socket.io')(app);
var fs = require('fs');

var port = process.env.PORT || 5000;
app.listen(port,function() {
  console.log("Listening on " + port);
});

err.set('views', __dirname + '/views');
err.set('view engine', 'ejs');

err.get('/index', function (req, res) {
    res.render('pages/index');
});
err.get('/controllers', function (req, res) {
    res.render('pages/controller');
});

function handler (req, res) {
  fs.readFile(__dirname + '/views/pages/index.ejs',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    //da = data;
    res.writeHead(200);
    res.end(data);
  });
  }
 
io.on('connection', function (socket) {
  socket.on('comand_i', function (data) {
        data.socket_id = socket.id;
        socket.broadcast.emit('comand_o', data);
    });

    socket.on('disconnect', function(){
        socket.broadcast.emit('comand_o', {
            socket_id: socket.id,
            command: 'delete'
        });
    });
});