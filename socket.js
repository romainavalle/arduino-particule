function initSocket() {
  //listen
  var socket = io.connect('http://localhost', {port: 8080});

  socket.on('create', function(e){
     _isMouseDown = true;
  });
  socket.on('stop', function(e){
     _isMouseDown = false;
  });
  socket.on('gravityChange', function(e){
     _gravity = e.grav/255;
  });
}