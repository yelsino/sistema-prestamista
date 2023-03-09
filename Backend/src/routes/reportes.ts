// filtrarUsuarios

import {  Router } from "express";
import { ReporteController } from "../controllers/reporte.controller";

const reporte = new ReporteController();

const router = Router();

router.get("/cliente", reporte.reporteClientes)
router.get("/agentes", reporte.reporteAgentes)
router.get("/cobranzas", reporte.reporteCobranzas)
router.get("/prestamos", reporte.reportePrestamos)

export { router };
