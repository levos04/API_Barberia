import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { createClientController } from "./controllers/createClientController";
// import { loginWithGoogleController } from "./controllers/loginWithGoogleController";
import { loginClientController } from "./controllers/loginClientController";
import { obtenerPerfil } from "./controllers/perfilController";

const router = Router();

// Crear perfil de cliente desde la página
router.post("/register", createClientController);

// Crear / iniciar sesión con Google
// router.post("/google", loginWithGoogleController);

// login de cliente
router.post("/login", loginClientController);

// Obtener perfil del cliente autenticado
router.get("/perfil", verifyToken, obtenerPerfil);

export default router;