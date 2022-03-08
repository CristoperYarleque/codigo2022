import { Router } from "express";
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerBusqueda,
  obtenerProducto,
  obtenerProductos,
} from "../controller/producto.controller.js";
import { validarUsuario } from "../utils/validador.js";

export const productoRouter = Router();

productoRouter.post("/producto", validarUsuario, crearProducto);
productoRouter.get("/busqueda", obtenerBusqueda);
productoRouter.get("/productos", obtenerProductos);

productoRouter
  .route("/producto/:id")
  .get(obtenerProducto)
  .put(validarUsuario, actualizarProducto)
  .delete(validarUsuario, eliminarProducto);
