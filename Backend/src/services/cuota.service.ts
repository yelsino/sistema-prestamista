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
            console.log(prestamo);

            

            const cuotasGeneradas = cuotas.map(async (v,index) => {
                const fechaActual = new Date();
                const fechaLimite = fechaActual.setDate(fechaActual.getDate() + (15 * index + 1));
                const cuota = new Cuota( {
                    cliente: prestamo.cliente,
                    agente: prestamo.agente,
                    prestamo: prestamo._id,
                    monto: (prestamo.monto * (prestamo.interes / 100) + prestamo.monto) / prestamo.numeroCuotas,
                    numeroCuota: v,
                    estado: "PENDIENTE",
                    fechaLimite: fechaLimite,
                    
                    // fechaPago: new D,
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
            const updatePromises = cuotasBD.map((v) => {
                v.estado = "PAGADO";
                v.fechaPago = new Date();
                return Cuota.updateOne({_id: v._id}, v);
            });
            await Promise.all(updatePromises);
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

    cancelarPagoCuota = async (cuota: ICuota): Promise<IRespuesta<ICuota>> => {
        const respuesta = new Respuesta<ICuota>();

        try {
            const cuotaBD = await Cuota.findById(cuota._id);
            if(!cuotaBD) return { ...respuesta, code: 404, ok: false, data: null, mensaje: "CUOTA NO ENCONTRADA" };
            cuotaBD.estado = "PENDIENTE";
            cuotaBD.fechaPago = null;
            await cuotaBD.save();
            return { ...respuesta, code: 200, ok: true, data: cuotaBD, mensaje: "PAGO DE CUOTA CANCELADO" };
        } catch (error) {
            console.log(error.message);
            
        }
    }
}
