import { Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Cliente } from "../../models/cliente";

// Validación de login
const loginSchema = Joi.object({
    correo: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const loginClientController = async (req: Request, res: Response) => {
    const JWT_ISSUER = process.env.JWT_ISSUER as string;
    const JWT_AUDIENCE = process.env.JWT_AUDIENCE as string;

    try {
    // 1. Validar datos
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Datos inválidos", error: error.details });
    }
    const { correo, password } = value;

    // 2. Buscar cliente
    const cliente = await Cliente.findOne({ where: { correo } });
    if (!cliente) {
        return res.status(404).json({ message: "El correo no está registrado" });
    }

    // 3. Comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, (cliente as any).password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // 4. Generar JWT
    const token = jwt.sign(
        {
            id: cliente.id_cliente,
            correo: cliente.correo,
        },
        process.env.JWT_SECRET!,
        { 
            expiresIn: process.env.JWT_EXPIRES,
            issuer: JWT_ISSUER ,
            audience: JWT_AUDIENCE 
        }
    );

    return res.json({
        message: "Login exitoso",
        token,
        cliente: {
            id: cliente.id_cliente,
            nombre: cliente.nombre,
            correo: cliente.correo,
        },
    });
    } catch (err: any) {
        console.error("Error en loginClientController:", err);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};