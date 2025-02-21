import { Schema, model } from "mongoose";

const comentarioSchema = Schema({
    publicacion:{
        type: Schema.ObjectId,
        ref: 'Publicaciones',
        require: true
    },
    user:{
        type: Schema.ObjectId,
        ref: 'User',
        require: true
    },
    text:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model('Comentarios', comentarioSchema)