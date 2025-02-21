'use strict';

import Categoria from "./categoria.model.js"

export const createCategoria = async (req, res) => {
    try{
        const data = req.body;
        const categoria = new Categoria(data);

        await categoria.save();

        res.status(200).json({
            success: true,
            categoria
        });
    }catch(error){
        res.estatus(500).json({
            success: false,
            message: 'Error al guardar la categoria',
            error
        });
    }
}

export const updateCategoria = async (req, res) => {
    try{
        const { id } = req.params;
        const data = req.body;

        const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: 'Categoria actualizada',
            categoria
        });
    }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la categoria',
            error: err.message
        }); 
    }
}