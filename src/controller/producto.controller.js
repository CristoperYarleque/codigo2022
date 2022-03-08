import { productoDto } from "../dtos/request/producto.dto.js";
import { ProductoService } from "../services/producto.service.js";

export async function crearProducto(req, res) {
  try {
    const data = productoDto(req.body);
    const resultado = await ProductoService.crear(data);
    return res.status(201).json(resultado);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      message: "Error al crear el producto",
    });
  }
}

export async function obtenerProducto(req, res) {
  const { id } = req.params;
  const resultado = await ProductoService.devolverProducto(id);
  return res.status(200).json(resultado);
}

export async function obtenerProductos(req, res) {
  const { page, limit, search } = req.query;
  const resultado = await ProductoService.listar({ page, limit, search });
  return res.status(200).json(resultado);
}

export async function obtenerBusqueda(req, res) {
  const { search } = req.query;
  const resultado = await ProductoService.listarBusqueda({ search });
  return res.status(200).json(resultado);
}

export async function actualizarProducto(req, res) {
  const { id } = req.params;
  const resultado = await ProductoService.actualizar(req.body, id);
  return res.status(201).json(resultado);
}

export async function eliminarProducto(req, res) {
  const resultado = await ProductoService.eliminar(req.params.id);
  if (resultado) {
    return res.json(resultado);
  } else {
    return res.status(400).json({
      message: "Error al eliminar el producto",
    });
  }
}
