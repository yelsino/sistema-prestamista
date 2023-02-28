import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import { Cantidad } from "types-yola";
import { AuthService } from "./services/auth.service";
import { DireccionService } from "./services/direccion.service";
import { UsuarioService } from "./services/usuario.service";
import { verifyToken } from "./utils";
import logger from "./utils/logger";
// import { verifyToken } from "./utils";
// import logger from "./utils/logger";

const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
    UPDATE_USER_LIST: "UPDATE_USER_LIST",
    EVENTO_PRODUCTOS: "EVENTO_PRODUCTOS",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
    GET_ALL_PRODUCTS: "GET_ALL_PRODUCTS",
    GET_USER_LISTS: "GET_USER_LISTS",
    GET_ALL_ORDERS: "GET_ALL_ORDERS",
    GET_USER_DIRECTIONS: "GET_USER_DIRECTIONS",
    RETORN_LIST_SELECTED: "RETORN_LIST_SELECTED",
    GET_CATEGORIES: "GET_CATEGORIES",
    GET_ROLS: "GET_ROLS",
  },
};

type EventLists = 
  | 'ADD_PRODUCT_TO_LIST'
  
  | 'REMOVE_PRODUCT_OF_LIST'
  | 'REMOVE_WEIGHT_OF_PRODUCT'
  | 'CREATE_LIST'
  | 'DELETE_LIST'


interface Payload <DATA, EVENTO> {
  data: DATA;
  evento: EVENTO;
}

interface DataEventList {
  listaId: string;
  productoId: string;
  cantidad: Cantidad;
}


type Eventos = | 'get-products' | 'get-user-lists'
type EventProducts = 
  | 'obtener-productos' 
  | 'crear-producto'

const rooms: Record<string, { name: string }> = {};
const authService = new AuthService();
const direccionService = new DireccionService();
const usuarioService = new UsuarioService();

function socket({ io }: { io: Server }) {
  // logger.info(`Sockets enabled`);

  io.on(EVENTS.connection, async (socket: Socket ) => {
    
    const {id}: any = verifyToken(socket.handshake.query['x-token'] as string)
    
    // si token no es valido desconectar
    if(!id) return socket.disconnect()
    logger.info(`User connected ${id}`);


    // unir usuario al socket
    await authService.usuarioConectado(id);
    socket.join(id);
    const {data: usuario} = await usuarioService.obtenerUsuario(id);

    // emitir eventos de incio
    socket.emit(EVENTS.SERVER.GET_USER_DIRECTIONS, await direccionService.obtenerDireccionesUsuario(id));
    socket.emit(EVENTS.SERVER.GET_ROLS, await usuarioService.obtenerRoles());


    socket.emit(EVENTS.SERVER.ROOMS, rooms);



    socket.on('EVENTO_PRODUCTOS', async (payload: Payload<string, Eventos>) => {
      switch (payload.evento) {
        // case ''
          
          // break;
      
        default:
          break;
      }

    })

    socket.on(
      EVENTS.CLIENT.SEND_ROOM_MESSAGE,
      ({ roomId, message, username }) => {
        const date = new Date();

        socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
          message,
          username,
          time: `${date.getHours()}:${date.getMinutes()}`,
        });
      }
    );

    /*
     * Cuando un usuario de desconecta
     */
    socket.on("disconnect", async () => {
      await authService.usuarioDesconectado(id);
      logger.info(`User disconnected: `+ id);
    });
  });
}

export default socket;
