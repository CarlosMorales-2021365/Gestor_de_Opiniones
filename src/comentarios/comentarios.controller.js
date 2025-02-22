import Comentarios from "../comentarios/comentarios.model.js"
import Publicaciones from "../publicaciones/publicaciones.model.js"

export const crearComentario = async (req, res) => {
    try{
        const { text, publicacion } = req.body
       
        const opinion = new Comentarios({
            text,
            publicacion,
            user: req.usuario._id
        });

        await opinion.save();

        await Publicaciones.findByIdAndUpdate(
            publicacion,
            { $push: { comentarios: opinion._id } },
            { new: true }
        );

        const comentarioCompleto = await Comentarios.findById(opinion._id)
            .populate('user', 'name email')  // Se pueden especificar los campos que se desean de "user"
            .populate('publicacion', 'titulo descripcion');

        return res.status(200).json({
            success: true,
            message: "Comentario creado correctamente",
            opinion: comentarioCompleto
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al crear el comentario",
            error: err.message
        });
    }
}

export const updateComentario = async (req, res)=>{
    try{
        const { id } = req.params;
        const data = req.body;

        const comentario = await Comentarios.findByIdAndUpdate(id, data,{new: true});

        if (comentario.user.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({
                success: false,
                msg: 'No tienes permisos para actualizar este comentario',
            });
        }

        res.status(200).json({
            success: true,
            msg: 'Comentario Actualizado',
            comentario,
        });
    }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar el comentario',
            error: err.message
        });
    }
}

