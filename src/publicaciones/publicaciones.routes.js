import { Router } from "express";
import { createPublicacion, updatePublicaciones, getPublicacionesByID, deletePublicacion } from "./publicaciones.controller.js"; 
import { createPublicacionesValidator, updatePublicacionValidator, getPublicacionesByIdValidator, deletePublicacionesIdValidator } from "../middlewares/publicaciones-validator.js";

const router = Router();

router.post("/crearPublicaciones", createPublicacionesValidator, createPublicacion);

router.put("/updatePublicacion/:id", updatePublicacionValidator, updatePublicaciones); 

router.get("/getPublicacionById/:id", getPublicacionesByIdValidator, getPublicacionesByID);

router.delete("/deletePublicacion/:id", deletePublicacionesIdValidator, deletePublicacion);

export default router;