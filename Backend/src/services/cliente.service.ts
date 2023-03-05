import { ICliente, ICodigoTemporal, IRespuesta } from "types-prestamista";
import Cliente from "../models/ClienteModel";
import { Respuesta } from "../models/Respuesta";
import logger from "../utils/logger";

export class ClienteService {

    obtenerClientes = async (): Promise<IRespuesta<ICliente[]>> => {
        const respuesta = new Respuesta();
        try {
            const clientes = await Cliente.find();
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: clientes,
                mensaje: "CLIENTES OBTENIDOS",
            };
        } catch (error: any) {
            logger.info("ERROR AL OBTENER DIRECCIONES" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    };

    crearCliente = async (cliente: ICliente): Promise<IRespuesta<ICliente>> => {
        const respuesta = new Respuesta();
        try {
            const nuevoCliente = new Cliente(cliente);
            const clienteCreado = await nuevoCliente.save();
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: clienteCreado,
                mensaje: "CLIENTE CREADO",
            };
        } catch (error: any) {
            logger.info("ERROR AL CREAR CLIENTE" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    };
}
