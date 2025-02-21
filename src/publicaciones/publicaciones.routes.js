import { Router } from "express";
import { createPublicacion, updatePublicaciones } from "./publicaciones.controller.js"; 
import { createPublicacionesValidator, updatePublicacionValidator } from "../middlewares/publicaciones-validator.js";

const router = Router();

router.post("/crearPublicaciones", createPublicacionesValidator, createPublicacion);

router.put("/updatePublicacion/:id", updatePublicacionValidator, updatePublicaciones); 

export default router;