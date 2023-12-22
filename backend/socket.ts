import { Server } from 'socket.io';

class Socket extends Server {
  private static io: Socket;

  constructor(server: Object) {
    super(server, {
      cors: {
        origin: "http://localhost:8080",// Needs to be updated
        methods: ["GET", "POST"],
        credentials: true
      }
    });
  }

  public static getInstance(server: Object): Socket {
    if (!Socket.io) {
      Socket.io = new Socket(server);
    }

    Socket.io.on('connection', (socket) => {
      socket.on('world', () => {
        console.log("WOOOOOOOOOO")
      });
    });

    return Socket.io;
  }

  public initializeSockets(sockets: Array<any>) {
    console.log("sockets: ", sockets)
    sockets.forEach((socket) => {
      if (socket.handler.instanceMethods) {
        Socket.io.use(socket.handler.instanceMethods)
      }
    });
  }
}

export default Socket;
