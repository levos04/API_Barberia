import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Token no proporcionado" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token inválido" });
        }

        const secret = process.env.JWT_SECRET!;

        jwt.verify(token, secret, (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({ message: "Token inválido o expirado" });
            }

            req.user = decoded as { id: number; correo: string };
            next();
        });
    }catch (err) {
        console.error("Error en verifyToken:", err);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};