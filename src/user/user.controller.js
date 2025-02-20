import { hash, verify } from "argon2";
import User from "./user.model.js"
import fs from "fs/promises"
import { join } from "path"



export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { oldPassword, newPassword } = req.body;

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

