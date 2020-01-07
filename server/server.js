const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', client => {
  client.on('host', data => {
    io.emit('host', 'world');
  });
  client.on('disconnect', () => {
    console.log('lost')
  });
});
server.listen(931);