import { Categoria } from "../models/categoria.model.js";
import { CategoriaProducto } from "../models/categoria_producto.model.js";
import { Producto } from "../models/producto.model.js";
import { ArchivosService } from "./archivos.services.js";

export class CategoriaService {
  static async crear(data) {
    try {
      const nuevaCategoria = await Categoria.create(data);
      return nuevaCategoria;
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  static async listar() {
    const categorias = await Categoria.find().sort({ nombre: "asc" });
    return categorias;
  }

  static async actualizar(data, id) {
    const categoriaActualizada = await Categoria.findOneAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      }
    );
    return categoriaActualizada;
  }

  static async obtener(id) {
    const categoria = await Categoria.findById(id);
    const productos = await Promise.all(
      categoria.categoriaProducto.map(async (catProd) => {
        const categoriaProducto = await CategoriaProducto.findById(catProd);
        const prod = await Producto.findById(categoriaProducto.productoId);
        if (prod.imagen) {
          const result = {
            ...prod._doc,
            imagen: ArchivosService.devolverURL(prod.imagen),
          };
          return result;
        } else {
          const result = { ...prod._doc };
          return result;
        }
      })
    );
    return { ...categoria._doc, productos };
  }
}
