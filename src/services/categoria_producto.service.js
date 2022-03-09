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

  static async eliminar({ categoriaId, productoId }) {
    const productoEncontrado = await Producto.findById(productoId);
    const categoriaEncontrada = await Categoria.findById(categoriaId);
    if (!categoriaEncontrada || !productoEncontrado) {
      return {
        message: "Categoria o Producto Invalido",
      };
    }
    const categoriaProductoEncontrada = await CategoriaProducto.findOne({
      categoriaId,
      productoId,
    });

    if (productoEncontrado.categoriaProducto[0]) {
      const categoriaProductoId = await productoEncontrado.categoriaProducto[0];
      const categoriaProductoEncontradaId =
        await categoriaProductoEncontrada._id.toString();
      let objetos = [];
      let objeto = [];
      const resultado = (data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].toString() !== categoriaProductoId.toString()) {
            objetos.push(data[i]);
          }
        }
      };
      resultado(categoriaEncontrada.categoriaProducto);
      await Categoria.findByIdAndUpdate(categoriaId, {
        categoriaProducto: objetos,
      });
      await Producto.findByIdAndUpdate(productoId, {
        categoriaProducto: objeto,
      });
      await CategoriaProducto.findByIdAndDelete(categoriaProductoEncontradaId);
    }
  }
}
