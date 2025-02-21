import { Router } from "express";
import { createCategoria, updateCategoria, deleteCategoria } from "./categorias.controller.js";
import { createCategoriaValidator, updateCategoriasValidator, deleteCategoriasValidator } from "../middlewares/categoria-validators.js";

const router = Router();

router.post("/createCategoria", createCategoriaValidator, createCategoria);

router.put("/updatecategoria/:id", updateCategoriasValidator, updateCategoria);

router.delete("/deleteCategorias/:id", deleteCategoriasValidator, deleteCategoria);

export default router;