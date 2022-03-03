import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: mongoose.Schema.Types.String,
    maxlength: 20,
    minlength: 2,
    required: true,
  },
  categoriaProducto: {
    type: [mongoose.Schema.Types.ObjectId],
  },
});

export const Categoria = mongoose.model("categoria", categoriaSchema);
