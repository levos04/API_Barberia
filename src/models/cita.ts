import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/database";
import { Cliente } from "./Cliente";

export class Cita extends Model {
  public id_cita!: number;
  public fecha!: string;
  public hora!: string;
  public servicio!: string;
  public id_cliente!: number;
}

Cita.init(
  {
    id_cita: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    servicio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "clientes",
        key: "id_cliente",
      },
    },
  },
  {
    sequelize,
    modelName: "Cita",
    tableName: "citas",
    timestamps: false,
  }
);

// Relación
Cliente.hasMany(Cita, { foreignKey: "id_cliente" });
Cita.belongsTo(Cliente, { foreignKey: "id_cliente" });
