import { Socket } from "socket.io";

interface SocketInterface {
   instanceMethods(socket: Socket): void;
}

export default SocketInterface;