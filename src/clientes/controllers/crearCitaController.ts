import { Request, Response } from "express";
import { Cita } from "../../models/cita";

export const crearCita = async (req: Request, res: Response) => {
    try {
        const idCliente = req.user?.id;
        const { fecha, hora, servicio } = req.body;

        // Validación: fecha no puede ser pasada
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const fechaCita = new Date(fecha);
        if (fechaCita < hoy) {
            return res
                .status(400)
                .json({ message: "No puedes crear citas en fechas pasadas" });
        }

        // Validación: no fines de semana
        const dia = fechaCita.getUTCDay(); // 6-dom, 0-6- lun - sab

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

        // Validación: evitar doble cita en mismo horario
        const citaExistente = await Cita.findOne({
            where: {
                fecha,
                hora
            }
        });

        if (citaExistente) {
            return res.status(400).json({
                message: "Ya existe una cita agendada para esa fecha y hora"
            });
        }

        const nuevaCita = await Cita.create({
            fecha,
            hora,
            servicio,
            id_cliente: idCliente
        });

        return res.status(201).json({
            message: "Cita creada con éxito",
            cita: nuevaCita
        });

    } catch (error) {
        console.error("Error creando cita:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};