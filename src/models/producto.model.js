import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: {
    type: mongoose.Schema.Types.String,
    required: true,
    maxlength: 100,
  },
  descripcion: {
    type: mongoose.Schema.Types.String,
    required: true,
    maxlength: 400,
  },
  imagen: {
    type: mongoose.Schema.Types.String,
    // required: true,
  },
  cantidad: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  precio: {
    type: mongoose.Schema.Types.Number,
    required: true,
    default: 0.0,
    max: 1000.0,
  },
  categoriaProducto: {
    type: [mongoose.Schema.Types.ObjectId],
  },
});

export const Producto = mongoose.model("productos", productoSchema);
