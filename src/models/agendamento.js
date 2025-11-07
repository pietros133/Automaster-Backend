import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Cliente from "./cliente.js";
import Veiculo from "./veiculo.js";

const Agendamento = sequelize.define(
  "Agendamento",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cliente,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    placaVeiculo: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Veiculo,
        key: "placa",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "agendado",
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    tableName: "agendamento",
    timestamps: false,
  }
);

// Relacionamentos
Agendamento.belongsTo(Cliente, { foreignKey: "clienteId", as: "cliente" });
Agendamento.belongsTo(Veiculo, { foreignKey: "placaVeiculo", as: "veiculo" });

export default Agendamento;
