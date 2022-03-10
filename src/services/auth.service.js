import { Usuario } from "../models/usuario.model.js";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  static async login({ correo, password }) {
    const usuarioEncontrado = await Usuario.findOne({
      correo,
    });
    if (usuarioEncontrado) {
      const resultado = compareSync(password, usuarioEncontrado.password);

      if (resultado && usuarioEncontrado.admin === true) {
        const token = jwt.sign(
          { id: usuarioEncontrado._id, mensaje_oculto: "Hola soy un mensaje" },
          process.env.JWT_SECRET,
          { expiresIn: "5h" }
        );

        return { message: "admin", token, usuarioEncontrado };
      } else {
        return { message: "No tienes permisos", usuarioEncontrado };
      }
    } else if (!usuarioEncontrado) {
      return {
        message: "error",
      };
    }
  }
  static async validarCorreo({ correo }) {
    const usuarioEncontrado = await Usuario.findOne({ correo });
    if (usuarioEncontrado) {
      return {
        message: "existe",
        correo: usuarioEncontrado.correo,
      };
    } else if (!usuarioEncontrado) {
      return {
        message: "no existe",
      };
    }
  }
}
