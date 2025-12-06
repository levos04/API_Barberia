import { Request, Response } from "express";
import { Cliente } from "../../models/cliente";

export const actualizarPerfil = async (req: Request, res: Response) => {
    try {
        const idCliente = req.user?.id;

        const { nombre, correo, telefono } = req.body;

        const cliente = await Cliente.findByPk(idCliente);

        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        await cliente.update({
            nombre: nombre ?? cliente.nombre,
            correo: correo ?? cliente.correo,
            telefono: telefono ?? cliente.telefono
        });

        return res.json({
            message: "Perfil actualizado con éxito",
            perfil: {
                nombre: cliente.nombre,
                email: cliente.correo,
                telefono: cliente.telefono
            }
        });

    } catch (error) {
        console.error("Error actualizando perfil:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};