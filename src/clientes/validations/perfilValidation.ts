import Joi from "joi";

export const actualizarPerfilSchema = Joi.object({
    nombre: Joi.string().min(3).max(50).optional(),
    correo: Joi.string().email().optional(),
    telefono: Joi.string().min(8).max(20).optional(),
});