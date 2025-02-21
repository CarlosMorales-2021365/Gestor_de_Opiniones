import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const createPublicacionesValidator = [
    validateJWT,
    body("title").notEmpty().withMessage("El titulo es requerido"),
    body("categoria").notEmpty().withMessage("La categoria es requerida"),
    body("text").notEmpty().withMessage("El texto es requerido"),
    validarCampos,
    handleErrors
]