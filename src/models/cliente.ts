import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/database";

export class Cliente extends Model {
  public id_cliente!: number;
  public nombre!: string;
  public correo!: string;
  public telefono!: string;
}

Cliente.init(
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Cliente",
    tableName: "clientes",
    timestamps: false,
  }
);
