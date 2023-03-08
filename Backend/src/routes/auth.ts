import {  Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { checkJwt } from "../middleware/session";
import { schemaValidator } from "../middleware/Validator/schemaValidator";
import { UsuarioValidar } from "../middleware/Validator/User.validator";

const auth = new AuthController();
const usuarioValidar = new UsuarioValidar();

const router = Router();

router.post("/registro", schemaValidator(usuarioValidar.registro()), auth.registro);
router.post("/login", schemaValidator(usuarioValidar.login()), auth.login);
router.get("/re-login", checkJwt, auth.reLogin);
router.post("/restaurar-operario/:documento", auth.restaurarCuentaOperario);


export { router };
