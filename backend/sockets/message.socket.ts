import { Socket } from "socket.io";
import SocketInterface from "../interfaces/socketInterface";

class OrdersSocket implements SocketInterface {

   instanceMethods(socket: Socket) {

        socket.emit('connected');

    }
}

export default OrdersSocket;
