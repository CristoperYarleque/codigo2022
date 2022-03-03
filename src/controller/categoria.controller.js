import { categoriaDto } from "../dtos/request/categoria.dto.js";
import { CategoriaService } from "../services/categoria.service.js";

export async function crearCategoria(req, res) {
  const data = categoriaDto(req.body);
  const resultado = await CategoriaService.crear(data);
  return res.status(resultado.message ? 400 : 201).json(resultado);
}

export async function obtenerCategorias(req, res) {
  const resultado = await CategoriaService.listar();
  return res.status(200).json(resultado);
}

export async function actualizarCategoria(req, res) {
  const { id } = req.params;
  const resultado = await CategoriaService.actualizar(req.body, id);
  return res.status(201).json(resultado);
}

export async function obtenerCategoria(req, res) {
  const { id } = req.params;
  const resultado = await CategoriaService.obtener(id);
  return res.status(200).json(resultado);
}
