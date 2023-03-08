// filtrarUsuarios


import { Request as RQ, Response as RES } from "express";
import { UsuarioService } from "../services/usuario.service";
import { responder } from "../utils/response.handle";


export class UsuarioController {

  usuario: UsuarioService;

  constructor() {
    this.usuario = new UsuarioService();
  }

  obtenerUsuarios = async (req: RQ, res: RES) => responder(await this.usuario.obtenerUsuarios(), res);

  crearUsuario = async (req: RQ, res: RES) => responder(await this.usuario.crearUsuario(req.body), res);

}


