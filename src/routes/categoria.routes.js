import { Router } from "express";
import {
  crearCategoria,
  obtenerCategoria,
  obtenerCategorias,
  actualizarCategoria,
} from "../controller/categoria.controller.js";
import { validarUsuario } from "../utils/validador.js";

export const categoriaRouter = Router();

categoriaRouter.post("/categoria", validarUsuario, crearCategoria);
categoriaRouter.get("/categorias", obtenerCategorias);

categoriaRouter
  .route("/categoria/:id")
  .get(obtenerCategoria)
  .put(validarUsuario, actualizarCategoria);
