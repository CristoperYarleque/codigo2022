import { Router } from "express";
import {
  crearCategoria,
  obtenerCategoria,
  obtenerCategorias,
  actualizarCategoria,
} from "../controller/categoria.controller.js";

export const categoriaRouter = Router();

categoriaRouter.post("/categoria", crearCategoria);
categoriaRouter.get("/categorias", obtenerCategorias);

categoriaRouter
  .route("/categoria/:id")
  .get(obtenerCategoria)
  .put(actualizarCategoria);
