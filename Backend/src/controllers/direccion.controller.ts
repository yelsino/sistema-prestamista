import { Request as RQ, Response as RES } from "express";
import { DireccionService } from "../services/direccion.service";
import { responder } from "../utils/response.handle";

export class DireccionController{

    direccion: DireccionService
    constructor(){
        this.direccion = new DireccionService();
    }

    registrarDireccion = async (req: RQ, res: RES) => responder(await this.direccion.registrarDireccion(req.body), res);

    obtenerDepartamentos = async (req: RQ, res: RES) => responder(await this.direccion.obtenerDepartamentos(), res);

    obtenerProvincias = async (req: RQ, res: RES) => responder(await this.direccion.obtenerProvincias(req.params.departamento), res);

    obtenerDistritos = async (req: RQ, res: RES) => responder(await this.direccion.obtenerDistritos(req.params.provincia), res);
}


