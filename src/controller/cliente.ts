import { Request, Response } from "express";
import { Cliente } from "../models/cliente";

export const registrarCliente = async (req: Request, res: Response) => {
  try {
    const { nombre, correo, telefono } = req.body;

    const existe = await Cliente.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ msg: "El correo ya está registrado" });
    }

    const cliente = await Cliente.create({ nombre, correo, telefono });

    res.json(cliente);
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor", error });
  }
};
