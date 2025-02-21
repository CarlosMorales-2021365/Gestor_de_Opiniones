import { Schema, model } from "mongoose";

const publicacionesSchema = new Schema({
    title:{
        type: String,
        required: [true, "The title is required"]
    },
    categoria:{
        type: Schema.ObjectId,
        ref: "Categoria",
        required: true
    },
    text:{
        type: String,
        required: [true, "The text is required"],
        maxLength: [5000, "Text cannot exceed 5000 characters"]
    },
    user:{
        type: Schema.ObjectId,
        ref: "User",
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    comentarios:[{
        type: Schema.Types.ObjectId,
        ref: "Comentarios"
    }]
},{
    versionKey: false,
    timestamps: true
})

export default model('Publicaciones', publicacionesSchema)