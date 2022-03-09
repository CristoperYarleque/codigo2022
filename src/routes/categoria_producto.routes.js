import { Router } from "express";
import {
  crear,
  eliminar,
} from "../controller/categoria_producto.controller.js";

export const categoriaProductoRouter = Router();

categoriaProductoRouter
  .route("/categoria-producto")
  .post(crear)
  .delete(eliminar);
