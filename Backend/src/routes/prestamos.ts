// filtrarUsuarios

import {  Router } from "express";
import { PrestamoController } from "../controllers/prestamo.controller";

const prestamo = new PrestamoController();

const router = Router();

router.get("/", prestamo.obtenerPrestamos)
router.get("/formas-pago", prestamo.obtenerFormasPago);
router.get("/:prestamo", prestamo.obtenerPrestamo)
router.get("/buscar/:termino", prestamo.buscarPrestamos);
router.post("/nuevo", prestamo.crearPrestamos);
router.get("/obtener-contratos", prestamo.obtenerContratos);
router.get("/cuotas/:prestamo", prestamo.obtenerCuotasPrestamo);
router.post("/pagar-cuotas", prestamo.pagarCuotas);
router.post("/cancelar-pago", prestamo.cancelarPago);

export { router };
