import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Cliente from "./cliente.js";

const Veiculo = sequelize.define("Veiculo", {
  placa: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  modelo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  cor: {
    type: DataTypes.STRING(255),
    allowNull: false,
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
});

// Relacionamentos
Cliente.hasMany(Veiculo, { foreignKey: "clienteId" });
Veiculo.belongsTo(Cliente, { foreignKey: "clienteId" });

export default Veiculo;
