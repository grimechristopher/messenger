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

    return Socket.io;
  }
}

export default Socket;
