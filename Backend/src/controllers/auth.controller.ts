import { Request as RQ, Response as RES } from "express";
import { AuthService } from "../services/auth.service";
import { responder } from "../utils/response.handle";


export class AuthController {

  auth: AuthService;

  constructor() {
    this.auth = new AuthService();
  }

  registro = async (req: RQ, res: RES) => responder(await this.auth.registrarUsuario(req.body), res);
  
  login = async (req: RQ, res: RES) => responder(await this.auth.loginUsuario(req.body), res); 
  
  reLogin = async (req: any, res: RES) => responder(await this.auth.reLogin(req.user.id), res);
  
  loginGoogle = async (req: RQ, res: RES) => responder(await this.auth.loginGoogle(req.body), res);

  loginFacebook = async (req: RQ, res: RES) => responder(await this.auth.loginFacebook(req.body), res);

  loginConMovil = async (req: RQ, res: RES) => responder(await this.auth.loginConMovil(req.body), res);

  registrarConEmail = async (req: RQ, res: RES) => responder(await this.auth.registrarConEmail(req.body), res);

  registroConMovil = async (req: RQ, res: RES) => responder(await this.auth.registrarConMovil(req.body), res);

  verificarExisteMovil = async (req: RQ, res: RES) => responder(await this.auth.verificarExisteMovil(req.body.celular), res);

  verificarExisteCorreo = async (req: RQ, res: RES) => responder(await this.auth.verificarExisteCorreo(req.body.correo), res);
  
  obtenerUsuarios = async (req: RQ, res: RES) => responder(await this.auth.obtenerUsuarios(), res);

  restaurarCuentaOperario = async (req: RQ, res: RES) => responder(await this.auth.restaurarCuentaOperario(req.params.documento), res);

  registrarOperario = async (req: RQ, res: RES) => responder(await this.auth.registrarOperario(req.body), res);

  loginOperario = async (req: RQ, res: RES) => responder(await this.auth.loginOperario(req.body), res);

}


