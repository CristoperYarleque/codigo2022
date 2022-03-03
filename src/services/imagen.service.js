import { Producto } from "../models/producto.model.js";
import fs from "fs";

export class ImagenService {
  static async subirImagen(id, nombreImagen) {
    const productoEncontrado = await Producto.findById(id).catch(
      async (error) => {
        await fs.promises.unlink(nombreImagen);
        throw new Error("Producto no existe");
      }
    );

    if (!productoEncontrado) {
      await fs.promises.unlink(nombreImagen);
      throw new Error("Producto no existe");
    }

    const productoActualizado = await Producto.findOneAndUpdate(
      { _id: id },
      { imagen: nombreImagen },
      { new: true }
    );

    return productoActualizado;
  }
}
