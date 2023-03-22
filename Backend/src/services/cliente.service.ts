import { ICliente, ICodigoTemporal, IRespuesta, RegistroCliente } from "types-prestamista";
import { IClienteDetalle } from "types-prestamista/dist/interfaces/cliente.interface";
import Cliente from "../models/ClienteModel";
import Prestamo from "../models/PrestamoModel";
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



    obtenerDetalleCliente = async (cliente: string): Promise<IRespuesta<IClienteDetalle>> => {
        const respuesta = new Respuesta();

        try {
            const clienteBD = await Cliente.findById(cliente)
                .lean()
                .populate('agente')
                .populate({
                    path: 'direccion',
                    populate: [
                      { path: 'departamento' },
                      { path: 'provincia' },
                      { path: 'distrito' }
                    ]
                  })

            if(!cliente) return { ...respuesta, code: 400, ok: false, data: null, mensaje: "NO SE ENCONTRÓ AL CLIENTE" };

            const prestamos = await Prestamo.find({ cliente: cliente})

            const clienteDetalle: IClienteDetalle = {
                ...clienteBD,
                prestamos: prestamos,
            }
        
        return {
            ...respuesta,
            code: 200,
            ok: true,
            data: clienteDetalle,
        }

        } catch (error) {
            logger.info("ERROR AL OBTENER DETALLE DE CLIENTE" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null, mensaje: error.message };
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


    actualizarCliente = async (cliente: RegistroCliente): Promise<IRespuesta<ICliente>> => {
        const respuesta = new Respuesta();
        try {
            if(!cliente) return { ...respuesta, code: 400, ok: false, data: null, mensaje: "SE NECESITAN DATOS" };
           

            const direccionActualizada = await this.direccion.actualizarDireccion({
                _id: cliente.direccion as any,
                departamento: cliente.departamento,
                provincia: cliente.provincia,
                distrito: cliente.distrito,
                nombre: cliente.nombreDireccion,
                referencia: cliente.referencia,
            });

            const clienteActualizado = await Cliente.findByIdAndUpdate(cliente._id, {
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
                direccion: direccionActualizada._id,
            }, { new: true }); 

            

            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: clienteActualizado,
                mensaje: "CLIENTE ACTUALZIADO",
            };
        } catch (error: any) {
            logger.info("ERROR AL CREAR CLIENTE" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null, mensaje: error.message };
        }
    };

    buscarClientes = async (termino: string): Promise<IRespuesta<ICliente[]>> => {
        const respuesta = new Respuesta();
        try {
            const clientes = await Cliente.find({
                $or: [
                    { cliente: { $regex: termino, $options: 'i' } },
                    { nombre: { $regex: termino, $options: 'i' } },
                    { apellido: { $regex: termino, $options: 'i' } },
                    { documento: { $regex: termino, $options: 'i' } },
                    { telefono: { $regex: termino, $options: 'i' } },
                    { correo: { $regex: termino, $options: 'i' } },
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
