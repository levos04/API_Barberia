import express from "express";
import cors from "cors";
import routes from "./src/routes";
import { sequelize } from "./src/db/database";
import clientesRoutes from "./src/clientes/clientesRoutes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use("/clientes", clientesRoutes);

sequelize.sync().then(() => console.log("✅ Conectado a PostgreSQL"));

export default app;
