// filtrarUsuarios


import { Request as RQ, Response as RES } from "express";
import { ReporteService } from "../services/reporte.service";
import { responder } from "../utils/response.handle";


export class ReporteController {

  reporte: ReporteService;

  constructor() {
    this.reporte = new ReporteService();
  }

  reporteClientes = async (req: RQ, res: RES) => responder(await this.reporte.reporteClientes(), res);

  reporteAgentes = async (req: RQ, res: RES) => responder(await this.reporte.reporteAgentes(), res);

  reporteCobranzas = async (req: RQ, res: RES) => responder(await this.reporte.reporteCobranzas(), res);

  reportePrestamos = async (req: RQ, res: RES) => responder(await this.reporte.reportePrestamos(), res);
 
}


