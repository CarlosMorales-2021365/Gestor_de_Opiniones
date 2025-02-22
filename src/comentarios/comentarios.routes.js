import { Router } from "express"
import { crearComentario, updateComentario, deleteComentario } from "./comentarios.controller.js"
import { createComentariosValidator, updateComentariosValidator, deleteComentariosValidator } from "../middlewares/comentarios-validators.js"

const router = Router()

/**
 * @swagger
 * /createComentarios:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Content of the comment
 *                 example: This is a comment.
 *               publicacion:
 *                 type: string
 *                 description: ID of the publication the comment is related to
 *                 example: 603dcd3e2f1b2c001f8e4e1a
 *     responses:
 *       200:
 *         description: Comment created successfully
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
 *                   example: Comentario creado correctamente
 *                 opinion:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 603dcd3e2f1b2c001f8e4e1a
 *                     text:
 *                       type: string
 *                       example: This is a comment.
 *                     publicacion:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 603dcd3e2f1b2c001f8e4e1a
 *                         titulo:
 *                           type: string
 *                           example: My First Post
 *                         descripcion:
 *                           type: string
 *                           example: This is the content of my first post.
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 603dcd3e2f1b2c001f8e4e1a
 *                         name:
 *                           type: string
 *                           example: John
 *                         email:
 *                           type: string
 *                           example: johndoe@example.com
 *       500:
 *         description: Error creating comment
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
 *                   example: Error al crear el comentario
 *                 error:
 *                   type: string
 *                   example: Error message
 */

router.post("/createComentarios", createComentariosValidator, crearComentario);

/**
 * @swagger
 * /updateComentarios/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Updated content of the comment
 *                 example: This is an updated comment.
 *     responses:
 *       200:
 *         description: Comment updated successfully
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
 *                   example: Comentario Actualizado
 *                 comentarioActualizado:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 603dcd3e2f1b2c001f8e4e1a
 *                     text:
 *                       type: string
 *                       example: This is an updated comment.
 *                     publicacion:
 *                       type: string
 *                       example: 603dcd3e2f1b2c001f8e4e1a
 *                     user:
 *                       type: string
 *                       example: 603dcd3e2f1b2c001f8e4e1a
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
 *                   example: No tienes permisos para actualizar este comentario
 *       404:
 *         description: Comment not found
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
 *                   example: Comentario no encontrado
 *       500:
 *         description: Error updating comment
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
 *                   example: Error al actualizar el comentario
 *                 error:
 *                   type: string
 *                   example: Error message
 */


router.put("/updateComentarios/:id", updateComentariosValidator, updateComentario);

/**
 * @swagger
 * /deleteComentarios/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
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
 *                   example: Comentario eliminado
 *                 comentarioEliminado:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 603dcd3e2f1b2c001f8e4e1a
 *                     text:
 *                       type: string
 *                       example: This is a comment.
 *                     publicacion:
 *                       type: string
 *                       example: 603dcd3e2f1b2c001f8e4e1a
 *                     user:
 *                       type: string
 *                       example: 603dcd3e2f1b2c001f8e4e1a
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
 *                   example: No tienes permisos para eliminar este comentario
 *       404:
 *         description: Comment not found
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
 *                   example: Comentario no encontrado
 *       500:
 *         description: Error deleting comment
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
 *                   example: Error al eliminar el comentario
 *                 error:
 *                   type: string
 *                   example: Error message
 */

router.delete("/deleteComentarios/:id", deleteComentariosValidator, deleteComentario)

export default router