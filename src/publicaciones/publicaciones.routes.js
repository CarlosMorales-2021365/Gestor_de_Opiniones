import { Router } from "express";
import { createPublicacion, updatePublicaciones, getPublicacionesByID } from "./publicaciones.controller.js"; 
import { createPublicacionesValidator, updatePublicacionValidator, getPublicacionesByIdValidator } from "../middlewares/publicaciones-validator.js";

const router = Router();

router.post("/crearPublicaciones", createPublicacionesValidator, createPublicacion);

router.put("/updatePublicacion/:id", updatePublicacionValidator, updatePublicaciones); 

router.get("/getPublicacionById/:id", getPublicacionesByIdValidator, getPublicacionesByID);

export default router;