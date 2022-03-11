import { VentaProducto } from "../models/venta_producto.model.js";

export class VentaService {
    static async crear(data) {
        try {
            const nuevaVenta = await VentaProducto.create(data);
            return nuevaVenta;
        } catch (error) {
            return {
                message: error.message,
            };
        }
    }
    static async obtenerVentas() {
        const resultado = await VentaProducto.find()
        return resultado
    }
    static async obtenerVenta(id) {
        const resultado = await VentaProducto.findById(id)
        return resultado
    }
    static async actualizarVenta(data, id) {
        const productoActualizado = await VentaProducto.findOneAndUpdate(
            { _id: id },
            data,
            {
                new: true,
            }
        );
        return productoActualizado;
    }
}