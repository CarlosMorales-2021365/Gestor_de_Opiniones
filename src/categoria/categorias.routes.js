import { Router } from "express";
import { createCategoria, updateCategoria } from "./categorias.controller.js";
import { createCategoriaValidator, updatecategoriarValidator } from "../middlewares/categoria-validators.js";

const router = Router();

router.post("/createCategoria", createCategoriaValidator, createCategoria);

router.put("/updatecategoria/:id", updatecategoriarValidator, updateCategoria);

export default router;