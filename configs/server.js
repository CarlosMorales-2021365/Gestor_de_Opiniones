"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import User from "../src/user/user.model.js"
import { hash } from "bcrypt"


const middelwares = (app) =>{
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app)=>{
    app.use("/gestorDeOpiniones/v1/auth", authRoutes)
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
            const encryptedPassword = await hash("Abc123**", 10)

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

export const initServer = () => {
    const app = express()
    try{
        middelwares(app)
        connectarDB()
        crearAdministrador()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on a port  ${process.env.PORT}`)
    }catch(err){
        console.log(`sever init failed: ${err}`)
    }  
}