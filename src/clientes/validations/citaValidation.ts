import Joi from "joi";

export const crearCitaSchema = Joi.object({
    fecha: Joi.date().iso().required().messages({
        "date.format": "La fecha debe tener formato válido",
        "date.base": "La fecha es inválida"
    }),

    hora: Joi.string()
        .pattern(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/)
        .required()
        .messages({
            "string.pattern.base": "La hora debe ser HH:mm en formato 24 horas"
        }),

    servicio: Joi.string().min(3).max(100).required()
});

// Para reprogramar una cita (fecha y hora nuevas)
export const reprogramarCitaSchema = Joi.object({
    fecha: Joi.date()
        .greater("now")
        .required()
        .messages({
            "date.greater": "La nueva fecha no puede ser anterior a hoy.",
        }),
    hora: Joi.string()
        .pattern(/^\d{2}:\d{2}$/)
        .required()
        .messages({
            "string.pattern.base": "La hora debe tener formato HH:MM",
        }),
});