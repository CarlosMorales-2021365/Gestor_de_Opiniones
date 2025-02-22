import { Router } from "express";
import { createCategoria, updateCategoria, deleteCategoria } from "./categorias.controller.js";
import { createCategoriaValidator, updateCategoriasValidator, deleteCategoriasValidator } from "../middlewares/categoria-validators.js";

const router = Router();

/**
 * @swagger
 * /createCategoria:
 *   post:
 *     summary: Create a new category
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *                 example: Technology
 *     responses:
 *       200:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 categoria:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 603dcd3e2f1b2c001f8e4e1a
 *                     name:
 *                       type: string
 *                       example: Technology
 *                     status:
 *                       type: boolean
 *                       example: true
 *       500:
 *         description: Error creating category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error al guardar la categoria
 *                 error:
 *                   type: string
 *                   example: Error message
 */

router.post("/createCategoria", createCategoriaValidator, createCategoria);

/**
 * @swagger
 * /updatecategoria/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *                 example: Updated Technology
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Categoria actualizada
 *                 categoria:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 603dcd3e2f1b2c001f8e4e1a
 *                     name:
 *                       type: string
 *                       example: Updated Technology
 *                     status:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Categoria no encontrada
 *       500:
 *         description: Error updating category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Error al actualizar la categoria
 *                 error:
 *                   type: string
 *                   example: Error message
 */

router.put("/updatecategoria/:id", updateCategoriasValidator, updateCategoria);

/**
 * @swagger
 * /deleteCategorias/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Categoria eliminada
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No se encontró la categoría "General"
 *       500:
 *         description: Error deleting category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error al eliminar la categoria
 *                 error:
 *                   type: string
 *                   example: Error message
 */

router.delete("/deleteCategorias/:id", deleteCategoriasValidator, deleteCategoria);

export default router;