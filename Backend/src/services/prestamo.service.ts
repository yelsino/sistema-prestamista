import {  IPrestamo, IRespuesta } from "types-prestamista";
import Prestamo from "../models/PrestamoModel";
import { Respuesta } from "../models/Respuesta";
import logger from "../utils/logger";

export class PrestamoService {

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

    crearPrestamo = async (prestamo: IPrestamo): Promise<IRespuesta<IPrestamo>> => {
        const respuesta = new Respuesta();
        try {
            const nuevoPrestamo = new Prestamo(prestamo);
            const prestamoCreado = await nuevoPrestamo.save();
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

   
}
