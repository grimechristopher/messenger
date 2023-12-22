import { Socket } from "socket.io";
import SocketInterface from "../interfaces/socketInterface";

class MessageSocket implements SocketInterface {

    instanceMethods(socket: Socket, next: any) {
        socket.on('hello', () => {
            console.log("WORLD ")
        });

        return next();
    }
}

export default MessageSocket;
