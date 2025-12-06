import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateSchema = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: "Datos inválidos",
                detalles: error.details.map(d => d.message)
            });
        }
        next();
    };
};