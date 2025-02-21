import { Router } from "express";
import { createCategoria } from "./categorias.controller.js";
import { createCategoriaValidator } from "../middlewares/categoria-validators.js";

const router = Router();

router.post("/createCategoria", createCategoriaValidator, createCategoria);

export default router;