import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/database";

export class Producto extends Model {
  public id_producto!: number;
  public nombre!: string;
  public descripcion!: string;
  public precio!: number;
  public imagen!: string | null;
}

Producto.init(
  {
    id_producto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Producto",
    tableName: "productos",
    timestamps: false,
  }
);