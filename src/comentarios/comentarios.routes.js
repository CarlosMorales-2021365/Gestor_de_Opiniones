import { Router } from "express"
import { crearComentario, updateComentario, deleteComentario } from "./comentarios.controller.js"
import { createComentariosValidator, updateComentariosValidator, deleteComentariosValidator } from "../middlewares/comentarios-validators.js"

const router = Router()

router.post("/createComentarios", createComentariosValidator, crearComentario);

router.put("/updateComentarios/:id", updateComentariosValidator, updateComentario);

router.delete("/deleteComentarios/:id", deleteComentariosValidator, deleteComentario)

export default router