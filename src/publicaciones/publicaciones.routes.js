import { Router } from "express";
import { createPublicacion } from "./publicaciones.controller.js"; 
import { createPublicacionesValidator } from "../middlewares/publicaciones-validator.js";

const router = Router();

router.post("/crearPublicaciones", createPublicacionesValidator, createPublicacion);

export default router;