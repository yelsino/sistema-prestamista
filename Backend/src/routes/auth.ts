import {  Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { checkJwt } from "../middleware/session";
import { schemaValidator } from "../middleware/Validator/schemaValidator";
import { UsuarioValidar } from "../middleware/Validator/User.validator";

const auth = new AuthController();
const usuarioValidar = new UsuarioValidar();

const router = Router();

router.post("/registro", schemaValidator(usuarioValidar.registro()), auth.registro);
router.post("/registro-correo", schemaValidator(usuarioValidar.registroConEmail()), auth.registrarConEmail);
router.post("/login", schemaValidator(usuarioValidar.login()), auth.login);
router.post("/verificar-mobile", schemaValidator(usuarioValidar.verificarExisteMovil()), auth.verificarExisteMovil);
router.post("/verificar-correo", schemaValidator(usuarioValidar.verificarExisteEmail()), auth.verificarExisteCorreo);
router.get("/re-login", checkJwt, auth.reLogin);
router.get("/", auth.obtenerUsuarios)
router.post("/restaurar-operario/:documento", auth.restaurarCuentaOperario);


export { router };
