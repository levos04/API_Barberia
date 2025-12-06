import Joi from "joi";

export const cambiarPasswordSchema = Joi.object({
    password_actual: Joi.string().required(),
    password_nueva: Joi.string().min(6).required()
});