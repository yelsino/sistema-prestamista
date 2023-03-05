import {  Router } from "express";
import {  MonedaController } from "../controllers/moneda.controller";

const moneda = new MonedaController();

const router = Router();
router.get("/", moneda.obtenerMonedas);
router.post("/registrar", moneda.crearMoneda);

export { router };
