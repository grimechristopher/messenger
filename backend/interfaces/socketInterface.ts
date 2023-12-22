import { Socket } from "socket.io";

interface SocketInterface {
   instanceMethods(socket: Socket, next: any): void;
}

export default SocketInterface;