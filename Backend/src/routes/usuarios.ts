// filtrarUsuarios

import {  Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

const usuario = new UsuarioController();

const router = Router();


router.post("/filtrar", usuario.filtrarUsuarios);
router.get("/:id", usuario.obtenerUsuario)

export { router };
