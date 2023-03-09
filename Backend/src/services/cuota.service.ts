import { ICuota, IPrestamo, IRespuesta } from "types-prestamista";
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

    crearCuotas = async (prestamo: IPrestamo): Promise<ICuota[]> => {
        try {
            const cuotas =  new Array(prestamo.numeroCuotas)
            .fill(1)
            .map((_, index) => index + 1);

            const cuotasGeneradas = cuotas.map(async (v) => {
                const cuota = new Cuota( {
                    cliente: prestamo.cliente,
                    agente: prestamo.agente,
                    prestamo: prestamo._id,
                    monto: prestamo.monto,
                    numeroCuota: v,
                    estado: "PENDIENTE",
                    // fechaLimite: prestamo.fechaLimite,
                    // fechaPago: prestamo.fechaPago,
                });
                return Cuota.create(cuota);
            });
              
              const cuotasBD = await Promise.all(cuotasGeneradas);
            return cuotasBD;
        } catch (error: any) {
            logger.info("ERROR AL CREAR CUOTA" + error.message);
            return [];
        }
    }

    pagarCuota = async (cuota: ICuota): Promise<IRespuesta<ICuota>> => {
        
        const respuesta = new Respuesta<ICuota>();

        try {
            const cuotaBD = await Cuota.findById(cuota._id);
            if(!cuotaBD) return { ...respuesta, code: 404, ok: false, data: null, mensaje: "CUOTA NO ENCONTRADA" };
            cuotaBD.estado = "PAGADO";
            cuotaBD.fechaPago = new Date();
            await cuotaBD.save();
            return { ...respuesta, code: 200, ok: true, data: cuotaBD, mensaje: "CUOTA PAGADA" };
        } catch (error) {
            console.log(error.message);
            
        }
    }

    pagarCuotas = async (cuotas: ICuota[]): Promise<IRespuesta<ICuota[]>> => {
        const respuesta = new Respuesta<ICuota[]>();

        try {
            const cuotasBD = await Cuota.find({ _id: { $in: cuotas.map((v) => v._id) } });
            if (cuotasBD.length === 0)
                return {
                    ...respuesta,
                    code: 404,
                    ok: false,
                    data: null,
                    mensaje: "CUOTAS NO ENCONTRADAS",
                };
            cuotasBD.forEach((v) => {
                v.estado = "PAGADO";
                v.fechaPago = new Date();
            });
            await Cuota.insertMany(cuotasBD);
            return {
                ...respuesta,
                code: 200,
                ok: true,
                data: cuotasBD,
                mensaje: "CUOTAS PAGADAS",
            };
        } catch (error) {
            console.log(error.message);
        }
    }
}
