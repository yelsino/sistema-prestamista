// filtrarUsuarios


import { Request as RQ, Response as RES } from "express";
import { PrestamoService } from "../services/prestamo.service";
import { responder } from "../utils/response.handle";


export class PrestamoController {

  prestamo: PrestamoService;

  constructor() {
    this.prestamo = new PrestamoService();
  }

  obtenerPrestamos = async (req: RQ, res: RES) => responder(await this.prestamo.obtenerPrestamos(), res);

  crearPrestamos = async (req: RQ, res: RES) => responder(await this.prestamo.crearPrestamo(req.body), res);



}


