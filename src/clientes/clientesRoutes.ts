import { Router } from "express";

// Middlewares
import { verifyToken } from "../middlewares/verifyToken";
import { validateSchema } from "../middlewares/validateSchema";

// Controllers
import { createClientController } from "./controllers/createClientController";
// import { loginWithGoogleController } from "./controllers/loginWithGoogleController";
import { loginClientController } from "./controllers/loginClientController";
import { obtenerPerfil } from "./controllers/perfilController";
import { actualizarPerfil } from "./controllers/actualizarPerfilController";
import { cambiarPassword } from "./controllers/cambiarPasswordController";
import { crearCita } from "./controllers/crearCitaController";
import { obtenerCitas } from "./controllers/verCitas";
import { cancelarCita } from "./controllers/cancelarCita";
import { reprogramarCita } from "./controllers/reprogramarCitaController";

// Validaciones con Joi
import { actualizarPerfilSchema } from "./validations/perfilValidation";
import { cambiarPasswordSchema } from "./validations/passwordValidation";
import { crearCitaSchema } from "./validations/citaValidation";

const router = Router();

// Crear perfil de cliente desde la página
router.post("/register", createClientController);

// Crear / iniciar sesión con Google
// router.post("/google", loginWithGoogleController);

// login de cliente
router.post("/login", loginClientController);

// Obtener perfil del cliente autenticado
router.get("/perfil", verifyToken, obtenerPerfil);

// Actualizar perfil del cliente autenticado
router.put("/perfil/editar", verifyToken, validateSchema(actualizarPerfilSchema), actualizarPerfil);

// Cambiar contraseña del cliente autenticado
router.put("/perfil/editar/password", verifyToken, validateSchema(cambiarPasswordSchema), cambiarPassword);

// Crear una nueva cita
router.post("/citas", verifyToken, validateSchema(crearCitaSchema), crearCita);

// Obtener todas las citas del cliente autenticado
router.get("/citas", verifyToken, obtenerCitas);

// Cancelar una cita
router.delete("/citas/:id", verifyToken, cancelarCita);

// Reprogramar una cita
router.put("/citas/reprogramar/:id", verifyToken, reprogramarCita);

export default router;