import { ClienteService } from "../services/cliente.service";
import { Request as RQ, Response as RES } from "express";
import { responder } from "../utils/response.handle";

export class ClienteController {

  cliente: ClienteService;

  constructor() {
    this.cliente = new ClienteService();
  }

  obtenerClientes = async (req: RQ, res: RES) => responder(await this.cliente.obtenerClientes(), res);

  crearCliente = async (req: RQ, res: RES) => responder(await this.cliente.crearCliente(req.body), res);
  
}


