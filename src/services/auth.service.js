import { Usuario } from "../models/usuario.model.js";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  static async login({ correo, password }) {
    const usuarioEncontrado = await Usuario.findOne({
      correo,
    });
    const resultado = compareSync(password, usuarioEncontrado.password);

    if (resultado && usuarioEncontrado.admin === true) {
      const token = jwt.sign(
        { id: usuarioEncontrado._id, mensaje_oculto: "Hola soy un mensaje" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return { message: "Si es admin", token };
    } else {
      return { message: "No tienes permisos" };
    }
  }
}
