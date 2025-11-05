import express from "express";
import "./src/config/db.js";

const app = express();
app.use(express.json());
app.listen(8081, () => {
  console.log("Aplicação iniciada");
});
