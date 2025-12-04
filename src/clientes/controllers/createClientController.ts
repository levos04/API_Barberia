import { Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import { Cliente } from "../../models/cliente";

// Validación con Joi
const createClientSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).required(),
    correo: Joi.string().email().required(),
    telefono: Joi.string().min(8).max(15).required(),
    password: Joi.string().min(6).required(),
});

export const createClientController = async (req: Request, res: Response) => {
    try {
        // 1. Validar datos
        const { error, value } = createClientSchema.validate(req.body);
        if (error) {
        return res.status(400).json({ message: "Datos inválidos", error: error.details });
    }

    const { nombre, correo, telefono, password } = value;

    // 2. Verificar si ya existe el correo
    const existing = await Cliente.findOne({ where: { correo } });
    if (existing) {
        return res.status(409).json({ message: "El correo ya está registrado" });
    }

    // 3. Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Crear cliente
    const nuevoCliente = await Cliente.create({
        nombre,
        correo,
        telefono,
        password: hashedPassword,
    } as any);

    return res.status(201).json({
        message: "Cliente creado exitosamente",
        cliente: {
            id: nuevoCliente.id_cliente,
            nombre: nuevoCliente.nombre,
            correo: nuevoCliente.correo,
            telefono: nuevoCliente.telefono,
        },
    });
    } catch (err: any) {
        console.error("Error en createClientController:", err);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};