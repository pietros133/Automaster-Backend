import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

export default Usuario;
