// filtrarUsuarios

import {  Router } from "express";
import { PrestamoController } from "../controllers/prestamo.controller";

const prestamo = new PrestamoController();

const router = Router();

router.get("/", prestamo.obtenerPrestamos)
router.get("/buscar", prestamo.obtenerPrestamos);
router.get("/:prestamo", prestamo.obtenerPrestamos)
router.post("/nuevo", prestamo.crearPrestamos);
router.get("/obtener-contratos", prestamo.crearPrestamos);
router.get("/cuotas/:prestamo", prestamo.crearPrestamos);
router.get("/pagar-cuota/:cuota", prestamo.crearPrestamos);

export { router };
