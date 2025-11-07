import { Router } from "express";
import { clienteController } from "../controllers/clienteController.js";

const router = Router();

router.post("/cadastrarCliente", clienteController.create);
router.post("/atualizarCliente", clienteController.atualizarCliente);
router.get("/buscarCliente", clienteController.findClients);

export default router;
