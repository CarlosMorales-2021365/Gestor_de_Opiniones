import { hash, verify } from "argon2";
import User from "./user.model.js"
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath (import.meta.url))

export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { oldPassword, newPassword } = req.body;

        if (uid !== req.usuario._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "No tienes permisos para actualizar la contraseña de otro usuario"
            });
        }

        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        const isMatch = await verify(user.password, oldPassword); 
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "La contraseña actual es incorrecta"
            });
        }

        if (oldPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada exitosamente"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;

        if (uid !== req.usuario._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "No tienes permisos para actualizar esta cuenta"
            });
        }

        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message
        });
    }
}

export const updateProfilePicture = async(req,res) =>{
    try{
        const { uid } = req.params
        let newprofilePicture = req.file ? req.file.filename : null

        if (uid !== req.usuario._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "No tienes permisos para actualizar la foto de perfil de otro usuario"
            });
        }

        if(!newprofilePicture){
            return res.status(400).json({
                success: false,
                message:"No se proporciono ninguna foto "
            })
        }

        const user = await User.findById(uid)

        if(user.profilePicture){
            const oldProfilePicture = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture)

            await fs.unlink(oldProfilePicture)
        }

        user.profilePicture = newprofilePicture
        await user.save()

        return res.status(200).json({
            succes:true,
            message: "Foto Actualizada",
            user
        })
        }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la foto',
            error: err.message
        });
    }
}