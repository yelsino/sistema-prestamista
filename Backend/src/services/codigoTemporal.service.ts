import { ICodigoTemporal } from "types-prestamista";
import CodigoTemporal from "../models/CodigoTemporalModel";
import logger from "../utils/logger";

export class CodigoTemporalService {

  registrarCodigoTemporal = async (data:ICodigoTemporal):Promise<ICodigoTemporal> => {
    return await CodigoTemporal.create({codigo: data.codigo})
  }

  verificarCodigoTemporal = async (codigo:string): Promise<boolean> => {
    try {
      const codigoValido = await CodigoTemporal.find({codigo: codigo}).populate('usuario')
      if(codigoValido){
        return true
      }
    } catch (error:any) {
      logger.info("OCURRIO UN ERROR AL VERIFICAR EL CÓDIGO: " + error.message);
    }
    return false
  }

  eliminarCodigoTemporal = async (codigo:string): Promise<string> => {
    await CodigoTemporal.remove({codigo})
    return "CODIGO ELIMINADO";
  }


}
