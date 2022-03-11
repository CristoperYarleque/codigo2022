import { Router } from "express"
import { crearVenta, obtenerVentas, obtenerVenta, actualizarVenta } from "../controller/venta_producto.controller.js"

export const ventaRouter = Router()

ventaRouter.post("/venta-producto", crearVenta)
ventaRouter.get("/ventas", obtenerVentas)
ventaRouter.route("/venta/:id").get(obtenerVenta).put(actualizarVenta)


