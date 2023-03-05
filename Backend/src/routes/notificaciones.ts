import {  Router } from "express";
import { NotificacionController } from "../controllers/notificacion.controller";

const notificacion = new NotificacionController();

const router = Router();
router.post("/notificacion-movil", notificacion.enviarNotificacionMovil);
router.post("/notificacion-correo", notificacion.enviarNotificacionCorreo);

export { router };
