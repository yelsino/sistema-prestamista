import { Request as RQ, Response as RES } from "express";
import { CuotaService } from "../services/cuota.service";
import { responder } from "../utils/response.handle";

export class CuotaController{

    moneda: CuotaService
    constructor(){
        this.moneda = new CuotaService();
    }

    obtenerCuotas = async (req: RQ, res: RES) => responder(await this.moneda.obtenerCuotas(), res);

    crearCuota = async (req: RQ, res: RES) => responder(await this.moneda.crearCuota(req.body), res);
  
}


