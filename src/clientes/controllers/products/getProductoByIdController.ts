import { Request, Response } from "express";
import { Producto } from "../../../models/producto";

export const obtenerProductoPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: "Producto no encontrado",
            });
        }

        return res.json({
            ok: true,
            producto,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: "Error al obtener producto",
        });
    }
};