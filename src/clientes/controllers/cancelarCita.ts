import { Request, Response } from "express";
import { Cita } from "../../models/cita";

export const cancelarCita = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const id_cliente = req.user?.id;

        const cita = await Cita.findOne({
            where: {
                id_cita: id,
                id_cliente,
            },
        });

        if (!cita) {
            return res.status(404).json({
                ok: false,
                msg: "Cita no encontrada",
            });
        }

        await cita.destroy();

        return res.json({
            ok: true,
            msg: "Cita cancelada correctamente",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al cancelar la cita",
        });
    }
};