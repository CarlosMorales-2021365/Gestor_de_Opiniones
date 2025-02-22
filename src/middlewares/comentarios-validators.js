import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { comentarioExists } from "../helpers/db-validators.js";

export const createComentariosValidator = [
    validateJWT,
    body("text").notEmpty().withMessage("El texto es requerido"),
    body("publicacion").notEmpty().withMessage("La publicacion es requerida"),
    body("publicacion").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("user").notEmpty().withMessage("El usuario es requerido"),
    validarCampos,
    handleErrors
]

export const updateComentariosValidator = [
    validateJWT,
    param("id").isMongoId().withMessage("No es un ID válido"),
    param("id").custom(comentarioExists),
    validarCampos,
    handleErrors
]