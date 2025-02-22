import { Router } from "express"
import { crearComentario, updateComentario } from "./comentarios.controller.js"
import { createComentariosValidator, updateComentariosValidator } from "../middlewares/comentarios-validators.js"

const router = Router()

router.post("/createComentarios", createComentariosValidator, crearComentario);

router.put("/updateComentarios/:id", updateComentariosValidator, updateComentario);

export default router