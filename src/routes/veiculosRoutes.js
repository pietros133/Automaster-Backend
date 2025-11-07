import express from "express";
import { veiculoController } from "../controllers/veiculoController.js";

const router = express.Router();

// rota correta:
router.post("/cadastrarVeiculo", veiculoController.cadastrarVeiculo);

export default router;
