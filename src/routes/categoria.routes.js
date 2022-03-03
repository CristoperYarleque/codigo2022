import { Router } from "express";
import {
  crearCategoria,
  obtenerCategoria,
  obtenerCategorias,
  actualizarCategoria,
} from "../controller/categoria.controller.js";

export const categoriaRouter = Router();

categoriaRouter.route("/categoria").post(crearCategoria).get(obtenerCategorias);

categoriaRouter
  .route("/categoria/:id")
  .get(obtenerCategoria)
  .put(actualizarCategoria);
