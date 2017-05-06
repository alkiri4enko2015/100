var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

var express = require("express");
var err = express();

var port = process.env.PORT || 5000;
app.listen(port,function() {
  console.log("Listening on " + port);
});

function handler (req, res) {
  fs.readFile(__dirname + '/public/index.html',
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
  console.log('client connect');
  socket.on('my other event', function (data) {
 		socket.emit('news', data);
  });
});

/*err.use(express.static(__dirname + "/public"));

err.get("/", function(request, response){   
    	//response.end(__dirname+'/public/index.html');
    });

var port = process.env.PORT || 5000;
err.listen(port, function() {
  console.log("Listening on " + port);
});*/