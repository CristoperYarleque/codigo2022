import { Router } from "express";
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerProductos,
} from "../controller/producto.controller.js";

export const productoRouter = Router();

productoRouter.post("/producto", crearProducto);

productoRouter.get("/productos", obtenerProductos);

productoRouter
  .route("/producto/:id")
  .put(actualizarProducto)
  .delete(eliminarProducto);
