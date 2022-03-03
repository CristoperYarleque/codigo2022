import { CategoriaProducto } from "../models/categoria_producto.model.js";
import { Categoria } from "../models/categoria.model.js";
import { Producto } from "../models/producto.model.js";

export class CategoriaProductoService {
  static async crear({ categoriaId, productoId }) {
    const categoriaEncontrada = await Categoria.findById(categoriaId);
    const productoEncontrado = await Producto.findById(productoId);

    if (!categoriaEncontrada || !productoEncontrado) {
      return {
        message: "Categoria o Producto Invalido",
      };
    }

    const registro = await CategoriaProducto.findOne({
      categoriaId,
      productoId,
    });
    if (registro) {
      return {
        message: "Relacion ya existe",
      };
    }

    const nuevoRegistro = await CategoriaProducto.create({
      categoriaId,
      productoId,
    });

    await Categoria.updateOne(
      { _id: categoriaEncontrada._id },
      {
        categoriaProducto: [
          ...categoriaEncontrada.categoriaProducto,
          nuevoRegistro._id,
        ],
      }
    );

    await Producto.updateOne(
      { _id: productoEncontrado._id },
      {
        categoriaProducto: [
          ...productoEncontrado.categoriaProducto,
          nuevoRegistro._id,
        ],
      }
    );

    return nuevoRegistro;
  }
}
