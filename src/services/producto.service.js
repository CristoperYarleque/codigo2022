import { Producto } from "../models/producto.model.js";
import { Categoria } from "../models/categoria.model.js";
import { CategoriaProducto } from "../models/categoria_producto.model.js";

export class ProductoService {
  static async crear(data) {
    try {
      const nuevoProducto = await Producto.create(data);
      return nuevoProducto;
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  static async listar() {
    const Productos = await Producto.find().sort({ nombre: "asc" });
    return Productos;
  }

  static async actualizar(data, id) {
    const productoActualizado = await Producto.findOneAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      }
    );
    return productoActualizado;
  }

  static async eliminar(id) {
    const productoEncontrado = await Producto.findById(id);
    if (productoEncontrado.categoriaProducto[0]) {
      const categoriaProductoId = await productoEncontrado.categoriaProducto[0];

      const getCategoriaProducto = await CategoriaProducto.findById(
        categoriaProductoId
      );

      const getCategoriaId = await getCategoriaProducto.categoriaId;

      const getCategoria = await Categoria.findById(getCategoriaId);

      let objetos = [];
      const resultado = (data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].toString() !== categoriaProductoId.toString()) {
            objetos.push(data[i]);
          }
        }
      };
      resultado(getCategoria.categoriaProducto);

      await Categoria.findByIdAndUpdate(getCategoriaId, {
        categoriaProducto: objetos,
      });

      await CategoriaProducto.findByIdAndDelete(categoriaProductoId);
    } else {
      return {
        message: "no se encontro producto",
      };
    }
    if (productoEncontrado.imagen) {
      await fs.promises.unlink(productoEncontrado.imagen);
    }
    const productoEliminado = await Producto.findByIdAndDelete(id);
    return productoEliminado;
  }
}
