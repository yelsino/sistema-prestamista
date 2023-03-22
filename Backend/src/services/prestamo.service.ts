import {  ICuota, IFormasPago, IPrestamo, IRespuesta } from "types-prestamista";
import Cliente from "../models/ClienteModel";
import Cuota from "../models/CuotaModel";
import FormaPago from "../models/FormaPagoModel";
import Prestamo from "../models/PrestamoModel";
import { Respuesta } from "../models/Respuesta";
import logger from "../utils/logger";
import { CuotaService } from "./cuota.service";
import * as fs from 'fs';
import * as path from 'path';
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
export class PrestamoService {

    cuotas: CuotaService;
    constructor() { 
        this.cuotas = new CuotaService();
    }

    obtenerPrestamos = async (): Promise<IRespuesta<IPrestamo[]>> => {
        const respuesta = new Respuesta();
        try {
            const prestamos = await Prestamo.find()
            .sort({ _id: -1 })
            .populate("cliente")
            .populate("agente")
            .populate("moneda");

            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: prestamos,
                mensaje: "PRESTAMOS OBTENIDOS",
            };
        } catch (error: any) {
            logger.info("ERROR AL OBTENER PRESTAMOS" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    }

    buscarPrestamos = async (termino: string): Promise<IRespuesta<IPrestamo[]>> => {
        const respuesta = new Respuesta();
        try {
            const prestamos = await Prestamo.find({
                $or: [
                    { cliente: termino },
                    { agente: termino },
                    { monto: termino },
                    { numeroCuotas: termino },
                    { fechaLimite: termino },
                    { fechaPago: termino },
                ],
            });
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: prestamos,
                mensaje: "PRESTAMOS OBTENIDOS",
            };
        } catch (error: any) {
            logger.info("ERROR AL OBTENER PRESTAMOS" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    }

    obtenerPrestamo = async (id: string): Promise<IRespuesta<IPrestamo>> => {
        const respuesta = new Respuesta();
        try {
            const prestamo = await Prestamo.findById(id)
            .populate("cliente")
            .populate("agente")
            .populate("moneda")
            .populate("formaPago");
            if (!prestamo) {
                return {
                    ...respuesta,
                    code: 404,
                    ok: false,
                    data: null,
                    mensaje: "PRESTAMO NO ENCONTRADO",
                };
            }
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: prestamo,
                mensaje: "PRESTAMO OBTENIDO",
            };
        } catch (error: any) {
            logger.info("ERROR AL OBTENER PRESTAMO" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    }

    obtenerCuotasPrestamo = async (id: string): Promise<IRespuesta<ICuota[]>> => {
        const respuesta = new Respuesta();
        try {
            const prestamo = await Prestamo.findById(id);
            if (!prestamo) {
                return {
                    ...respuesta,
                    code: 404,
                    ok: false,
                    data: null,
                    mensaje: "PRESTAMO NO ENCONTRADO",
                };
            }
            const cuotas = await Cuota.find({ prestamo: prestamo._id });
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: cuotas,
                mensaje: "CUOTAS OBTENIDAS",
            };
        } catch (error: any) {
            logger.info("ERROR AL OBTENER CUOTAS" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    }

    crearPrestamo = async (prestamo: IPrestamo): Promise<IRespuesta<IPrestamo>> => {
        const respuesta = new Respuesta();
        try {

            const cliente = await Cliente.findById(prestamo.cliente);
            if (!cliente) return { ...respuesta, code: 404, ok: false, data: null, mensaje: "CLIENTE NO ENCONTRADO" };

            const numeroPrestamo = await Prestamo.countDocuments();
            const prestamoCreado = await Prestamo.create({
                ...prestamo,
                estado: "PENDIENTE",
                numero: numeroPrestamo + 1,
            });
            await this.cuotas.crearCuotas(prestamoCreado);

            cliente.estado = "CON_PRESTAMO";
            await cliente.save();
            
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: prestamoCreado,
                mensaje: "PRESTAMO CREADO",
            };
        } catch (error: any) {
            logger.info("ERROR AL CREAR PRESTAMO " + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    }

    obtenerContratos = async (): Promise<IRespuesta<IPrestamo[]>> => {
        const respuesta = new Respuesta();
        try {
            const prestamos = await Prestamo.find({ fechaPago: null });
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: prestamos,
                mensaje: "PRESTAMOS OBTENIDOS",
            };
        } catch (error: any) {
            logger.info("ERROR AL OBTENER PRESTAMOS" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    };

    pagarCuotas = async (cuotas: ICuota[]): Promise<IRespuesta<ICuota[]>> => {
        const respuesta = new Respuesta();
        try {
            const cuotasPagadas=  await this.cuotas.pagarCuotas(cuotas);
            return cuotasPagadas
        } catch (error) {
            console.log(error);
            return { ...respuesta, code: 500, ok: false, data: null };
            
        }
    };

    cancelarPago = async (cuota: ICuota): Promise<IRespuesta<ICuota>> => {
        const respuesta = new Respuesta();
        try {
            const cuotaCancelada = await this.cuotas.cancelarPagoCuota(cuota);
            return cuotaCancelada
        } catch (error) {
            console.log(error);
            return { ...respuesta, code: 500, ok: false, data: null };
            
        }
    };

    obtenerFormasPago = async (): Promise<IRespuesta<IFormasPago[]>> => {
        const respuesta = new Respuesta();
        try {
            const formasPago = await FormaPago.find();
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: formasPago,
                mensaje: "FORMAS DE PAGO OBTENIDAS",
            };
        } catch (error: any) {
            logger.info("ERROR AL OBTENER FORMAS DE PAGO" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    
    };

    generarContrato = async () => {
        // Cargar la plantilla del contrato
        // Load the docx file as binary content
        const respuesta = new Respuesta();
        const ubicacion = path.join(__dirname, '..', 'public', 'ContratoTemplate.docx');
        console.log(ubicacion);
        
        const content = fs.readFileSync(ubicacion, 'binary');
        // const content = fs.readFileSync(path.join(__dirname, '..', 'public', 'ContratoTemplate.docx'), 'binary');
        
        const zip = new PizZip(content);
        
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
        doc.render({
            nombrePrestamista: 'Yelsin Pablo Caso Alanya',
            direccionPrestamista: 'Jr. Los Alamos 123',
            nombrePrestatario: 'Juan Gabriel Perez Ramos',
            direccionPrestatario: 'Jr primavera 1555',
            montoPrestado: 5000,
            fechaLimiteDias: 255,
            porcentajePrestamo: 10,
            formaPago: 'QUINCENAL',
            garantia: 'TERRENO 255 M2',
        });

        const buf = doc.getZip().generate({
            type: "nodebuffer",
            // compression: DEFLATE adds a compression step.
            // For a 50MB output document, expect 500ms additional CPU time
            compression: "DEFLATE",
        });

        fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);

        return respuesta;

    }
   
}
