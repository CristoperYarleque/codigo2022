import mongoose from "mongoose";

const juegosSchema = new mongoose.Schema({
    nombre: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    precio: {
        type: mongoose.Schema.Types.Number,
        required: true,
        default: 0.0,
    },
    cantidad: {
        type: mongoose.Schema.Types.Number,
        required: true,
        default: 0.0
    }
}, { _id: false }
)

const ventaProductoSchema = new mongoose.Schema({
    nombreCompleto: {
        type: mongoose.Schema.Types.String,
        required: true,
        maxlength: 100,
    },
    telefono: {
        type: mongoose.Schema.Types.Number,
        required: true,
        maxlength: 12,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    departamento: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    provincia: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    distrito: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    direccion: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    total: {
        type: mongoose.Schema.Types.Number,
    },
    estado_id: {
        type: mongoose.Schema.Types.String,
    },
    juegos: [juegosSchema]
});

export const VentaProducto = mongoose.model("ventaproducto", ventaProductoSchema);