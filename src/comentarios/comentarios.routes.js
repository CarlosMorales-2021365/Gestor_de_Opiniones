import { Router } from "express"
import { crearComentario } from "./comentarios.controller.js"
import { createComentariosValidator } from "../middlewares/comentarios-validators.js"

const router = Router()

router.post("/createComentarios", createComentariosValidator, crearComentario);

export default router