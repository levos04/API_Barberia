import { Request, Response } from "express";
import { Cita } from "../../models/cita";
import { Op } from "sequelize";
import { reprogramarCitaSchema } from "../validations/citaValidation";

export const reprogramarCita = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const id_cliente = req.user?.id;

        // Validamos fecha y hora
        const { error } = reprogramarCitaSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ ok: false, msg: error.message });
        }

        const { fecha, hora } = req.body;

        // Buscar cita
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

        // Validación: no fines de semana
        const nuevaFecha = new Date(fecha);
        const dia = nuevaFecha.getUTCDay(); // 6-dom, 0-6- lun - sab

        const [h, m] = hora.split(":").map(Number);
        const horaDecimal = h + m / 60;

        // Horarios según día
        let apertura = 8; // 08:00
        let cierre = 20;  // 20:00

        if (dia === 0) {
            // Domingo
            cierre = 15; // cierran más temprano
        }

        // Validar rango
        if (horaDecimal < apertura || horaDecimal > cierre) {
            return res.status(400).json({
                ok: false,
                msg: `El horario permitido es de ${apertura}:00 a ${cierre}:00`,
            });
        }

        // Validación: evitar duplicados (misma fecha y hora)
        const citaExistente = await Cita.findOne({
            where: {
                fecha,
                hora,
                id_cliente,
                id_cita: { [Op.ne]: id },
            },
        });

        if (citaExistente) {
            return res.status(400).json({
                ok: false,
                msg: "Ya tienes una cita en esa fecha y hora",
            });
        }

        // Guardamos cambios
        cita.fecha = fecha;
        cita.hora = hora;
        await cita.save();

        return res.json({
            ok: true,
            msg: "Cita reprogramada correctamente",
            cita,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al reprogramar la cita",
        });
    }
};