import { Request as RQ, Response as RES } from "express";
import { AuthService } from "../services/auth.service";
import { NotificacionService } from "../services/notificacion.service";
import { responder } from "../utils/response.handle";


export class NotificacionController {

  auth: AuthService;
  notificacion: NotificacionService
  constructor() {
    this.auth = new AuthService();
    this.notificacion = new NotificacionService();
  }


  enviarNotificacionMovil = async (req: RQ, res: RES) => responder(await this.notificacion.enviarNotificacionCorreo(req.body), res)
  
  enviarNotificacionCorreo = async (req: RQ, res: RES) =>  responder(await this.notificacion.enviarNotificacionCorreo(req.body), res)
 


  
}


