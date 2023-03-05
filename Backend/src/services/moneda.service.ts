import { ICliente, ICodigoTemporal, IMoneda, IRespuesta } from "types-prestamista";
import Cliente from "../models/ClienteModel";
import Moneda from "../models/MonedaModel";
import { Respuesta } from "../models/Respuesta";
import logger from "../utils/logger";

export class MonedaService {

    obtenerMonedas = async (): Promise<IRespuesta<IMoneda[]>> => {
        const respuesta = new Respuesta();
        try {
            const monedas = await Moneda.find();
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: monedas,
                mensaje: "MONEDAS OBTENIDAS",
            };
        } catch (error: any) {
            logger.info("ERROR AL OBTENER MONEDAS" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    }

    crearMoneda = async (moneda: IMoneda): Promise<IRespuesta<IMoneda>> => {
        const respuesta = new Respuesta();
        try {
            const nuevaMoneda = new Moneda(moneda);
            const monedaCreada = await nuevaMoneda.save();
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: monedaCreada,
                mensaje: "MONEDA CREADA",
            };
        } catch (error: any) {
            logger.info("ERROR AL CREAR MONEDA" + error.message);
            return { ...respuesta, code: 500, ok: false, data: null };
        }
    }
}
