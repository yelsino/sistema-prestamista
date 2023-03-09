import {  ICuota, IPrestamo, IRespuesta } from "types-prestamista";
import Cuota from "../models/CuotaModel";
import Prestamo from "../models/PrestamoModel";
import { Respuesta } from "../models/Respuesta";
import logger from "../utils/logger";
import { CuotaService } from "./cuota.service";

export class PrestamoService {

    cuotas: CuotaService;
    constructor() { 
        this.cuotas = new CuotaService();
    }

    obtenerPrestamos = async (): Promise<IRespuesta<IPrestamo[]>> => {
        const respuesta = new Respuesta();
        try {
            const prestamos = await Prestamo.find();
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
            .populate("agente");
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
            const nuevoPrestamo = new Prestamo(prestamo);
            const prestamoCreado = await nuevoPrestamo.save();
            await this.cuotas.crearCuotas(prestamoCreado);
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: prestamoCreado,
                mensaje: "PRESTAMO CREADO",
            };
        } catch (error: any) {
            logger.info("ERROR AL CREAR PRESTAMO" + error.message);
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

   
}
