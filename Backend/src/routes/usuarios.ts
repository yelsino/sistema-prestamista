// filtrarUsuarios

import {  Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

const usuario = new UsuarioController();

const router = Router();


router.get("/", usuario.obtenerUsuarios)
router.post("/nuevo", usuario.crearUsuario);

export { router };
