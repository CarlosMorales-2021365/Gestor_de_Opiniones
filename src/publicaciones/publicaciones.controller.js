import Publicaciones from './publicaciones.model.js';
import Categoria from '../categoria/categoria.model.js';
import Comentarios from '../comentarios/comentarios.model.js'

export const createPublicacion = async (req, res) => {
    try {
        const { categoria, title, text } = req.body;
        const { usuario } = req;

        const categoriaRecord = await Categoria.findOne({ _id: categoria });
        if(!categoriaRecord){
            console.log(categoria);
            return res.status(404).json({
                success: false,
                msg: "No se encontro la categoria"
            });
        }

        const publicaciones = new Publicaciones({categoria, title, text, user: usuario._id,});
        await publicaciones.save();

        const publicacionesConDatos = await Publicaciones.findById(publicaciones._id)
            .populate('categoria')
            .populate('user');
        
        return res.status(200).json({
            success: true,
            msg: `La publicacion fue creada extosamente`,
            publicaciones: publicacionesConDatos
        });
    }catch(error){
        return res.status(500).json({
            msg: "Error al crear la publicacion",
            error
        });
    }
}

export const updatePublicaciones = async (req, res) =>{
    try{
        const { id } = req.params;
        const data = req.body;

        const publicacion = await Publicaciones.findById(id);

        if (publicacion.user.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({
                success: false,
                msg: 'No tienes permisos para actualizar esta publicación',
            });
        }

        const publicacionActualizada = await Publicaciones.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: "Publicacion actualizada",
            publicacionActualizada
        })
        }catch(err){
            res.status(500).json({
                success: false,
                msg: "Error al actualizar la publicacion",
                error: err.message
              }); 
        }
}

export const getPublicacionesByID = async (req, res) => {
    try{
        const { id } = req.params;
        const publicaciones = await Publicaciones.findById(id)
        .populate('categoria') 
        .populate('user')
        .populate('comentarios');

        if(!publicaciones){
            return res.status(404).json({
                success: false,
                message: "Publicacion no encontrada"
            })
        }

        return res.status(200).json({
            sucess: true,
            publicaciones
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener la publicacion",
            error: err.message
        })
    }
}

export const deletePublicacion = async (req, res)=> {
    try{
        const { id } = req.params

        const publicacion = await Publicaciones.findById(id);

        if (publicacion.user.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({
                success: false,
                msg: 'No tienes permisos para eliminar esta publicación',
            });
        }

        await Comentarios.deleteMany({ publicacion: id });

        const publicaciones = await Publicaciones.findByIdAndUpdate( id,{status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Publicacion eliminada",
            publicaciones
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        }) 
    }
}