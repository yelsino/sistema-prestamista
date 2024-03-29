import { ClienteService } from "../services/cliente.service";
import { Request as RQ, Response as RES } from "express";
import { responder } from "../utils/response.handle";

export class ClienteController {

  cliente: ClienteService;

  constructor() {
    this.cliente = new ClienteService();
  }

  obtenerClientes = async (req: RQ, res: RES) => 
  responder(await this.cliente.obtenerClientes(), res);

  obtenerCliente = async (req: RQ, res: RES) => 
  responder(await this.cliente.obtenerCliente(req.params.cliente), res);

  obtenerDetalleCliente = async (req: RQ, res: RES) => 
  responder(await this.cliente.obtenerDetalleCliente(req.params.cliente), res);

  buscarClientes = async (req: RQ, res: RES) => 
  responder(await this.cliente.buscarClientes(req.params.termino), res);

  crearCliente = async (req: RQ, res: RES) => 
  responder(await this.cliente.crearCliente(req.body), res);

  actualizarCliente = async (req: RQ, res: RES) =>
  responder(await this.cliente.actualizarCliente(req.body), res);
  
}


