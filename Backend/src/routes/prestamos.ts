// filtrarUsuarios

import {  Router } from "express";
import { PrestamoController } from "../controllers/prestamo.controller";

const prestamo = new PrestamoController();

const router = Router();

router.get("/", prestamo.obtenerPrestamos)
router.get("/:prestamo", prestamo.obtenerPrestamo)
router.get("/buscar/:termino", prestamo.buscarPrestamos);
router.post("/nuevo", prestamo.crearPrestamos);
router.get("/obtener-contratos", prestamo.obtenerContratos);
router.get("/cuotas/:prestamo", prestamo.obtenerCuotasPrestamo);
router.get("/pagar-cuotas", prestamo.pagarCuotas);

export { router };
