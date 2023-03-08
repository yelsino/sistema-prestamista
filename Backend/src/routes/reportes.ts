// filtrarUsuarios

import {  Router } from "express";
import { PrestamoController } from "../controllers/prestamo.controller";

const prestamo = new PrestamoController();

const router = Router();

router.get("/cliente", prestamo.obtenerPrestamos)
router.get("/agentes", prestamo.obtenerPrestamos)
router.get("/cobranzas", prestamo.obtenerPrestamos)
router.get("/prestamos", prestamo.obtenerPrestamos)

export { router };
