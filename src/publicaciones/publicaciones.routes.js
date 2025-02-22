import { Router } from "express";
import { createPublicacion, updatePublicaciones, getPublicacionesByID, deletePublicacion } from "./publicaciones.controller.js"; 
import { createPublicacionesValidator, updatePublicacionValidator, getPublicacionesByIdValidator, deletePublicacionesIdValidator } from "../middlewares/publicaciones-validator.js";

const router = Router();

/**
 * @swagger
 * /crearPublicaciones:
 *   post:
 *     summary: Create a new publication
 *     tags: [Publicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoria:
 *                 type: string
 *                 description: Category ID
 *                 example: 603dcd3e2f1b2c001f8e4e1a
 *               title:
 *                 type: string
 *                 description: Title of the publication
 *                 example: My First Post
 *               text:
 *                 type: string
 *                 description: Content of the publication
 *                 example: This is the content of my first post.
 *     responses:
 *       200:
 *         description: Publication created successfully
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
 *                   example: La publicacion fue creada extosamente
 *                 publicaciones:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 603dcd3e2f1b2c001f8e4e1a
 *                     categoria:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 603dcd3e2f1b2c001f8e4e1a
 *                         name:
 *                           type: string
 *                           example: Technology
 *                     title:
 *                       type: string
 *                       example: My First Post
 *                     text:
 *                       type: string
 *                       example: This is the content of my first post.
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 603dcd3e2f1b2c001f8e4e1a
 *                         name:
 *                           type: string
 *                           example: John
 *                         surname:
 *                           type: string
 *                           example: Doe
 *                         username:
 *                           type: string
 *                           example: johndoe
 *                         email:
 *                           type: string
 *                           example: johndoe@example.com
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
 *                   example: No se encontro la categoria
 *       500:
 *         description: Error creating publication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Error al crear la publicacion
 *                 error:
 *                   type: string
 *                   example: Error message
 */


router.post("/crearPublicaciones", createPublicacionesValidator, createPublicacion);

/**
 * @swagger
 * /updatePublicacion/{id}:
 *   put:
 *     summary: Update a publication
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Publication ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoria:
 *                 type: string
 *                 description: Category ID
 *                 example: 603dcd3e2f1b2c001f8e4e1a
 *               title:
 *                 type: string
 *                 description: Title of the publication
 *                 example: Updated Post Title
 *               text:
 *                 type: string
 *                 description: Content of the publication
 *                 example: This is the updated content of the post.
 *     responses:
 *       200:
 *         description: Publication updated successfully
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
 *                   example: Publicacion actualizada
 *                 publicacionActualizada:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 603dcd3e2f1b2c001f8e4e1a
 *                     categoria:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 603dcd3e2f1b2c001f8e4e1a
 *                         name:
 *                           type: string
 *                           example: Technology
 *                     title:
 *                       type: string
 *                       example: Updated Post Title
 *                     text:
 *                       type: string
 *                       example: This is the updated content of the post.
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 603dcd3e2f1b2c001f8e4e1a
 *                         name:
 *                           type: string
 *                           example: John
 *                         surname:
 *                           type: string
 *                           example: Doe
 *                         username:
 *                           type: string
 *                           example: johndoe
 *                         email:
 *                           type: string
 *                           example: johndoe@example.com
 *       403:
 *         description: Forbidden
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
 *                   example: No tienes permisos para actualizar esta publicación
 *       404:
 *         description: Publication not found
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
 *                   example: Publicacion no encontrada
 *       500:
 *         description: Error updating publication
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
 *                   example: Error al actualizar la publicacion
 *                 error:
 *                   type: string
 *                   example: Error message
 */

router.put("/updatePublicacion/:id", updatePublicacionValidator, updatePublicaciones); 


/**
 * @swagger
 * /getPublicacionById/{id}:
 *   get:
 *     summary: Get a publication by ID
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Publication ID
 *     responses:
 *       200:
 *         description: Publication retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 publicaciones:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 603dcd3e2f1b2c001f8e4e1a
 *                     categoria:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 603dcd3e2f1b2c001f8e4e1a
 *                         name:
 *                           type: string
 *                           example: Technology
 *                     title:
 *                       type: string
 *                       example: My First Post
 *                     text:
 *                       type: string
 *                       example: This is the content of my first post.
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 603dcd3e2f1b2c001f8e4e1a
 *                         name:
 *                           type: string
 *                           example: John
 *                         surname:
 *                           type: string
 *                           example: Doe
 *                         username:
 *                           type: string
 *                           example: johndoe
 *                         email:
 *                           type: string
 *                           example: johndoe@example.com
 *                     comentarios:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 603dcd3e2f1b2c001f8e4e1a
 *                           text:
 *                             type: string
 *                             example: This is a comment.
 *                           user:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: 603dcd3e2f1b2c001f8e4e1a
 *                               name:
 *                                 type: string
 *                                 example: Jane
 *                               surname:
 *                                 type: string
 *                                 example: Doe
 *                               username:
 *                                 type: string
 *                                 example: janedoe
 *                               email:
 *                                 type: string
 *                                 example: janedoe@example.com
 *       404:
 *         description: Publication not found
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
 *                   example: Publicacion no encontrada
 *       500:
 *         description: Error retrieving publication
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
 *                   example: Error al obtener la publicacion
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.get("/getPublicacionById/:id", getPublicacionesByIdValidator, getPublicacionesByID);

/**
 * @swagger
 * /deletePublicacion/{id}:
 *   delete:
 *     summary: Delete a publication
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Publication ID
 *     responses:
 *       200:
 *         description: Publication deleted successfully
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
 *                   example: Publicacion eliminada
 *                 publicaciones:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 603dcd3e2f1b2c001f8e4e1a
 *                     title:
 *                       type: string
 *                       example: My First Post
 *                     categoria:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 603dcd3e2f1b2c001f8e4e1a
 *                         name:
 *                           type: string
 *                           example: Technology
 *                     text:
 *                       type: string
 *                       example: This is the content of my first post.
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 603dcd3e2f1b2c001f8e4e1a
 *                         name:
 *                           type: string
 *                           example: John
 *                         surname:
 *                           type: string
 *                           example: Doe
 *                         username:
 *                           type: string
 *                           example: johndoe
 *                         email:
 *                           type: string
 *                           example: johndoe@example.com
 *       403:
 *         description: Forbidden
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
 *                   example: No tienes permisos para eliminar esta publicación
 *       404:
 *         description: Publication not found
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
 *                   example: Publicacion no encontrada
 *       500:
 *         description: Error deleting publication
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
 *                   example: Error al eliminar la publicacion
 *                 error:
 *                   type: string
 *                   example: Error message
 */

router.delete("/deletePublicacion/:id", deletePublicacionesIdValidator, deletePublicacion);

export default router;