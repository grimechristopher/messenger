import app from './app';
import socket from './socket';
import db from './models';
import MessageSocket from './sockets/message.socket';

const PORT = process.env.PORT || 3001;

db.sequelize.sync({ alter: true, })

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const io = socket.getInstance(server);

io.initializeSockets([
  { path: '/messages', handler: new MessageSocket()}
]);