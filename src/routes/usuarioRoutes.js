import { Router } from "express";
import { UserController } from "../controllers/usuarioController.js";

const router = Router();

router.post("/usuarios", UserController.create);
router.get("/login", UserController.Login);
router.post("/atualizarSenha", UserController.atualizarSenha);
export default router;
