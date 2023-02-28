import {  Router } from "express";
import { DireccionController } from "../controllers/direccion.controller";
import { DireccionValidar } from "../middleware/Validator/DireccionValidar";
import { schemaValidator } from "../middleware/Validator/schemaValidator";


const direccion = new DireccionController();
const direccionValidar = new DireccionValidar();

const router = Router();
router.post("/", schemaValidator(direccionValidar.registro()), direccion.registrarDireccion);
router.get("/de-usuario/:usuarioId",  direccion.obtenerDireccionesUsuario);
router.get("/departamentos", direccion.obtenerDepartamentos);
router.get("/provincias/:departamento", direccion.obtenerProvincias);
router.get("/distritos/:provincia", direccion.obtenerDistritos);

export { router };

