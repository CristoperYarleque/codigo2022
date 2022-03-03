import { CategoriaProductoService } from "../services/categoria_producto.service.js";
import { categoriaProductoDto } from "../dtos/request/categoria_producto.dto.js";

export async function crear(req, res) {
  const data = categoriaProductoDto(req.body);
  const resultado = await CategoriaProductoService.crear(data);
  return res.status(resultado.message ? 400 : 201).json(resultado);
}
