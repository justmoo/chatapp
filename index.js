var express = require('express');
var bodyParser = require('body-parser');
var socket =require('socket.io');
var port = process.env.PORT || 3000 ;
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/public/views');
app.set("view engine" , "ejs");
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.render('index'));

var server = app.listen(port, () => console.log(`Listening port ${port}!`));
var io = socket(server);
io.on("connection",function(socket){
  console.log('connection made', socket.id); 
  socket.on('chat',function(data){
    io.sockets.emit('chat',data);
  });
  socket.on("typing",function(data){
      socket.broadcast.emit('typing',data);
  });
});