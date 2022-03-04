import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  correo: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
  },
  nombre: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  apellido: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.Boolean,
  },
});

export const Usuario = mongoose.model("usuarios", usuarioSchema);
