import { ICuota, IRespuesta } from "types-prestamista";
import Cuota from "../models/CuotaModel";
import { Respuesta } from "../models/Respuesta";
import logger from "../utils/logger";

export class CuotaService {

    obtenerCuotas = async (): Promise<IRespuesta<ICuota[]>> => {
        const respuesta = new Respuesta();
        try {
            const cuotas = await Cuota.find();
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

    crearCuota = async (cuota: ICuota): Promise<IRespuesta<ICuota>> => {
        const respuesta = new Respuesta();
        try {
            const nuevaCuota = new Cuota(cuota);
            const cuotaCreada = await nuevaCuota.save();
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: cuotaCreada,
                mensaje: "CUOTA CREADA",
            };
        } catch (error: any) {
            logger.info("ERROR AL CREAR CUOTA" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    }
}
