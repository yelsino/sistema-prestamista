import { Request as RQ, Response as RES } from "express";
import { MonedaService } from "../services/moneda.service";
import { responder } from "../utils/response.handle";

export class MonedaController{

    moneda: MonedaService
    constructor(){
        this.moneda = new MonedaService();
    }

    obtenerMonedas = async (req: RQ, res: RES) => responder(await this.moneda.obtenerMonedas(), res);

    crearMoneda = async (req: RQ, res: RES) => responder(await this.moneda.crearMoneda(req.body), res);

  
}


