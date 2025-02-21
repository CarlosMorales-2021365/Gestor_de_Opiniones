import { body, param } from "express-validator";
import { categoriaExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createCategoriaValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    validarCampos,
    handleErrors
]

export const updateCategoriasValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(categoriaExists),
    validarCampos,
    handleErrors
];

export const deleteCategoriasValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(categoriaExists),
    validarCampos,
    handleErrors
];