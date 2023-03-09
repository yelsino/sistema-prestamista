import {  ICliente, ICuota, IPrestamo, IRespuesta } from "types-prestamista";
import Cliente from "../models/ClienteModel";
import Cuota from "../models/CuotaModel";
import Prestamo from "../models/PrestamoModel";
import { Respuesta } from "../models/Respuesta";
import logger from "../utils/logger";

export class ReporteService {

   
    reporteClientes = async (): Promise<IRespuesta<ICliente[]>> => {
        const respuesta = new Respuesta();
        try {
            const clientes = await Cliente.find().lean();
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: clientes,
                mensaje: "MONEDAS OBTENIDAS",
            };
        } catch (error: any) {
            logger.info("ERROR AL OBTENER MONEDAS" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    }

    reporteAgentes = async (): Promise<IRespuesta<ICliente[]>> => {
        const respuesta = new Respuesta();
        try {
            const clientes = await Cliente.find().lean();
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: clientes,
                mensaje: "MONEDAS OBTENIDAS",
            };
        } catch (error: any) {
            logger.info("ERROR AL OBTENER MONEDAS" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    }

    reporteCobranzas = async (): Promise<IRespuesta<ICuota[]>> => {
        const respuesta = new Respuesta();
        try {
            const cuotas = await Cuota.find().lean();
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: cuotas,
                mensaje: "MONEDAS OBTENIDAS",
            };
        } catch (error: any) {
            logger.info("ERROR AL OBTENER MONEDAS" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }

    }

    reportePrestamos = async (): Promise<IRespuesta<IPrestamo[]>> => {
        const respuesta = new Respuesta();
        try {
            const prestamos = await Prestamo.find().lean();
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: prestamos,
                mensaje: "MONEDAS OBTENIDAS",
            };
        } catch (error: any) {
            logger.info("ERROR AL OBTENER MONEDAS" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    }
}
