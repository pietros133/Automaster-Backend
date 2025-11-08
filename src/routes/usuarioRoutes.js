import { Router } from "express";
import { UserController } from "../controllers/usuarioController.js";

const router = Router();

router.post("/usuarios", UserController.create);
router.post("/login", UserController.Login);
router.post("/recuperarsenha", UserController.recuperarSenha);
export default router;
