// filtrarUsuarios

import {  Router } from "express";
import { PrestamoController } from "../controllers/prestamo.controller";

const prestamo = new PrestamoController();

const router = Router();

router.get("/", prestamo.obtenerPrestamos)
router.post("/nuevo", prestamo.crearPrestamos);

export { router };
