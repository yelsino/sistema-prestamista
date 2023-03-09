import { ICliente, ICodigoTemporal, IRespuesta, RegistroCliente } from "types-prestamista";
import Cliente from "../models/ClienteModel";
import { Respuesta } from "../models/Respuesta";
import logger from "../utils/logger";
import { DireccionService } from "./direccion.service";

export class ClienteService {

    direccion: DireccionService;
    constructor() {
        this.direccion = new DireccionService();
     }

    obtenerClientes = async (): Promise<IRespuesta<ICliente[]>> => {
        const respuesta = new Respuesta();
        try {
            const clientes = await Cliente.find().sort({ _id: -1 });
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

    crearCliente = async (cliente: RegistroCliente): Promise<IRespuesta<ICliente>> => {
        const respuesta = new Respuesta();
        try {
            if(!cliente) return { ...respuesta, code: 400, ok: false, data: null, mensaje: "SE NECESITAN DATOS" };
            const nuevoCliente = new Cliente(cliente);
            const clienteCreado = await nuevoCliente.save();

            await this.direccion.registrarDireccion({
                cliente: cliente.cliente,
                departamento: cliente.departamento,
                provincia: cliente.provincia,
                distrito: cliente.distrito,
                nombre: cliente.nombreDireccion,
                referencia: cliente.referencia,
            });

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
