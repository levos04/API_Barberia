import { Request, Response } from "express";
import { sequelize } from "../../db/database";

export const obtenerPerfil = async (req: Request, res: Response) => {
    try {
        // Gracias al middleware, req.user ya existe
        const idCliente = req.user?.id;

        if (!idCliente) {
            return res.status(400).json({ message: "Usuario no válido" });
        }

        // Traer datos reales del cliente
        const query = `
            SELECT id_cliente, nombre, correo, telefono
            FROM clientes
            WHERE id_cliente = $1
        `;

        const [result]: any = await sequelize.query(query, {
            bind: [idCliente],
        });

        if (result.length === 0) {
            return res.status(404).json({ message: "Perfil no encontrado" });
        }

        return res.json({
            message: "Perfil obtenido con éxito",
            perfil: result[0]
        });

    } catch (error) {
        console.error("Error obteniendo perfil:", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};
