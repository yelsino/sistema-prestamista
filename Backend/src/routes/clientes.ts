import {  Router } from "express";
import { ClienteController } from "../controllers/cliente.controller";

const cliente = new ClienteController();

const router = Router();
router.get("/", cliente.obtenerClientes);
router.get("/:cliente", cliente.obtenerCliente);
router.get("/buscar/:termino", cliente.buscarClientes);
router.post("/registrar", cliente.crearCliente);

export { router };
