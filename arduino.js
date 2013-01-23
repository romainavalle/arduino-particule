var five = require("johnny-five"),
    // or "./lib/johnny-five" when running from the source
    board = new five.Board(),

    io = require('socket.io').listen(8080),potValue;

board.on("ready", function() {
  var button = new five.Button(12);
  var potentiometer = new five.Sensor({
    pin: "A2",
    freq: 250
  });
  board.repl.inject({
    button: button,
    pot: potentiometer
  });

  button.on("down", function() {   
    board.emit('create');
  });

  button.on("up", function() {   
    board.emit('stop');
  });
  potentiometer.on("read", function( err, value ) {
    if(potValue != Math.floor(this.normalized )){
      potValue = Math.floor(this.normalized);
      board.emit('gravityChange',{grav: potValue});
    }
  });
  
});

io.sockets.on('connection', function (socket) {

  board.on('create', function(){
      socket.emit('create');
  });
  board.on('stop', function(){
      socket.emit('stop');
  });  
  board.on('gravityChange', function(obj){
      socket.emit('gravityChange',{grav:obj.grav});
  });  
});   
