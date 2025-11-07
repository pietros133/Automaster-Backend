import express from "express";
import cors from "cors";
import sequelize from "./src/config/db.js";
import Cliente from "./src/models/cliente.js";
import Veiculo from "./src/models/veiculo.js";
import Usuario from "./src/models/usuario.js";
import Agendamento from "./src/models/agendamento.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";
import clienteRoutes from "./src/routes/clienteRoutes.js";
import veiculosRoutes from "./src/routes/veiculosRoutes.js";
import agendamentoRoutes from "./src/routes/agendamentoRoutes.js";

const app = express();

// Permitir acesso do Live Server (porta diferente)
app.use(cors());

// Interpretar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/usuarios", usuarioRoutes);
app.use("/clientes", clienteRoutes);
app.use("/veiculos", veiculosRoutes);
app.use("/agendamentos", agendamentoRoutes);

// Banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Tabelas sincronizadas com sucesso!");
    app.listen(8081, () => {
      console.log("Servidor rodando em http://localhost:8081");
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar-se com o banco de dados:", err);
  });
