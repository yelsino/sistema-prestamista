// filtrarUsuarios

import {  Router } from "express";
import { PrestamoController } from "../controllers/prestamo.controller";

const prestamo = new PrestamoController();

const router = Router();

router.get("/", prestamo.obtenerPrestamos)
router.get("/:prestamo", prestamo.obtenerPrestamos)
router.post("/nuevo", prestamo.crearPrestamos);
router.post("/cuotas/:prestamo", prestamo.crearPrestamos);
router.post("/pagar-cuota/:cuota", prestamo.crearPrestamos);

export { router };
