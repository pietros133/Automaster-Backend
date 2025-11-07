import { Router } from "express";
import { agendamentoController } from "../controllers/agendamentoController.js";

const router = Router();

router.post("/cadastrar", agendamentoController.cadastrarAgendamento);
router.get("/buscar", agendamentoController.listarAgendamentos);

export default router;
