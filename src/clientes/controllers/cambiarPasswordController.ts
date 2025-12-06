import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Cliente } from "../../models/cliente";

export const cambiarPassword = async (req: Request, res: Response) => {
    try {
        const idCliente = req.user?.id;
        const { password_actual, password_nueva } = req.body;

        const cliente = await Cliente.findByPk(idCliente);

        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const passwordCorrecta = await bcrypt.compare(
            password_actual,
            cliente.password
        );

        if (!passwordCorrecta) {
            return res.status(401).json({ message: "La contraseña actual es incorrecta" });
        }

        const hashNuevo = await bcrypt.hash(password_nueva, 10);

        await cliente.update({
            password: hashNuevo
        });

        return res.json({ message: "Contraseña actualizada correctamente" });

    } catch (error) {
        console.error("Error cambiando contraseña:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};