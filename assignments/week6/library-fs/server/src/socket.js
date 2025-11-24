const { Server } = require('socket.io');


function setupSocket(httpServer) {
const io = new Server(httpServer, { cors: { origin: '*' } });


io.on('connection', (socket) => {
// Expect the client to send its userId right after connect
socket.on('hello', ({ userId }) => {
if (!userId) return;
socket.join(`user:${userId}`);
socket.emit('ready', { ok: true });
});


// Simple ping/pong
socket.on('ping', () => socket.emit('pong'));
});


return io;
}


module.exports = { setupSocket };