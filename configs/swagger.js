import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Gestor de Opiniones API",
            version: "1.0.0",
            description: "API para un sistema de gestión comentarios y publicaciones",
            contact:{
                name: "Carlos Morales",
                email: "cmorales-2021365@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/gestorDeOpiniones/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/publicaciones/publicaciones.routes.js",
        "./src/comentarios/comentarios.routes.js",
        "./src/categoria/categorias.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}