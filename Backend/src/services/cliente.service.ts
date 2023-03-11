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

    obtenerCliente = async (cliente: string): Promise<IRespuesta<ICliente>> => {
        const respuesta = new Respuesta();
        try {
            const resultado = await Cliente.findById(cliente);
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: resultado,
            };
                        
        } catch (error) {
            console.log(error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    }

    crearCliente = async (cliente: RegistroCliente): Promise<IRespuesta<ICliente>> => {
        const respuesta = new Respuesta();
        try {
            if(!cliente) return { ...respuesta, code: 400, ok: false, data: null, mensaje: "SE NECESITAN DATOS" };
           

            const direccionGenerada = await this.direccion.registrarDireccion({
                departamento: cliente.departamento,
                provincia: cliente.provincia,
                distrito: cliente.distrito,
                nombre: cliente.nombreDireccion,
                referencia: cliente.referencia,
            });

            const nuevoCliente = new Cliente({
                nombres: cliente.nombres,
                apellidos: cliente.apellidos,
                documento: cliente.documento,
                genero: cliente.genero,
                celular: cliente.celular,
                telefono: cliente.telefono,
                correo: cliente.correo,
                empresa: cliente.empresa,
                ruc: cliente.ruc,
                razonSocial: cliente.razonSocial,
                estado: cliente.estado,
                agente: cliente.agente,
                direccion: direccionGenerada._id,
            });
            
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

    buscarClientes = async (termino: string): Promise<IRespuesta<ICliente[]>> => {
        const respuesta = new Respuesta();
        try {
            const clientes = await Cliente.find({
                $or: [
                    { cliente: termino },
                    { nombre: termino },
                    { apellido: termino },
                    { documento: termino },
                    { telefono: termino },
                    { correo: termino },
                ],
            });
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: clientes,
                mensaje: "CLIENTES OBTENIDOS",
            };
        } catch (error: any) {
            logger.info("ERROR AL OBTENER CLIENTES" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    }

}
