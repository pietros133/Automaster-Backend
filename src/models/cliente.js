import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Cliente = sequelize.define(
  "Cliente",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    tableName: "cliente",
    timestamps: false,
  }
);

export default Cliente;
