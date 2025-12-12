import { Request, Response } from "express";
import { Producto } from "../../../models/producto";
import { Op } from "sequelize";

export const obtenerProductos = async (req: Request, res: Response) => {
    try {
        const {
            nombre = "",
            page = 1,
            limit = 10,
            sort = "nombre",
            orden = "asc"
        } = req.query;

        const pagina = Number(page) || 1;
        const limite = Number(limit) || 10;
        const offset = (pagina - 1) * limite;

        const whereClause = nombre
            ? {
                  nombre: {
                      [Op.iLike]: `%${nombre}%`,
                  },
              }
            : {};

        // Validar campos de orden
        const camposOrdenPermitidos = ["nombre", "precio"];
        const ordenFinal = camposOrdenPermitidos.includes(String(sort))
            ? String(sort)
            : "nombre";

        const resultados = await Producto.findAndCountAll({
            where: whereClause,
            limit: limite,
            offset,
            order: [[ordenFinal, String(orden).toUpperCase()]],
        });

        return res.json({
            ok: true,
            total: resultados.count,
            paginaActual: pagina,
            paginasTotales: Math.ceil(resultados.count / limite),
            productos: resultados.rows,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: "Error al obtener productos",
        });
    }
};