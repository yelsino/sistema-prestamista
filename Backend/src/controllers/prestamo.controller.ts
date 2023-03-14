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

  obtenerPrestamo = async (req: RQ, res: RES) => responder(await this.prestamo.obtenerPrestamo(req.params.prestamo), res);

  buscarPrestamos = async (req: RQ, res: RES) => responder(await this.prestamo.buscarPrestamos(req.params.termino), res);

  crearPrestamos = async (req: RQ, res: RES) => responder(await this.prestamo.crearPrestamo(req.body), res);

  obtenerContratos = async (req: RQ, res: RES) => responder(await this.prestamo.obtenerContratos(), res);

  obtenerCuotasPrestamo = async (req: RQ, res: RES) => responder(await this.prestamo.obtenerCuotasPrestamo(req.params.prestamo), res);

  pagarCuotas = async (req: RQ, res: RES) => responder(await this.prestamo.pagarCuotas(req.body), res);

  cancelarPago = async (req: RQ, res: RES) => responder(await this.prestamo.cancelarPago(req.body), res);

}


