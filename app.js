import express from "express";
import sequelize from "./src/config/db.js";
import Cliente from "./src/models/cliente.js";
import Veiculo from "./src/models/veiculo.js";
import Usuario from "./src/models/usuario.js";
import Agendamento from "./src/models/agendamento.js";
const app = express();

app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Tabelas sincronizadas com sucesso!");

    app.listen(8081, () => {
      console.log(`Servidor rodando em http://localhost:8081`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar-se com o banco de dados:", err);
  });
