"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import categoriasRoutes from "../src/categoria/categorias.routes.js"
import User from "../src/user/user.model.js"
import { hash } from "argon2"
import Categoria from "../src/categoria/categoria.model.js"


const middelwares = (app) =>{
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app)=>{
    app.use("/gestorDeOpiniones/v1/auth", authRoutes)
    app.use("/gestorDeOpiniones/v1/user", userRoutes)
    app.use("/gestorDeOpiniones/v1/categorias", categoriasRoutes)
}

const connectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

const crearAdministrador = async ()=>{
    try{
        const adminExist = await User.findOne({role: "ADMIN_ROLE"});

        if(!adminExist){
            const encryptedPassword = await hash("Abc123**")

            const admin = new User({
                name: "Admin",
                surname: "Admin",
                username: "admin",
                email: "Admin@gmail.com",
                password: encryptedPassword,
                role: "ADMIN_ROLE"
            });

            await admin.save();
            console.log("Administrador creado exitosamente")
        }
    }catch(err){
        console.log (`Error al crear al administrador ${err}`)
    }
}

const crearCategoriaInicial = async ()=>{
    try{
        const categoriaExist = await Categoria.findOne({status: true});

        if(!categoriaExist){

            const categoria = new Categoria({
                name: "General"
            });
            await categoria.save();
            console.log("Categoria creada exitosamente")
        }
    }catch(err){
        console.log(`Error al crear la categoria ${err}`)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middelwares(app)
        connectarDB()
        crearAdministrador()
        crearCategoriaInicial()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on a port  ${process.env.PORT}`)
    }catch(err){
        console.log(`sever init failed: ${err}`)
    }  
}