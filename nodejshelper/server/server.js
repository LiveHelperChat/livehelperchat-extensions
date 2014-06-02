var http = require('http').createServer(handler)
   , config = require('./settings'); 
   
var io = require(config.socketiopath).listen(http).set('log level', 1);

io.enable('browser client minification');  // send minified client
io.enable('browser client etag');          // apply etag caching logic based on version number
io.enable('browser client gzip');          // gzip the file

// enable all transports (optional if you want flashsocket support, please note that some hosting
// providers do not allow you to create servers that listen on a port different than 80 or their
// default port)
io.set('transports', [
    'websocket'
  , 'xhr-polling'
  , 'jsonp-polling'
]);

http.listen(config.web.port,config.web.host);
console.log('LHC Server listening on '+config.web.host+':'+config.web.port);

function handler(req, res) {
  res.writeHead(200);
  res.end();
}

io.sockets.on('connection', function (socket) {

  socket.on('newmessage', function (data) {
  		if (config.debug.output == true) {
  			console.log('newmessage:'+data.chat_id); 	
  		};
  		if (data.data.message_id != "0"){
  			socket.broadcast.to('chat_room_'+data.chat_id).emit('newmessage', data);
    	};
  });
  
  socket.on('userpostedmessage', function (data) {
	  if (config.debug.output == true) {
		  console.log('userpostedmessage:'+data.chat_id); 	
	  };  		
	  socket.broadcast.to('chat_room_'+data.chat_id).emit('userpostedmessage', data);    	
  });
  
  socket.on('userstartedpostmessage', function (data) {
		if (config.debug.output == true) {
			console.log('userstartedpostmessage:'+data.chat_id); 	
		};  		
		socket.broadcast.to('chat_room_'+data.chat_id).emit('userstartedpostmessage', data);    	
  });
  
  socket.on('usertyping', function (data) {
  		if (config.debug.output == true) {
  			console.log('usertyping:'+data.chat_id+'-'+data.status); 
  		};	
    	socket.broadcast.to('chat_room_'+data.chat_id).emit('usertyping', data)
  });

  socket.on('operatortyping', function (data) {
  		if (config.debug.output == true) {
  			console.log('operatortyping:'+data.chat_id+'-'+data.status);
  		}; 	
    	socket.broadcast.to('chat_room_'+data.chat_id).emit('operatortyping', data)
  });

  socket.on('userleftchat', function (chat_id) {
  		if (config.debug.output == true) {
  			console.log('userleftchat:'+chat_id);
  		}; 	
    	socket.broadcast.to('chat_room_'+chat_id).emit('userleftchat', chat_id);
  });

  socket.on('join', function (chat_id) {
  		if (config.debug.output == true) {
  			console.log('join:'+chat_id);  
  		};		
  		socket.join('chat_room_'+chat_id);
  		socket.broadcast.to('chat_room_'+chat_id).emit('userjoined', chat_id);
  });

  socket.on('leave', function (chat_id) {
  		if (config.debug.output == true) {
  			console.log('leave:'+chat_id);
  		};
  		socket.leave('chat_room_'+chat_id);
  });
  
  socket.on('syncforce', function (chat_id) { 
  		if (config.debug.output == true) {
  			console.log('syncforce:'+chat_id); 	
  		};
    	socket.broadcast.to('chat_room_'+chat_id).emit('syncforce', chat_id)
  });  
});