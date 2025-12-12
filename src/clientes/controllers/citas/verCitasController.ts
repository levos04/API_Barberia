import { Request, Response } from "express";
import { Cita } from "../../../models/cita";

export const obtenerCitas = async (req: Request, res: Response) => {
    try {
        const id_cliente = req.user?.id;

        const citas = await Cita.findAll({
            where: { id_cliente },
            order: [["fecha", "ASC"], ["hora", "ASC"]],
        });

        const ahora = new Date();

        // Filtrar solo citas futuras o del mismo día/hora
        const citasFuturas = citas.filter((cita) => {
            const [h, m] = cita.hora.split(":");
            const fechaCita = new Date(cita.fecha + "T" + cita.hora + ":00");

            return fechaCita >= ahora;
        });

        return res.json({
            ok: true,
            citas: citasFuturas,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al obtener citas",
        });
    }
};