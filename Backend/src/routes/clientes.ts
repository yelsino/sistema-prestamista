import {  Router } from "express";
import { ClienteController } from "../controllers/cliente.controller";

const cliente = new ClienteController();

const router = Router();
router.get("/", cliente.obtenerClientes);
router.post("/registrar", cliente.crearCliente);

export { router };