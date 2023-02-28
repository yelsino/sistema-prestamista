// filtrarUsuarios


import { Request as RQ, Response as RES } from "express";
import { UsuarioService } from "../services/usuario.service";
import { responder } from "../utils/response.handle";


export class UsuarioController {

  usuario: UsuarioService;

  constructor() {
    this.usuario = new UsuarioService();
  }

  filtrarUsuarios = async (req: RQ, res: RES) => {
	return responder(await this.usuario.filtrarUsuarios(req.body), res)
  }

  obtenerUsuario = async (req: RQ, res: RES) => responder(await this.usuario.obtenerUsuario(req.params.id), res);

}


